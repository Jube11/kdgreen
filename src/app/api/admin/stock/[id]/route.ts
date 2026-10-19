import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  name: z.string().optional(),
  sku: z.string().optional(),
  category: z.string().optional(),
  quantity: z.number().optional(),
  minQuantity: z.number().optional(),
  unitCost: z.number().optional(),
  location: z.string().optional(),
  supplier: z.string().optional(),
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

    const item = await prisma.stockItem.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Stock update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await verifySession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.stockItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stock delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
