import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ExpensesList from "@/components/admin/ExpensesList";

export default async function ExpensesPage() {
  const admin = await verifySession();
  if (!admin) redirect("/admin/login");

  const expenses = await prisma.expense.findMany({
    orderBy: { date: "desc" },
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1
          className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Expenses
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Track commercial vehicle maintenance, fuel, and fleet costs.
        </p>
      </div>
      <ExpensesList expenses={expenses} total={total} />
    </div>
  );
}
