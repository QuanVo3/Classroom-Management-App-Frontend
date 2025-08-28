"use client";

import { Provider } from "jotai";
import { Poppins, Nunito } from "next/font/google";
import "./globals.css";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../hooks/auth"; // import hook của bạn
import AuthGuard from "./AuthGuard";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    moment.locale("vi");
  }, []);

  return (
    <html lang="vi">
      <body
        className={`${nunito.variable} ${poppins.variable} antialiased bg-white font-base h-full`}
      >
        {/* Provider Jotai ở cấp cao nhất → state không bị mất khi redirect */}
        <Provider>
          <AuthGuard>{children}</AuthGuard>
        </Provider>
      </body>
    </html>
  );
}
