import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resend } from "@/lib/resend";
import { COMPANY } from "@/lib/constants";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  vehicle: z.string().min(1, "Vehicle is required"),
  issue: z.string().min(1, "Issue description is required"),
  urgency: z.string().default("normal"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // 1. Save request in database
    const request = await prisma.serviceRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        truckModel: data.vehicle,
        location: "Provided via online form",
        serviceType: "Mobile Service / Roadside",
        symptoms: data.issue,
        priority: data.urgency,
        status: "pending",
      },
    });

    // 2. Dispatch email notification via Resend
    if (resend) {
      try {
        const toEmail = process.env.DISPATCH_NOTIFICATION_EMAIL || COMPANY.email;
        const fromEmail = process.env.RESEND_FROM_EMAIL || "KD Green Dispatch <onboarding@resend.dev>";

        const urgencyLabel: Record<string, string> = {
          emergency: "🚨 EMERGENCY — Stranded Now",
          urgent: "⚡ URGENT — Need Help Today",
          normal: "📅 Normal Schedule",
        };

        await resend.emails.send({
          from: fromEmail,
          to: toEmail,
          subject: `[${urgencyLabel[data.urgency] || data.urgency.toUpperCase()}] New Service Request from ${data.name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
              <div style="border-bottom: 2px solid #16a34a; padding-bottom: 16px; margin-bottom: 20px;">
                <h2 style="color: #111827; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.5px;">KD GREEN MULTISERVICES</h2>
                <p style="color: #16a34a; margin: 4px 0 0 0; font-size: 13px; font-weight: 700;">NEW SERVICE REQUEST RECEIVED</p>
              </div>

              <div style="margin-bottom: 20px; background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #f3f4f6;">
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Customer:</strong> ${data.name}</p>
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #16a34a; font-weight: bold; text-decoration: none;">${data.phone}</a></p>
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Vehicle:</strong> ${data.vehicle}</p>
                <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Urgency:</strong> <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; background: ${data.urgency === 'emergency' ? '#fee2e2; color: #dc2626;' : data.urgency === 'urgent' ? '#fef3c7; color: #d97706;' : '#e0e7ff; color: #4338ca;'}">${urgencyLabel[data.urgency] || data.urgency}</span></p>
              </div>

              <div style="margin-bottom: 24px;">
                <h4 style="margin: 0 0 8px 0; color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Issue Description:</h4>
                <div style="background-color: #ffffff; padding: 12px 16px; border-left: 3px solid #16a34a; border-radius: 4px; font-size: 14px; color: #4b5563; line-height: 1.5; background-color: #f8fafc;">
                  ${data.issue.replace(/\n/g, "<br/>")}
                </div>
              </div>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; font-size: 12px; color: #9ca3af; display: flex; justify-content: space-between;">
                <span>Request ID: #${request.id}</span>
                <span>Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} EST</span>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        // Log Resend error without failing request submission
        console.error("Resend dispatch email error:", emailErr);
      }
    } else {
      console.warn("RESEND_API_KEY not configured. Skipping email dispatch.");
    }

    return NextResponse.json({ success: true, id: request.id }, { status: 201 });
  } catch (error) {
    console.error("Service request error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
