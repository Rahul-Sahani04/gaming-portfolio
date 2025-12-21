"use server";

import { Redis } from "@upstash/redis";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const redis = Redis.fromEnv();

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  message: z.string().min(1, "Message is required").max(500, "Message is too long"),
});

export async function saveGuestbookEntry(formData: FormData) {
  const name = formData.get("name");
  const message = formData.get("message");

  const result = formSchema.safeParse({ name, message });

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const entry = {
    id: Date.now().toString(),
    name: result.data.name,
    message: result.data.message,
    created_at: Date.now(),
  };

  try {
    // Add to the beginning of the list
    await redis.lpush("guestbook:entries", JSON.stringify(entry));
    revalidatePath("/guestbook");
    return { success: true };
  } catch (error) {
    console.error("Failed to save guestbook entry:", error);
    return { error: "Failed to save entry" };
  }
}

const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(100),
  message: z.string().min(1, "Message is required").max(1000),
});

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const result = contactSchema.safeParse({ email, subject, message });

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  try {
    if (!process.env.RESEND_API_KEY) {
        console.log("RESEND_API_KEY missing. Logging email:", result.data);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true };
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Default Resend testing domain
      to: 'devilken43@gmail.com', // User's email from contact page
      subject: `[Portfolio] ${result.data.subject}`,
      replyTo: result.data.email,
      text: `Name: ${result.data.email}\nMessage: ${result.data.message}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { error: "Failed to send email" };
  }
}

export async function getProjectViews(slug: string): Promise<number> {
  try {
    const viewCount = await redis.get<number>(["pageviews", "projects", slug].join(":"));
    return viewCount ?? 0;
  } catch (error) {
    console.error("Failed to fetch project views:", error);
    return 0;
  }
}

import { headers } from "next/headers";

export async function recordEasterEggDiscovery() {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    
    // Add to set of discoverers (prevents duplicates from same IP)
    await redis.sadd("easter_egg:discoverers", ip);
    
    // Increment total count
    const count = await redis.scard("easter_egg:discoverers");
    
    return { success: true, count };
  } catch (error) {
    console.error("Failed to record easter egg discovery:", error);
    return { error: "Failed to record discovery" };
  }
}
