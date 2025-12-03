import { Redis } from "@upstash/redis";
import GuestbookForm from "./form";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
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
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 min-h-screen">
      <Navigation />
      <CustomCursor />
      <NextTopLoader />
      
      <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto pt-24 md:pt-32 pb-16">
        <div className="max-w-2xl w-full mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 font-display">
              Guestbook
            </h1>
            <p className="text-zinc-400 text-lg">
              Leave a message for me and future visitors.
            </p>
          </div>

          <GuestbookForm />

          <div className="space-y-4">
            {entries.length === 0 ? (
              <p className="text-center text-zinc-500 italic">No entries yet. Be the first!</p>
            ) : (
              entries.map((entry: any) => (
                <Card key={entry.id}>
                  <div className="p-4 md:p-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-200 font-medium text-lg">
                        {entry.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {formatDistanceToNow(entry.created_at, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
                      {entry.message}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
