"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@frontend/components/ui/button";

export default function HeaderAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-9 w-20 animate-pulse bg-white/5 rounded-md" />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="Avatar"
              className="w-8 h-8 rounded-full border border-white/10"
            />
          )}
          <span className="text-sm font-medium text-slate-200 hidden sm:inline-block">
            {session.user?.name}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut()}
          className="text-slate-400 hover:text-white hover:bg-white/5"
        >
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => signIn("google")}
      className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
    >
      Sign in
    </Button>
  );
}
