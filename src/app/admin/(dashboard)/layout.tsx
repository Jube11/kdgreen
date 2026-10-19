import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await verifySession();
  if (!admin) redirect("/admin/login");

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen"
      style={{
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
      }}
    >
      <AdminSidebar admin={admin} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
        {children}
      </main>
    </div>
  );
}
