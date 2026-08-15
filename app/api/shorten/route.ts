import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@backend/db/prisma";
import { shortenSchema } from "@backend/validators/shorten.schema";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { redis } from "@backend/cache/redis";


export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const parsed = shortenSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { originalUrl, customCode, password, expiresAt } = parsed.data;

    // ─── Freemium Logic ───
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      // Guest User: Rule A (Feature Gate)
      if ((customCode && customCode.trim() !== "") || (password && password.trim() !== "") || (expiresAt && expiresAt.trim() !== "")) {
        return NextResponse.json(
          { error: "Please log in to use advanced features." },
          { status: 403 }
        );
      }

      // Guest User: Rule B (Usage Limit)
      if (redis) {
        const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
        const limitKey = `guest_limit:${ip}`;
        const count = await redis.get<number>(limitKey) || 0;
        
        if (count >= 3) {
          return NextResponse.json(
            { error: "Free limit reached. Please log in to create more links." },
            { status: 403 }
          );
        }
        await redis.incr(limitKey);
      }
    }


    let shortCode: string;

    if (customCode && customCode.trim() !== "") {
      // Check if the custom alias is already taken
      const existing = await prisma.link.findUnique({
        where: { shortCode: customCode.trim() },
      });

      if (existing) {
        return NextResponse.json(
          { error: `The alias "${customCode}" is already in use. Please choose a different one.` },
          { status: 409 } // 409 Conflict
        );
      }

      shortCode = customCode.trim();
    } else {
      // Auto-generate a unique 6-character code, retrying on collision (very unlikely)
      let attempts = 0;
      do {
        shortCode = nanoid(6);
        const collision = await prisma.link.findUnique({ where: { shortCode } });
        if (!collision) break;
        attempts++;
      } while (attempts < 5);

      if (attempts >= 5) {
        return NextResponse.json(
          { error: "Failed to generate a unique short code. Please try again." },
          { status: 500 }
        );
      }
    }


    let hashedPassword: string | null = null;
    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password.trim(), 10);
    }


    let expiresAtDate: Date | null = null;
    if (expiresAt && expiresAt.trim() !== "") {
      expiresAtDate = new Date(expiresAt);

      // Reject dates in the past
      if (expiresAtDate <= new Date()) {
        return NextResponse.json(
          { error: "Expiration date must be in the future." },
          { status: 400 }
        );
      }
    }


    const link = await prisma.link.create({
      data: {
        originalUrl,
        shortCode,
        password: hashedPassword,
        expiresAt: expiresAtDate,
        userId: userId || null,
      },
    });


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const shortUrl = `${baseUrl}/${link.shortCode}`;

    return NextResponse.json(
      {
        id: link.id,
        originalUrl: link.originalUrl,
        shortCode: link.shortCode,
        shortUrl,
        expiresAt: link.expiresAt,
        passwordProtected: !!link.password,
        clicks: link.clicks,
        createdAt: link.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[/api/shorten] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
