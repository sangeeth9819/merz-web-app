"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { AmountVisibilityProvider } from "@/contexts/amount-visibility-context";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AmountVisibilityProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto bg-slate-50/30 dark:bg-slate-950 p-4 md:p-6 transition-colors duration-300">
            {children}
          </main>
        </div>
      </div>
    </AmountVisibilityProvider>
  );
}
