import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import OperationsList from "@/components/admin/OperationsList";

export default async function OperationsPage() {
  const admin = await verifySession();
  if (!admin) redirect("/admin/login");

  const operations = await prisma.operation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1
          className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Operations
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage roadside dispatch jobs, on-site repairs, and fleet units.
        </p>
      </div>
      <OperationsList operations={operations} />
    </div>
  );
}
