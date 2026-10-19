import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  status: z.string().optional(),
  priority: z.string().optional(),
  assignedTo: z.string().optional(),
  estimatedCost: z.number().optional(),
  finalCost: z.number().optional(),
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

    const request = await prisma.serviceRequest.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, request });
  } catch (error) {
    console.error("Service request update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
