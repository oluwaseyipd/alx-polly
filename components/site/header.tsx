"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/auth/context";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Helper function to get initials
const getInitials = (name: string) => {
  const parts = name.split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
};

export function SiteHeader() {
  const { session, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const isLandingPage = pathname === "/"; // Assuming / is redirected to /landing

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="mx-auto max-w-10xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl">
          ALX Polly
        </Link>

        <div className="flex items-center gap-2">
          {loading ? null : session ? (
            <>
              {isLandingPage && (
                <Link href="/dashboard/polls">
                  <Avatar className="cursor-pointer">
                    <AvatarFallback>
                      {getInitials(session.user.user_metadata.name || "User")}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              )}
              <Link href="/dashboard/polls">
                <span
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600 text-lg cursor-pointer"
                  title="Go to dashboard"
                  aria-label="Go to dashboard"
                  style={{ padding: 0, border: "none", background: "none" }}
                >
                  {getInitials(session.user.user_metadata.name || "User")}
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in">
                <Button variant="outline" className="cursor-pointer">
                  Sign in
                </Button>
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
