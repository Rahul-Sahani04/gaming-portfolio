import { isAdminAuthenticated, getInvites } from "./actions";
import AdminLogin from "./AdminLogin";
import AdminClient from "./AdminClient";

export const metadata = { title: "Admin | Rahul Sahani" };

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <AdminLogin />;
  }

  const invites = await getInvites();

  return <AdminClient initialInvites={(invites as any[]).filter(Boolean)} />;
}
