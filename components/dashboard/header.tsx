"use client";

import { Button } from "@/components/ui/button";
import { Search, Bell, Moon, Sun, Plus, Eye, EyeOff } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAmountVisibility } from "@/contexts/amount-visibility-context";
import { PayoutModal } from "@/components/payout/payout-modal";

interface HeaderProps {
  greeting?: string;
  userName?: string;
  onMenuClick?: () => void;
}

export function Header({ greeting = "Good evening", userName = "Mayushan", onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { isAmountVisible, toggleAmountVisibility } = useAmountVisibility();
  const [mounted, setMounted] = useState(false);
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Use View Transition API if available for smooth animation
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      (document as any).startViewTransition(() => {
        setTheme(theme === "dark" ? "light" : "dark");
      });
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white dark:bg-slate-900 px-4 md:px-6 transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {greeting}, {userName}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Actions */}
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Search className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        </Button>
        
        <Button variant="ghost" size="icon" onClick={toggleAmountVisibility}>
          {isAmountVisible ? (
            <Eye className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          ) : (
            <EyeOff className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          )}
        </Button>
        
        {mounted && (
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? (
              <Sun className="h-5 w-5 text-slate-700 dark:text-slate-300 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300 transition-transform duration-300 rotate-0 hover:-rotate-12" />
            )}
          </Button>
        )}
        
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Bell className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        </Button>

        <Button className="gap-2 hidden sm:flex" onClick={() => setPayoutModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Payout
        </Button>
        
        {/* Mobile: Show only icon */}
        <Button size="icon" className="sm:hidden" onClick={() => setPayoutModalOpen(true)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <PayoutModal open={payoutModalOpen} onOpenChange={setPayoutModalOpen} />
    </header>
  );
}
