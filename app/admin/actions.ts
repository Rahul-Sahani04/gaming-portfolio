"use server";

import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

const redis = Redis.fromEnv();

function getAdminSecret() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET env var not set");
  return secret;
}

function makeSessionToken(secret: string) {
  return crypto.createHmac("sha256", secret).update("admin_session").digest("hex");
}

export async function loginAdmin(password: string) {
  const secret = getAdminSecret();
  const expected = Buffer.from(secret);
  const provided = Buffer.from(password);

  // Constant-time compare — pad to same length to avoid length leaks
  const maxLen = Math.max(expected.length, provided.length);
  const a = Buffer.concat([expected, Buffer.alloc(maxLen - expected.length)]);
  const b = Buffer.concat([provided, Buffer.alloc(maxLen - provided.length)]);

  if (!crypto.timingSafeEqual(a, b)) {
    return { error: "Wrong password" };
  }

  const token = makeSessionToken(secret);
  const jar = await cookies();
  jar.set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/admin",
  });

  return { success: true };
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete("admin_session");
  redirect("/admin");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const secret = getAdminSecret();
    const jar = await cookies();
    const session = jar.get("admin_session")?.value;
    if (!session) return false;
    const expected = makeSessionToken(secret);
    return crypto.timingSafeEqual(Buffer.from(session), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function createInvite(label: string, lockedName?: string) {
  const authed = await isAdminAuthenticated();
  if (!authed) return { error: "Unauthorized" };

  const token = crypto.randomUUID().replace(/-/g, "");
  const createdAt = Date.now();

  await redis.hset(`invite:${token}`, { label, used: 0, createdAt, ...(lockedName ? { lockedName } : {}) });
  await redis.lpush("invites:index", token);

  return { success: true, token };
}

export async function getInvites() {
  const authed = await isAdminAuthenticated();
  if (!authed) return [];

  const tokens: string[] = await redis.lrange("invites:index", 0, -1);
  if (!tokens.length) return [];

  const invites = await Promise.all(
    tokens.map(async (token) => {
      const data = await redis.hgetall(`invite:${token}`);
      if (!data) return null;
      return {
        token,
        label: data.label as string,
        lockedName: (data.lockedName as string) || null,
        used: Number(data.used) === 1,
        createdAt: Number(data.createdAt),
        usedAt: data.usedAt ? Number(data.usedAt) : null,
      };
    })
  );

  return invites.filter(Boolean);
}

export async function updateInvite(token: string, label: string, lockedName: string | null) {
  const authed = await isAdminAuthenticated();
  if (!authed) return { error: "Unauthorized" };

  const invite = await redis.hgetall(`invite:${token}`);
  if (!invite || Number(invite.used) === 1) return { error: "Cannot edit a used invite." };

  await redis.hset(`invite:${token}`, {
    label,
    ...(lockedName ? { lockedName } : { lockedName: "" }),
  });

  return { success: true };
}

export async function deleteInvite(token: string) {
  const authed = await isAdminAuthenticated();
  if (!authed) return { error: "Unauthorized" };

  await redis.del(`invite:${token}`);
  // Remove from index
  await redis.lrem("invites:index", 0, token);

  return { success: true };
}
