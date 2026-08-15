"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@frontend/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@frontend/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@frontend/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function HeaderAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-9 w-9 animate-pulse bg-muted rounded-full" />;
  }

  if (session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
          <Avatar className="h-9 w-9 cursor-pointer border-2 border-transparent hover:border-violet-500/60 transition-colors duration-150">
            <AvatarImage
              src={session.user.image ?? ""}
              alt={session.user.name ?? "User"}
            />
            <AvatarFallback className="bg-muted text-muted-foreground text-sm font-semibold">
              {session.user.name?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-60 p-0 overflow-hidden rounded-2xl border border-border/50 shadow-xl shadow-black/20 bg-card"
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage
                src={session.user.image ?? ""}
                alt={session.user.name ?? "User"}
              />
              <AvatarFallback className="bg-muted text-muted-foreground text-sm font-semibold">
                {session.user.name?.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {session.user.email}
              </p>
            </div>
          </div>

          <div className="p-1">
            <DropdownMenuItem
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      size="sm"
      onClick={() => signIn("google")}
      className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 shadow-lg shadow-violet-600/20"
    >
      Sign in
    </Button>
  );
}
