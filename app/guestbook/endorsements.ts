export interface Endorsement {
  id: string;
  name: string;
  role: string;
  message: string;
  avatar: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  instagram?: string;
  pinterest?: string;
  twitter?: string;
  memeUrl?: string;
}

// All endorsements are now submitted via invite links (/invite/[token])
// and stored in Redis under "endorsements:dynamic".
// See endorsements.backup.ts for the original hardcoded entries.
export const endorsements: Endorsement[] = [];
