"use client";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // Chứa các provider khác nếu cần, KHÔNG bọc lại Jotai Provider ở đây
  return <>{children}</>;
}
