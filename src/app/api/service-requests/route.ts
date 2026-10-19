import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  company: z.string().optional(),
  truckModel: z.string().optional(),
  location: z.string().min(1),
  serviceType: z.string().min(1),
  paymentMethod: z.string().default("comcheck"),
  symptoms: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const request = await prisma.serviceRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        company: data.company || null,
        truckModel: data.truckModel || null,
        location: data.location,
        serviceType: data.serviceType,
        paymentMethod: data.paymentMethod,
        symptoms: data.symptoms || null,
      },
    });

    return NextResponse.json({ success: true, id: request.id }, { status: 201 });
  } catch (error) {
    console.error("Service request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
