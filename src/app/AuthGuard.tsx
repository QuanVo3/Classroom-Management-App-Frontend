// components/AuthGuard.tsx
"use client";
import { useAuth } from "@/src/hooks/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { setUserInfo, requestLoginRefreshToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    requestLoginRefreshToken
      .runAsync()
      .then((res) => {
        setUserInfo({
          token: res.token,
          user: res.user,
          isAuthenticated: true,
        });
        if (res.user.role === "teacher" && pathname !== "/instructor") {
          router.replace("/instructor");
        } else if (res.user.role === "student" && pathname !== "/student") {
          router.replace("/student");
        }
      })
      .catch(() => {
        if (pathname !== "/login") router.replace("/login");
      })
      .finally(() => setCheckingAuth(false));
  }, []);

  if (checkingAuth) return <div>Đang kiểm tra đăng nhập...</div>;
  return <>{children}</>;
}
