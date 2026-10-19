import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentActivity from "@/components/admin/RecentActivity";

export default async function AdminDashboard() {
  const admin = await verifySession();
  if (!admin) redirect("/admin/login");

  const [
    totalRequests,
    pendingRequests,
    activeOperations,
    lowStockItems,
    totalExpenses,
    recentRequests,
    recentOperations,
  ] = await Promise.all([
    prisma.serviceRequest.count(),
    prisma.serviceRequest.count({ where: { status: "pending" } }),
    prisma.operation.count({ where: { status: { in: ["scheduled", "in_progress"] } } }),
    prisma.stockItem.count({ where: { quantity: { lte: 5 } } }),
    prisma.expense.aggregate({ _sum: { amount: true } }),
    prisma.serviceRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        phone: true,
        serviceType: true,
        status: true,
        priority: true,
        createdAt: true,
      },
    }),
    prisma.operation.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        type: true,
        status: true,
        location: true,
        scheduledAt: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1
          className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Welcome back, {admin.name}. Live fleet operations and dispatch metrics.
        </p>
      </div>

      <DashboardStats
        totalRequests={totalRequests}
        pendingRequests={pendingRequests}
        activeOperations={activeOperations}
        lowStockItems={lowStockItems}
        totalExpenses={totalExpenses._sum.amount || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity
          title="Recent Service Requests"
          items={recentRequests.map((r) => ({
            id: r.id,
            title: r.name,
            subtitle: r.serviceType,
            status: r.status,
            priority: r.priority,
            date: r.createdAt,
          }))}
          viewAllHref="/admin/service-requests"
        />
        <RecentActivity
          title="Recent Operations"
          items={recentOperations.map((o) => ({
            id: o.id,
            title: o.title,
            subtitle: o.type,
            status: o.status,
            date: o.scheduledAt || o.createdAt,
          }))}
          viewAllHref="/admin/operations"
        />
      </div>
    </div>
  );
}
