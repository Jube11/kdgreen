import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import StockList from "@/components/admin/StockList";

export default async function StockPage() {
  const admin = await verifySession();
  if (!admin) redirect("/admin/login");

  const items = await prisma.stockItem.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1
          className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Stock &amp; Inventory
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage parts inventory, emergency reserves, and replenishment levels.
        </p>
      </div>
      <StockList items={items} />
    </div>
  );
}
