import { NextRequest, NextResponse } from "next/server";
import { loginAdmin, createSession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = schema.parse(body);

    const admin = await loginAdmin(email, password);
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createSession(admin.id);
    return NextResponse.json({ success: true, admin });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
