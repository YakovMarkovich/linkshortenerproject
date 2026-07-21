"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createUserLink, updateUserLink, deleteUserLink } from "@/data/links";

const createLinkSchema = z.object({
  originalUrl: z.string().url("Must be a valid URL"),
  shortCode: z.string().min(1).max(50).optional().or(z.literal("")),
});

const updateLinkSchema = z.object({
  linkId: z.number(),
  originalUrl: z.string().url("Must be a valid URL"),
  shortCode: z.string().min(1).max(50),
});

const deleteLinkSchema = z.object({
  linkId: z.number(),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;
type UpdateLinkInput = z.infer<typeof updateLinkSchema>;
type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function createLinkAction(input: unknown) {
  const parsed = createLinkSchema.safeParse(input);

  if (!parsed.success) {
    return { error: "Invalid input", details: parsed.error.flatten() };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const { originalUrl, shortCode } = parsed.data;

    const result = await createUserLink(
      userId,
      originalUrl,
      shortCode && shortCode.trim() ? shortCode.trim() : undefined,
    );

    return { success: true, data: result };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create link";
    return { error: message };
  }
}

export async function updateLinkAction(input: unknown) {
  const parsed = updateLinkSchema.safeParse(input);

  if (!parsed.success) {
    return { error: "Invalid input", details: parsed.error.flatten() };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const { linkId, originalUrl, shortCode } = parsed.data;

    const result = await updateUserLink(
      linkId,
      userId,
      originalUrl,
      shortCode.trim(),
    );

    return { success: true, data: result };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update link";
    return { error: message };
  }
}

export async function deleteLinkAction(input: unknown) {
  const parsed = deleteLinkSchema.safeParse(input);

  if (!parsed.success) {
    return { error: "Invalid input", details: parsed.error.flatten() };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const { linkId } = parsed.data;

    await deleteUserLink(linkId, userId);

    return { success: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete link";
    return { error: message };
  }
}
