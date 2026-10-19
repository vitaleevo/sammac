import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await getAdminSession())) redirect("/backoffice/login");
  return (
    <div className="fixed inset-0 z-[90] overflow-auto bg-[#f2f5fa]">
      {children}
    </div>
  );
}
