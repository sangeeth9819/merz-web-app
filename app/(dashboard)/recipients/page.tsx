"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddRecipientModal } from "@/components/recipients/add-recipient-modal";
import { InviteRecipientModal } from "@/components/recipients/invite-recipient-modal";
import {
  Search,
  LayoutGrid,
  List,
  RotateCcw,
  Download,
  SlidersHorizontal,
  Filter,
  UserPlus,
  Plus,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Recipient {
  id: string;
  name: string;
  initials: string;
  initialsColor: string;
  bank: string;
  bankIcon: string;
  accountNumber: string;
  lastPaid: string;
  status: "Verified" | "Rejected" | "Invited" | "Pending";
  totalPaid: string;
  cents: string;
  type: string;
}

const recipients: Recipient[] = [
  {
    id: "1",
    name: "Alex Davidson",
    initials: "AD",
    initialsColor: "bg-blue-100 text-blue-600",
    bank: "HNB",
    bankIcon: "🏦",
    accountNumber: "3456",
    lastPaid: "12 Nov, 25",
    status: "Verified",
    totalPaid: "-184,567",
    cents: "56",
    type: "Vendors",
  },
  {
    id: "2",
    name: "Apex Logistics",
    initials: "AL",
    initialsColor: "bg-orange-100 text-orange-600",
    bank: "Sampath",
    bankIcon: "🏦",
    accountNumber: "8050",
    lastPaid: "21 Nov, 25",
    status: "Rejected",
    totalPaid: "-12,500",
    cents: "35",
    type: "Employees",
  },
  {
    id: "3",
    name: "Eco Clean Servi...",
    initials: "EC",
    initialsColor: "bg-teal-100 text-teal-600",
    bank: "HNB",
    bankIcon: "🏦",
    accountNumber: "3456",
    lastPaid: "17 Nov, 25",
    status: "Verified",
    totalPaid: "-23,890",
    cents: "45",
    type: "Partners",
  },
  {
    id: "4",
    name: "David Pieris Mot...",
    initials: "CN",
    initialsColor: "bg-slate-100 text-slate-600",
    bank: "-",
    bankIcon: "",
    accountNumber: "",
    lastPaid: "-",
    status: "Invited",
    totalPaid: "-",
    cents: "",
    type: "-",
  },
  {
    id: "5",
    name: "Green Energy S...",
    initials: "GE",
    initialsColor: "bg-emerald-100 text-emerald-600",
    bank: "HNB",
    bankIcon: "🏦",
    accountNumber: "3456",
    lastPaid: "01 Dec, 25",
    status: "Pending",
    totalPaid: "-50,000",
    cents: "50",
    type: "Agent",
  },
  {
    id: "6",
    name: "HealthPlus Clinics",
    initials: "HC",
    initialsColor: "bg-cyan-100 text-cyan-600",
    bank: "HNB",
    bankIcon: "🏦",
    accountNumber: "3456",
    lastPaid: "29 Nov, 25",
    status: "Verified",
    totalPaid: "-3,450",
    cents: "10",
    type: "Other",
  },
  {
    id: "7",
    name: "Luxury Resort M...",
    initials: "LR",
    initialsColor: "bg-purple-100 text-purple-600",
    bank: "Sampath",
    bankIcon: "🏦",
    accountNumber: "8050",
    lastPaid: "27 Nov, 25",
    status: "Verified",
    totalPaid: "-95,200",
    cents: "80",
    type: "Vendors",
  },
  {
    id: "8",
    name: "NextGen Innove...",
    initials: "NI",
    initialsColor: "bg-indigo-100 text-indigo-600",
    bank: "HNB",
    bankIcon: "🏦",
    accountNumber: "3456",
    lastPaid: "19 Nov, 25",
    status: "Rejected",
    totalPaid: "-3156,000,000",
    cents: "00",
    type: "Employees",
  },
  {
    id: "9",
    name: "Smart Home Sol...",
    initials: "SH",
    initialsColor: "bg-red-100 text-red-600",
    bank: "Pan Asia",
    bankIcon: "🏦",
    accountNumber: "2231",
    lastPaid: "25 Nov, 25",
    status: "Verified",
    totalPaid: "-28,657",
    cents: "40",
    type: "Employees",
  },
  {
    id: "10",
    name: "Urban Develop...",
    initials: "UD",
    initialsColor: "bg-blue-100 text-blue-600",
    bank: "HNB",
    bankIcon: "🏦",
    accountNumber: "3456",
    lastPaid: "23 Nov, 25",
    status: "Verified",
    totalPaid: "-7,320",
    cents: "15",
    type: "Customer",
  },
];

export default function RecipientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const getStatusVariant = (status: Recipient["status"]) => {
    switch (status) {
      case "Verified":
        return "bg-emerald-50 text-emerald-700 hover:bg-emerald-50";
      case "Rejected":
        return "bg-red-50 text-red-700 hover:bg-red-50";
      case "Invited":
        return "bg-slate-100 text-slate-700 hover:bg-slate-100";
      case "Pending":
        return "bg-yellow-50 text-yellow-700 hover:bg-yellow-50";
      default:
        return "bg-slate-100 text-slate-700 hover:bg-slate-100";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Recipients
        </h1>
      </div>

      {/* Main Card */}
      <Card className="border-0 shadow-sm bg-white dark:bg-neutral-900 transition-colors duration-300">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search recipients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>

            {/* Toolbar and Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="sm:hidden">
                  <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="z-50 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-slate-700 shadow-lg">
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <LayoutGrid className="h-4 w-4" />
                    Grid View
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <List className="h-4 w-4" />
                    List View
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <RotateCcw className="h-4 w-4" />
                    Refresh
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Download className="h-4 w-4" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <SlidersHorizontal className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Filter className="h-4 w-4" />
                    Filter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Icons - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-1 px-1 py-1 bg-slate-50 dark:bg-slate-800 rounded-md">
                <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                  <LayoutGrid className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </button>
                <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                  <List className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </button>
                <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                  <RotateCcw className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </button>
                <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                  <Download className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </button>
                <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                  <SlidersHorizontal className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </button>
                <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                  <Filter className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Action Buttons */}
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-primary text-primary hover:bg-primary/5"
                onClick={() => setIsInviteModalOpen(true)}
              >
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Invite</span>
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-primary hover:bg-primary/90"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add New</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-0 md:px-6">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-100 dark:border-slate-800">
                  <tr className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    <th className="text-left py-3 px-4 w-10">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 dark:border-slate-600"
                      />
                    </th>
                    <th className="text-left py-3 px-4">
                      <div className="flex items-center gap-1">
                        Name
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                    </th>
                    <th className="text-left py-3 px-4">
                      <div className="flex items-center gap-1">
                        Bank
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                    </th>
                    <th className="text-left py-3 px-4">
                      <div className="flex items-center gap-1">
                        Last Paid
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                    </th>
                    <th className="text-left py-3 px-4">
                      <div className="flex items-center gap-1">
                        Status
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                    </th>
                    <th className="text-left py-3 px-4">
                      <div className="flex items-center gap-1">
                        Total Paid
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                    </th>
                    <th className="text-left py-3 px-4">
                      <div className="flex items-center gap-1">
                        Type
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recipients.map((recipient) => (
                    <tr
                      key={recipient.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          className="rounded border-slate-300 dark:border-slate-600"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={`${recipient.initialsColor} text-xs font-semibold`}>
                              {recipient.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-slate-900 dark:text-white text-sm">
                            {recipient.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {recipient.bank !== "-" && (
                            <>
                              <span className="text-lg">{recipient.bankIcon}</span>
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {recipient.bank} •{recipient.accountNumber}
                              </span>
                            </>
                          )}
                          {recipient.bank === "-" && (
                            <span className="text-sm text-slate-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {recipient.lastPaid}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStatusVariant(recipient.status)} font-medium text-xs`}>
                          {recipient.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {recipient.totalPaid !== "-" ? (
                          <span className="text-sm text-slate-900 dark:text-white font-medium">
                            {recipient.totalPaid}
                            <sup className="text-[10px]">.{recipient.cents}</sup>
                          </span>
                        ) : (
                          <span className="text-sm text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {recipient.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3 px-4">
            {recipients.map((recipient) => (
              <div
                key={recipient.id}
                className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-200 cursor-pointer border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 dark:border-slate-600 mt-1"
                    />
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className={`${recipient.initialsColor} text-xs font-semibold`}>
                        {recipient.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white text-sm">
                        {recipient.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {recipient.type}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusVariant(recipient.status)} font-medium text-xs`}>
                    {recipient.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Bank:</span>
                    <span className="text-slate-900 dark:text-white">
                      {recipient.bank !== "-" ? `${recipient.bank} •${recipient.accountNumber}` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Last Paid:</span>
                    <span className="text-slate-900 dark:text-white">{recipient.lastPaid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Total Paid:</span>
                    {recipient.totalPaid !== "-" ? (
                      <span className="text-slate-900 dark:text-white font-medium">
                        {recipient.totalPaid}<sup className="text-[9px]">.{recipient.cents}</sup>
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 px-4">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Showing <span className="font-medium">1-10</span> of{" "}
              <span className="font-medium">95</span> items
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                disabled
              >
                ‹
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-primary text-white hover:bg-primary/90 hover:text-white"
              >
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                3
              </Button>
              <span className="text-slate-400">...</span>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                10
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                ›
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Recipient Modal */}
      <AddRecipientModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />

      {/* Invite Recipient Modal */}
      <InviteRecipientModal open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen} />
    </div>
  );
}
