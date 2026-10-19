import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ServiceRequestsList from "@/components/admin/ServiceRequestsList";

export default async function ServiceRequestsPage() {
  const admin = await verifySession();
  if (!admin) redirect("/admin/login");

  const requests = await prisma.serviceRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1
          className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Service Requests
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Manage incoming requests submitted by drivers and dispatchers.
        </p>
      </div>
      <ServiceRequestsList requests={requests} />
    </div>
  );
}
