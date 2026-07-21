import { redirect, notFound } from "next/navigation";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  const { shortcode } = await params;

  if (!shortcode) {
    return notFound();
  }

  const link = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortcode))
    .limit(1);

  if (link.length === 0) {
    return notFound();
  }

  redirect(link[0].originalUrl);
}
