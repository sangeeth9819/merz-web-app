"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Home, 
  Settings, 
  List, 
  Users, 
  Layers,
  ChevronDown
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
];

const subNavigation = [
  { name: "History", href: "/history" },
  { name: "Starred", href: "/starred" },
  { name: "Settings", href: "/settings/main" },
];

const mainNavigation = [
  { name: "Transactions", href: "/transactions", icon: List },
  { name: "Recipients", href: "/recipients", icon: Users },
  { name: "Accounts", href: "/accounts", icon: Layers },
];

const accountsSubNav = [
  { name: "General", href: "/accounts/general" },
  { name: "Team", href: "/accounts/team" },
  { name: "Billing", href: "/accounts/billing" },
  { name: "Limits", href: "/accounts/limits" },
];

const settingsNavigation = [
  { name: "General", href: "/settings/general" },
  { name: "Team", href: "/settings/team" },
  { name: "Billing", href: "/settings/billing" },
  { name: "Limits", href: "/settings/limits" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [accountsOpen, setAccountsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar - slides in from left */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full w-64 flex-col bg-slate-50 dark:bg-slate-900">
          {/* Mobile Header with close button */}
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold">
                M
              </div>
              <div>
                <div className="font-semibold text-sm dark:text-white">John Keells PLC</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Corporate</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-3 py-6 overflow-y-auto">
            <SidebarContent 
              pathname={pathname}
              accountsOpen={accountsOpen}
              setAccountsOpen={setAccountsOpen}
              settingsOpen={settingsOpen}
              setSettingsOpen={setSettingsOpen}
              onItemClick={onClose}
            />
          </div>

          {/* Footer */}
          <div className="px-4 py-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Powered by <span className="font-semibold text-slate-700 dark:text-slate-200">merz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar - always visible */}
      <div className="hidden lg:flex h-full w-64 flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold">
            M
          </div>
          <div>
            <div className="font-semibold text-sm dark:text-white">John Keells PLC</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Corporate</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-6 overflow-y-auto">
          <SidebarContent 
            pathname={pathname}
            accountsOpen={accountsOpen}
            setAccountsOpen={setAccountsOpen}
            settingsOpen={settingsOpen}
            setSettingsOpen={setSettingsOpen}
          />
        </div>

        {/* Footer */}
        <div className="px-4 py-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Powered by <span className="font-semibold text-slate-700 dark:text-slate-200">merz</span>
          </div>
        </div>
      </div>
    </>
  );
}

interface SidebarContentProps {
  pathname: string;
  accountsOpen: boolean;
  setAccountsOpen: (open: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  onItemClick?: () => void;
}

function SidebarContent({ 
  pathname, 
  accountsOpen, 
  setAccountsOpen, 
  settingsOpen, 
  setSettingsOpen,
  onItemClick 
}: SidebarContentProps) {
  return (
    <>
      {/* Home Section */}
      <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800",
                  isActive
                    ? "text-primary font-medium"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sub Navigation (indented) */}
        <nav className="mt-1 space-y-1">
          {subNavigation.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "block pl-10 pr-3 py-2 text-sm transition-colors",
                  isActive
                    ? "text-primary font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Main Navigation */}
        <nav className="mt-4 space-y-1">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            if (item.name === "Accounts") {
              return (
                <Collapsible key={item.name} open={accountsOpen} onOpenChange={setAccountsOpen}>
                  <CollapsibleTrigger asChild>
                    <div
                      className={cn(
                        "flex items-center justify-between px-3 py-2 text-sm transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer",
                        isActive && "text-primary font-medium"
                      )}
                      suppressHydrationWarning
                    >
                      <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-slate-700 dark:text-slate-300 transition-transform duration-200",
                          accountsOpen && "rotate-180"
                        )}
                      />
                    </div>
                  </CollapsibleTrigger>
                    
                  <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down" suppressHydrationWarning>
                      <nav className="mt-1 space-y-1">
                        {accountsSubNav.map((subItem) => {
                          const isSubActive = pathname === subItem.href;
                          
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={onItemClick}
                              className={cn(
                                "block pl-10 pr-3 py-2 text-sm transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800",
                                isSubActive
                                  ? "text-primary font-medium"
                                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                              )}
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </nav>
                    </CollapsibleContent>
                </Collapsible>
              );
            }
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800",
                  isActive
                    ? "text-primary font-medium"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Settings Expandable Section */}
        <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen} className="mt-4">
          <CollapsibleTrigger asChild>
            <div 
              className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-lg cursor-pointer"
              suppressHydrationWarning
            >
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4" />
                Settings
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-slate-700 dark:text-slate-300 transition-transform duration-200",
                  settingsOpen && "rotate-180"
                )}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down" suppressHydrationWarning>
            <nav className="mt-1 space-y-1">
              {settingsNavigation.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onItemClick}
                    className={cn(
                      "block pl-10 pr-3 py-2 text-sm transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800",
                      isActive
                        ? "text-primary font-medium"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </CollapsibleContent>
        </Collapsible>
    </>
  );
}