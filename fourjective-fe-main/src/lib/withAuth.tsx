"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
      let isMounted = true;

      // Cek cookie session via endpoint /api/auth/admin-logout (GET)
      fetch("/api/auth/admin-logout", { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          if (data && data.authenticated) {
            setIsAuthorized(true);
          } else {
            // Cek fallback localStorage dev preview
            const localDev = localStorage.getItem("fourjective_admin_session");
            if (localDev === "true") {
              setIsAuthorized(true);
            } else {
              setIsAuthorized(false);
              router.replace("/portal?mode=admin");
            }
          }
        })
        .catch(() => {
          if (!isMounted) return;
          const localDev = localStorage.getItem("fourjective_admin_session");
          if (localDev === "true") {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
            router.replace("/portal?mode=admin");
          }
        });

      return () => {
        isMounted = false;
      };
    }, [router]);

    if (isAuthorized === null) {
      return (
        <div className="min-h-screen bg-[#121318] flex items-center justify-center text-white">
          <div className="flex items-center gap-3 font-mono text-xs text-white/60">
            <span className="w-2.5 h-2.5 rounded-full bg-orange animate-ping" />
            <span>Memverifikasi Akses Admin Fourjective...</span>
          </div>
        </div>
      );
    }

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
