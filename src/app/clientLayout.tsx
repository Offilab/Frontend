// src/app/client-layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <>
    
      <Header>{children}</Header>
      <main className="flex-1 overflow-auto p-3 md:p-6 bg-gradient-to-br from-background via-background to-blue-50/30">
        <div className="animate-in slide-in-from-right-5 duration-300 max-w-full"></div>
      </main>
    </>
  );
}
