"use server";

import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const redis = Redis.fromEnv();

const endorsementSchema = z.object({
  name: z.string().min(1).max(80),
  role: z.string().min(1).max(100),
  message: z.string().min(1).max(1000),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  memeUrl: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  pinterest: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
});

export async function submitEndorsement(token: string, raw: Record<string, string>) {
  // Validate token
  const invite = await redis.hgetall(`invite:${token}`);
  if (!invite) return { error: "Invalid invite link." };
  if (Number(invite.used) === 1) return { error: "This invite has already been used." };

  const result = endorsementSchema.safeParse(raw);
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const d = result.data;

  const endorsement = {
    id: `dynamic_${Date.now()}`,
    name: d.name,
    role: d.role,
    message: d.message,
    avatar: d.avatarUrl || "/friends-avatar/default.webp",
    memeUrl: d.memeUrl || null,
    linkedin: d.linkedin || null,
    github: d.github || null,
    youtube: d.youtube || null,
    instagram: d.instagram || null,
    pinterest: d.pinterest || null,
    twitter: d.twitter || null,
    createdAt: Date.now(),
  };

  // Mark token used and save endorsement atomically-ish
  await redis.hset(`invite:${token}`, { used: 1, usedAt: Date.now() });
  await redis.lpush("endorsements:dynamic", JSON.stringify(endorsement));

  revalidatePath("/guestbook");

  return { success: true };
}
