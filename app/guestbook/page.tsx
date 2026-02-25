import { Redis } from "@upstash/redis";
import GuestbookForm from "./form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guestbook | Rahul Sahani",
  description: "Leave a message for me and future visitors.",
};
import { Navigation } from "../components/nav";
import { formatDistanceToNow } from "date-fns";
import CustomCursor from "../components/CustomCursor";
import NextTopLoader from "nextjs-toploader";

const redis = Redis.fromEnv();

export const revalidate = 0; // Disable caching for this page to show new entries immediately

export default async function GuestbookPage() {
  const entries = (await redis.lrange("guestbook:entries", 0, -1)).map((entry: any) => {
    if (typeof entry === 'string') {
      try {
        return JSON.parse(entry);
      } catch (e) {
        return null;
      }
    }
    return entry;
  }).filter(Boolean);

  return (
    <div className="bg-cyber-dark bg-cyber-grid bg-fixed min-h-screen relative">
      <Navigation />
      <CustomCursor />
      <NextTopLoader />

      <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto pt-24 md:pt-32 pb-16">
        <div className="max-w-2xl w-full mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-100 font-display">
              Guestbook
            </h1>
            <p className="text-zinc-400 text-lg font-light">
              Leave a message for me and future visitors.
            </p>
          </div>

          <GuestbookForm />

          <div className="space-y-6">
            {entries.length === 0 ? (
              <p className="text-center text-zinc-500 italic font-light">No entries yet. Be the first!</p>
            ) : (
              entries.map((entry: any) => (
                <div
                  key={entry.id}
                  className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] transition-colors hover:bg-white/[0.04] backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-100 font-medium text-lg tracking-tight">
                        {entry.name}
                      </span>
                      <span className="text-sm text-zinc-500 font-light">
                        {formatDistanceToNow(entry.created_at, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed font-light whitespace-pre-wrap">
                      {entry.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
