"use client";

import { useAuth } from "@/app/auth/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: React.ComponentType<any>) {
  return function WithAuth(props: any) {
    const { session, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !session) {
        router.push("/auth/sign-in");
      }
    }, [session, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!session) {
      return null;
    }

    return <Component {...props} />;
  };
}