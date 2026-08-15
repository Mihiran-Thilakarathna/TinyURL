import { redirect, notFound } from "next/navigation";
import { prisma } from "@backend/db/prisma";
import { redis, linkCacheKey, DEFAULT_CACHE_TTL } from "@backend/cache/redis";
import PasswordForm from "./password-form";



interface CachedLink {
  originalUrl: string;
  hasPassword: boolean;
  expiresAt: string | null; // ISO string or null
}



function ExpiredPage() {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute -top-64 -left-32 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-6 space-y-4 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/25">
            <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Link Expired</h1>
        <p className="text-slate-400 leading-relaxed">
          This short link has passed its expiration date and is no longer active.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25"
        >
          Create a new link
        </a>
      </div>
    </main>
  );
}



export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;


  let linkData: CachedLink | null = null;
  if (redis) {
    linkData = await redis.get<CachedLink>(linkCacheKey(shortCode));
  }


  if (!linkData) {
    let dbLink: { originalUrl: string; password: string | null; expiresAt: Date | null } | null = null;

    try {
      dbLink = await prisma.link.findUnique({
        where: { shortCode },
        select: {
          originalUrl: true,
          password: true,
          expiresAt: true,
        },
      });
    } catch (err) {
      console.error("[redirect] DB query failed:", err);
      notFound();
    }

    if (!dbLink) {
      notFound(); // → app/not-found.tsx
    }

    linkData = {
      originalUrl: dbLink.originalUrl,
      hasPassword: !!dbLink.password,
      expiresAt: dbLink.expiresAt ? dbLink.expiresAt.toISOString() : null,
    };

    if (redis) {
      const ttl = dbLink.expiresAt
        ? Math.max(0, Math.floor((dbLink.expiresAt.getTime() - Date.now()) / 1000))
        : DEFAULT_CACHE_TTL;

      if (ttl > 0) {
        await redis.set(linkCacheKey(shortCode), linkData, { ex: ttl });
      }
    }
  }



  if (linkData.expiresAt && new Date(linkData.expiresAt) <= new Date()) {
    return <ExpiredPage />;
  }


  if (linkData.hasPassword) {
    return <PasswordForm shortCode={shortCode} />;
  }


  prisma.link
    .update({
      where: { shortCode },
      data: { clicks: { increment: 1 } },
    })
    .catch((err) => console.error("[redirect] click tracking failed:", err));


  redirect(linkData.originalUrl);
}
