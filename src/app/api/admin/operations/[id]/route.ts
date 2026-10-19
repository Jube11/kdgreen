import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  location: z.string().optional(),
  truckInfo: z.string().optional(),
  assignedTo: z.string().optional(),
  scheduledAt: z.string().optional(),
  completedAt: z.string().optional(),
  cost: z.number().optional(),
  notes: z.string().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifySession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const data = schema.parse(body);

    const operation = await prisma.operation.update({
      where: { id },
      data: {
        ...data,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
        completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
      },
    });

    return NextResponse.json({ success: true, operation });
  } catch (error) {
    console.error("Operation update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
