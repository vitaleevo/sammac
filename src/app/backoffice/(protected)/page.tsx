import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { getAdminSession } from "@/lib/auth";
import { convex } from "@/lib/convex-server";
import { api } from "../../../../convex/_generated/api";
export default async function Page() {
  if (!(await getAdminSession())) redirect("/backoffice/login");
  if (!convex || !process.env.ADMIN_WRITE_SECRET)
    throw new Error("Backend indisponível.");
  const data = await convex.query(api.content.adminDashboard, {
    secret: process.env.ADMIN_WRITE_SECRET,
  });
  return <AdminDashboard initialData={data} />;
}
