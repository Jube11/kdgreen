import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  type: z.string().min(1),
  status: z.string().default("scheduled"),
  location: z.string().optional(),
  truckInfo: z.string().optional(),
  assignedTo: z.string().optional(),
  scheduledAt: z.string().optional(),
  cost: z.number().optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const admin = await verifySession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const operation = await prisma.operation.create({
      data: {
        title: data.title,
        type: data.type,
        status: data.status,
        location: data.location || null,
        truckInfo: data.truckInfo || null,
        assignedTo: data.assignedTo || null,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        cost: data.cost || null,
        notes: data.notes || null,
      },
    });

    return NextResponse.json({ success: true, operation }, { status: 201 });
  } catch (error) {
    console.error("Operation create error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
