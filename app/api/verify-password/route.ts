import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@backend/db/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";



const verifySchema = z.object({
  shortCode: z.string().min(1),
  password: z.string().min(1),
});



export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Missing credentials." }, { status: 400 });
    }

    const { shortCode, password } = parsed.data;

    // Fetch only the fields we need
    const link = await prisma.link.findUnique({
      where: { shortCode },
      select: {
        id: true,
        originalUrl: true,
        password: true,
        expiresAt: true,
      },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found." }, { status: 404 });
    }

    // Check expiry
    if (link.expiresAt && link.expiresAt <= new Date()) {
      return NextResponse.json({ error: "This link has expired." }, { status: 410 });
    }

    if (!link.password) {
      return NextResponse.json({ error: "This link is not password protected." }, { status: 400 });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, link.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Incorrect password. Please try again." }, { status: 401 });
    }

    // Track click on successful password verification
    await prisma.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });

    return NextResponse.json({ originalUrl: link.originalUrl }, { status: 200 });
  } catch (error) {
    console.error("[/api/verify-password] Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected server error occurred." }, { status: 500 });
  }
}
