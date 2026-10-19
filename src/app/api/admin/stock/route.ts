import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  category: z.string().optional(),
  quantity: z.number().default(0),
  minQuantity: z.number().default(5),
  unitCost: z.number().default(0),
  location: z.string().optional(),
  supplier: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const admin = await verifySession();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const item = await prisma.stockItem.create({
      data: {
        name: data.name,
        sku: data.sku,
        category: data.category || null,
        quantity: data.quantity,
        minQuantity: data.minQuantity,
        unitCost: data.unitCost,
        location: data.location || null,
        supplier: data.supplier || null,
      },
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error("Stock create error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
