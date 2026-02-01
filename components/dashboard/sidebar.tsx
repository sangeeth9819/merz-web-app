"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Settings,
  List,
  Users,
  Layers,
  ChevronDown,
  LogOut
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
];

const subNavigation: any[] = [];

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
        <div className="flex h-full w-64 flex-col bg-slate-50 dark:bg-neutral-900">
          {/* Mobile Header with close button */}
          <div className="flex h-16 items-center justify-between px-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors -ml-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-sm dark:text-white leading-none">John Keells PLC</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Corporate</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400 ml-1" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 z-50 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-slate-700 shadow-xl" side="bottom">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings/general" className="cursor-pointer w-full flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signin" className="cursor-pointer w-full flex items-center text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              Powered by
              <div className="relative h-4 w-12">
                <Image
                  src="/assets/logo-black.svg"
                  alt="Merz"
                  fill
                  className="object-contain block dark:hidden"
                />
                <Image
                  src="/assets/logo-white.svg"
                  alt="Merz"
                  fill
                  className="object-contain hidden dark:block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar - always visible */}
      <div className="hidden lg:flex h-full w-64 flex-col bg-slate-50 dark:bg-neutral-900 transition-colors duration-300">
        {/* Desktop Header / Logo Area */}
        <div className="flex h-16 items-center px-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 w-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-bold shrink-0">
                  M
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm dark:text-white truncate">John Keells PLC</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">Corporate</div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 z-50 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-slate-700 shadow-xl" side="bottom">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings/general" className="cursor-pointer w-full flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signin" className="cursor-pointer w-full flex items-center text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            Powered by
            <div className="relative h-4 w-12">
              <Image
                src="/assets/logo-black.svg"
                alt="Merz"
                fill
                className="object-contain block dark:hidden"
              />
              <Image
                src="/assets/logo-white.svg"
                alt="Merz"
                fill
                className="object-contain hidden dark:block"
              />
            </div>
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
                "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors rounded-lg",
                isActive
                  ? "text-slate-900 dark:text-white font-medium bg-slate-200 dark:bg-slate-800"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
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
      <nav className="mt-1 space-y-1">
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
                            "block pl-10 pr-3 py-2.5 text-sm transition-colors rounded-lg",
                            isSubActive
                              ? "text-slate-900 dark:text-white font-medium bg-slate-200 dark:bg-slate-800"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
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
                "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors rounded-lg",
                isActive
                  ? "text-slate-900 dark:text-white font-medium bg-slate-200 dark:bg-slate-800"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Settings Expandable Section */}
      <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen} className="mt-1">
        <CollapsibleTrigger asChild>
          <div
            className="flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-lg cursor-pointer"
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
                    "block pl-10 pr-3 py-2.5 text-sm transition-colors rounded-lg",
                    isActive
                      ? "text-slate-900 dark:text-white font-medium bg-slate-200 dark:bg-slate-800"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
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