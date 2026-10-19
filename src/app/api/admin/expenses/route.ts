import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  description: z.string().min(1),
  amount: z.number().min(0),
  category: z.string().default("other"),
  date: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const admin = await verifySession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const expense = await prisma.expense.create({
      data: {
        description: data.description,
        amount: data.amount,
        category: data.category,
        date: data.date ? new Date(data.date) : new Date(),
        notes: data.notes || null,
      },
    });

    return NextResponse.json({ success: true, expense }, { status: 201 });
  } catch (error) {
    console.error("Expense create error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
