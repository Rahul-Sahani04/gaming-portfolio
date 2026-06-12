"use client";

import { useState, useTransition } from "react";
import { createInvite, deleteInvite, logoutAdmin, updateInvite } from "./actions";
import { Copy, Plus, Trash2, CheckCheck, Loader2, LogOut, Pencil, Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Invite = {
  token: string;
  label: string;
  lockedName: string | null;
  used: boolean;
  createdAt: number;
  usedAt: number | null;
};

export default function AdminClient({ initialInvites }: { initialInvites: Invite[] }) {
  const [invites, setInvites] = useState<Invite[]>(initialInvites);
  const [label, setLabel] = useState("");
  const [lockedName, setLockedName] = useState("");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editLockedName, setEditLockedName] = useState("");
  const [isPending, startTransition] = useTransition();

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const handleCreate = () => {
    if (!label.trim()) return;
    startTransition(async () => {
      const res = await createInvite(label.trim(), lockedName.trim() || undefined);
      if (res?.token) {
        setInvites((prev) => [
          {
            token: res.token,
            label: label.trim(),
            used: false,
            createdAt: Date.now(),
            usedAt: null,
          },
          ...prev,
        ]);
        setLabel("");
        setLockedName("");
      }
    });
  };

  const handleCopy = (token: string) => {
    navigator.clipboard.writeText(`${baseUrl}/invite/${token}`);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleDelete = (token: string) => {
    startTransition(async () => {
      await deleteInvite(token);
      setInvites((prev) => prev.filter((i) => i.token !== token));
    });
  };

  const startEdit = (invite: Invite) => {
    setEditingToken(invite.token);
    setEditLabel(invite.label);
    setEditLockedName(invite.lockedName ?? "");
  };

  const cancelEdit = () => {
    setEditingToken(null);
    setEditLabel("");
    setEditLockedName("");
  };

  const saveEdit = (token: string) => {
    if (!editLabel.trim()) return;
    startTransition(async () => {
      const res = await updateInvite(token, editLabel.trim(), editLockedName.trim() || null);
      if (!res?.error) {
        setInvites((prev) =>
          prev.map((i) =>
            i.token === token
              ? { ...i, label: editLabel.trim(), lockedName: editLockedName.trim() || null }
              : i
          )
        );
      }
      setEditingToken(null);
    });
  };

  return (
    <div className="min-h-screen bg-black px-4 pt-16 pb-24">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-[10px] font-mono text-amber-500/70 tracking-[0.25em] uppercase mb-2 flex items-center gap-2">
              <span className="w-1 h-1 rounded-sm bg-amber-500/50" />
              BLACKLIST DATABASE
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase">Invite Manager</h1>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-300 transition-colors border border-white/[0.06] px-3 py-1.5 rounded-lg"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </form>
        </div>

        {/* Create new invite */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-8">
          <h2 className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-4">New Invite</h2>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="Label (e.g. for Subaru)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/30 transition-all"
              />
              <button
                onClick={handleCreate}
                disabled={isPending || !label.trim()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors disabled:opacity-40 shrink-0"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Generate
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                value={lockedName}
                onChange={(e) => setLockedName(e.target.value)}
                placeholder="Lock a name (optional) — e.g. Satwik"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-amber-500/40 focus:border-amber-500/30 transition-all"
              />
              {lockedName && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-amber-500/60 tracking-widest uppercase">
                  Locked
                </span>
              )}
            </div>
            {lockedName && (
              <p className="text-[11px] text-zinc-600 font-mono">
                The name field will be pre-filled with &quot;{lockedName}&quot; and cannot be edited by your friend.
              </p>
            )}
          </div>
        </div>

        {/* Invite list */}
        <div className="space-y-3">
          {invites.length === 0 && (
            <p className="text-center text-zinc-700 text-sm py-10">No invites yet. Create one above.</p>
          )}
          {invites.map((invite) => (
            <div
              key={invite.token}
              className={`p-4 rounded-xl border transition-colors ${invite.used
                  ? "bg-white/[0.01] border-white/[0.04] opacity-50"
                  : "bg-white/[0.02] border-white/[0.06]"
                }`}
            >
              {editingToken === invite.token ? (
                /* Inline edit mode */
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    placeholder="Label"
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-amber-500/30 text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/40"
                  />
                  <div className="relative">
                    <input
                      type="text"
                      value={editLockedName}
                      onChange={(e) => setEditLockedName(e.target.value)}
                      placeholder="Locked name (optional) — e.g. Satwik"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/40"
                    />
                    {editLockedName && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-amber-500/60 tracking-widest uppercase">
                        Locked
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 justify-end pt-1">
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/[0.08] text-zinc-500 hover:text-zinc-200 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" /> Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(invite.token)}
                      disabled={isPending || !editLabel.trim()}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold transition-colors disabled:opacity-40"
                    >
                      {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                /* Normal view */
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-zinc-200">{invite.label}</span>
                      {invite.used ? (
                        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 border border-white/[0.05] px-1.5 py-0.5 rounded-sm">
                          Used
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500/70 border border-amber-500/20 px-1.5 py-0.5 rounded-sm">
                          Pending
                        </span>
                      )}
                      {invite.lockedName && (
                        <span className="text-[9px] font-mono text-zinc-500 truncate max-w-[120px]">
                          🔒 {invite.lockedName}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-zinc-600 truncate">
                      {baseUrl}/invite/{invite.token}
                    </p>
                    <p className="text-[10px] text-zinc-700 mt-1">
                      Created {formatDistanceToNow(invite.createdAt, { addSuffix: true })}
                      {invite.used && invite.usedAt && (
                        <> · Used {formatDistanceToNow(invite.usedAt, { addSuffix: true })}</>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!invite.used && (
                      <>
                        <button
                          onClick={() => handleCopy(invite.token)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
                          title="Copy link"
                        >
                          {copiedToken === invite.token ? (
                            <CheckCheck className="w-3.5 h-3.5 text-amber-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          {copiedToken === invite.token ? "Copied" : "Copy"}
                        </button>
                        <button
                          onClick={() => startEdit(invite)}
                          className="p-1.5 rounded-lg text-zinc-600 hover:text-amber-400 transition-colors"
                          title="Edit invite"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(invite.token)}
                      className="p-1.5 rounded-lg text-zinc-700 hover:text-red-400 transition-colors"
                      title="Delete invite"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
