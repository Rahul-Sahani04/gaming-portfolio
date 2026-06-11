import { Redis } from "@upstash/redis";
import InviteForm from "./InviteForm";

const redis = Redis.fromEnv();

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invite = await redis.hgetall(`invite:${token}`);

  if (!invite) {
    return <InvalidInvite message="This invite link doesn't exist." />;
  }

  if (Number(invite.used) === 1) {
    return <InvalidInvite message="This invite has already been used." />;
  }

  return <InviteForm token={token} label={invite.label as string} />;
}

function InvalidInvite({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-[10px] font-mono text-amber-500/70 tracking-[0.25em] uppercase mb-4 flex items-center justify-center gap-2">
          <span className="w-1 h-1 rounded-sm bg-amber-500/50" />
          TRANSMISSION FAILED
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-zinc-300 uppercase mb-3">
          Invalid Link
        </h1>
        <p className="text-zinc-500 text-sm">{message}</p>
      </div>
    </div>
  );
}
