"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/app/auth/context";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link href={href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className="w-full justify-start"
      >
        {label}
      </Button>
    </Link>
  );
}

export function Sidebar() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <Link href="/" className="font-semibold text-xl">
          ALX Polly
        </Link>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink href="/polls/new" label="New Poll" />
        <NavLink href="/polls" label="All Polls" />
        <NavLink href="/settings" label="Settings" />
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleSignOut}
        >
          Logout
        </Button>
      </nav>
    </div>
  );
}
