"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/auth/context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link href={href} className="inline-flex items-center">
      <Button variant={isActive ? "default" : "ghost"} className="px-3">
        {label}
      </Button>
    </Link>
  );
}

export function SiteHeader() {
  const { session, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="mx-auto max-w-10xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl">
          ALX Polly
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink href="/polls" label="Polls" />
          <NavLink href="/polls/new" label="New Poll" />
        </nav>

        <div className="flex items-center gap-2">
          {loading ? null : session ? (
            <>
              <span>{session.user.user_metadata.name}</span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;



