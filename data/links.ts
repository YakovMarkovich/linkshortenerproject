import { db } from "@/db";
import { links } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getUserLinks(userId: string) {
  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));

  return userLinks;
}

export function generateShortCode(): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let shortCode = "";
  for (let i = 0; i < 6; i++) {
    shortCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return shortCode;
}

export async function shortCodeExists(shortCode: string): Promise<boolean> {
  const existing = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return existing.length > 0;
}

export async function generateUniqueShortCode(maxRetries = 5): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    const shortCode = generateShortCode();
    const exists = await shortCodeExists(shortCode);
    if (!exists) {
      return shortCode;
    }
  }
  throw new Error("Failed to generate unique short code");
}

export async function createUserLink(
  userId: string,
  originalUrl: string,
  shortCode?: string,
): Promise<{ id: number; shortCode: string; originalUrl: string }> {
  let finalShortCode = shortCode;

  if (finalShortCode) {
    const exists = await shortCodeExists(finalShortCode);
    if (exists) {
      throw new Error("Short code already taken");
    }
  } else {
    finalShortCode = await generateUniqueShortCode();
  }

  const result = await db
    .insert(links)
    .values({
      userId,
      shortCode: finalShortCode,
      originalUrl,
    })
    .returning({
      id: links.id,
      shortCode: links.shortCode,
      originalUrl: links.originalUrl,
    });

  return result[0];
}

export async function updateUserLink(
  linkId: number,
  userId: string,
  originalUrl: string,
  shortCode: string,
): Promise<{ id: number; shortCode: string; originalUrl: string }> {
  // Get the current link to check ownership
  const currentLink = await db
    .select()
    .from(links)
    .where(eq(links.id, linkId))
    .limit(1);

  if (!currentLink.length) {
    throw new Error("Link not found");
  }

  if (currentLink[0].userId !== userId) {
    throw new Error("Unauthorized");
  }

  // Check if the new short code is taken (by another link)
  if (shortCode !== currentLink[0].shortCode) {
    const exists = await shortCodeExists(shortCode);
    if (exists) {
      throw new Error("Short code already taken");
    }
  }

  const result = await db
    .update(links)
    .set({
      originalUrl,
      shortCode,
    })
    .where(eq(links.id, linkId))
    .returning({
      id: links.id,
      shortCode: links.shortCode,
      originalUrl: links.originalUrl,
    });

  return result[0];
}

export async function deleteUserLink(
  linkId: number,
  userId: string,
): Promise<void> {
  // Get the link to check ownership
  const linkToDelete = await db
    .select()
    .from(links)
    .where(eq(links.id, linkId))
    .limit(1);

  if (!linkToDelete.length) {
    throw new Error("Link not found");
  }

  if (linkToDelete[0].userId !== userId) {
    throw new Error("Unauthorized");
  }

  await db.delete(links).where(eq(links.id, linkId));
}
