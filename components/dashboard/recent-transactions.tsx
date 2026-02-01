"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAmountVisibility } from "@/contexts/amount-visibility-context";

interface Transaction {
  id: string;
  vendor: string;
  avatar: string;
  avatarBg: string;
  date: string;
  account: string;
  description: string;
  amount: string;
  cents: string;
  type: "debit" | "credit";
}

const recentTransactions: Transaction[] = [
  {
    id: "1",
    vendor: "Uber",
    avatar: "U",
    avatarBg: "bg-black text-white",
    date: "17 Nov",
    account: "Transportation",
    description: "Marketing department travel...",
    amount: "-LKR 59,350",
    cents: "45",
    type: "debit",
  },
  {
    id: "2",
    vendor: "PickMe",
    avatar: "P",
    avatarBg: "bg-yellow-500 text-white",
    date: "16 Nov",
    account: "Transportation",
    description: "Internet connection payment",
    amount: "-LKR 28,123",
    cents: "68",
    type: "debit",
  },
  {
    id: "3",
    vendor: "Silicon Media",
    avatar: "SM",
    avatarBg: "bg-blue-100 text-blue-600",
    date: "15 Nov",
    account: "Sales & Marketing",
    description: "Investment for 2025 Q4",
    amount: "+LKR 50,000,000",
    cents: "00",
    type: "credit",
  },
  {
    id: "4",
    vendor: "Dark Horse PLC",
    avatar: "DH",
    avatarBg: "bg-slate-100 text-slate-600",
    date: "15 Nov",
    account: "Credit Account",
    description: "JKSB web project",
    amount: "-LKR 2,980,000",
    cents: "00",
    type: "debit",
  },
  {
    id: "5",
    vendor: "SLT Mobitel",
    avatar: "//",
    avatarBg: "bg-blue-600 text-white",
    date: "14 Nov",
    account: "HR",
    description: "Internet connection payment",
    amount: "-LKR 19,350",
    cents: "00",
    type: "debit",
  },
  {
    id: "6",
    vendor: "Adam Richards",
    avatar: "AR",
    avatarBg: "bg-blue-100 text-blue-600",
    date: "11 Nov",
    account: "Credit Account",
    description: "Project payment from CloudT...",
    amount: "+LKR 925,500",
    cents: "00",
    type: "credit",
  },
  {
    id: "7",
    vendor: "SLT Mobitel",
    avatar: "//",
    avatarBg: "bg-blue-600 text-white",
    date: "10 Nov",
    account: "Ops/Payroll",
    description: "Internet connection payment",
    amount: "-LKR 11,980",
    cents: "45",
    type: "debit",
  },
  {
    id: "8",
    vendor: "Uber",
    avatar: "U",
    avatarBg: "bg-black text-white",
    date: "10 Nov",
    account: "Transportation",
    description: "Marketing department travel...",
    amount: "-LKR 28,123",
    cents: "68",
    type: "debit",
  },
];

export function RecentTransactions() {
  const { isAmountVisible } = useAmountVisibility();
  
  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-neutral-900 transition-colors duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">Recent Transactions</CardTitle>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1">
          See All <span className="text-base">›</span>
        </button>
      </CardHeader>
      <CardContent className="px-0 md:px-6">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-6 text-xs font-medium text-slate-500 dark:text-slate-400 pb-4 px-6 border-b border-slate-100 dark:border-slate-800">
            <div>To/From</div>
            <div>Date</div>
            <div>Account</div>
            <div>Description</div>
            <div className="text-right">Amount</div>
          </div>
          
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-5 gap-6 text-sm items-center py-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all duration-200 cursor-pointer px-6"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className={`${transaction.avatarBg} text-xs font-semibold`}>
                      {transaction.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-slate-900 dark:text-white">{transaction.vendor}</span>
                </div>
                <div className="text-slate-600 dark:text-slate-400">{transaction.date}</div>
                <div className="text-slate-600 dark:text-slate-400">{transaction.account}</div>
                <div className="text-slate-600 dark:text-slate-400">{transaction.description}</div>
                <div className="text-right">
                  <span className={transaction.type === "debit" ? "text-slate-900 dark:text-white font-medium" : "text-emerald-500 font-medium"}>
                    {isAmountVisible ? (
                      <>
                        {transaction.amount}<sup className="text-[10px]">.{transaction.cents}</sup>
                      </>
                    ) : (
                      transaction.type === "debit" ? "-LKR ******" : "+LKR ******"
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-200 cursor-pointer border-b border-slate-100 dark:border-slate-800 last:border-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className={`${transaction.avatarBg} text-xs font-semibold`}>
                      {transaction.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{transaction.vendor}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{transaction.date}</div>
                  </div>
                </div>
                <div>
                  <span className={transaction.type === "debit" ? "text-slate-900 dark:text-white font-medium text-sm" : "text-emerald-500 font-medium text-sm"}>
                    {isAmountVisible ? (
                      <>
                        {transaction.amount}<sup className="text-[9px]">.{transaction.cents}</sup>
                      </>
                    ) : (
                      transaction.type === "debit" ? "-LKR ******" : "+LKR ******"
                    )}
                  </span>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Account:</span> {transaction.account}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  {transaction.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
