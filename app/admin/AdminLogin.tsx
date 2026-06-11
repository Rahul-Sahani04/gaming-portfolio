"use client";

import { useState } from "react";
import { loginAdmin } from "./actions";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await loginAdmin(password);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      // Refresh to load admin dashboard
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono text-amber-500/70 tracking-[0.25em] uppercase mb-4">
            <span className="w-1 h-1 rounded-sm bg-amber-500/50" />
            RESTRICTED ACCESS
            <span className="w-1 h-1 rounded-sm bg-amber-500/50" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-zinc-100 uppercase">Admin</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4"
        >
          <div>
            <label className="block text-xs font-mono text-zinc-600 mb-1.5 tracking-wider uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/30 transition-all"
              placeholder="••••••••"
            />
            {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors disabled:opacity-40"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
