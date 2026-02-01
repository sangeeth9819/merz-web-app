"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    LayoutGrid,
    List,
    RotateCcw,
    Download,
    SlidersHorizontal,
    Filter,
    ArrowUpRight,
    ArrowDownLeft,
} from "lucide-react";

interface Transaction {
    id: string;
    toFrom: string;
    initials: string;
    initialsColor: string;
    date: string;
    account: string;
    description: string;
    amount: string;
    cents: string;
    type: "credit" | "debit";
    status: "Completed" | "Pending" | "Failed";
}

const transactions: Transaction[] = [
    {
        id: "1",
        toFrom: "Uber",
        initials: "U",
        initialsColor: "bg-slate-900 text-white",
        date: "17 Nov",
        account: "Transportation",
        description: "Marketing department travel...",
        amount: "-LKR 59,350",
        cents: "45",
        type: "debit",
        status: "Completed",
    },
    {
        id: "2",
        toFrom: "PickMe",
        initials: "P",
        initialsColor: "bg-yellow-400 text-slate-900",
        date: "16 Nov",
        account: "Transportation",
        description: "Internet connection payment",
        amount: "-LKR 28,123",
        cents: "68",
        type: "debit",
        status: "Completed",
    },
    {
        id: "3",
        toFrom: "Silicon Media",
        initials: "SM",
        initialsColor: "bg-teal-500 text-white",
        date: "15 Nov",
        account: "Sales & Marketing",
        description: "Investment for 2025 Q4",
        amount: "+LKR 50,000,000",
        cents: "00",
        type: "credit",
        status: "Completed",
    },
    {
        id: "4",
        toFrom: "Dialog Axiata",
        initials: "DA",
        initialsColor: "bg-red-500 text-white",
        date: "14 Nov",
        account: "Utilities",
        description: "Monthly phone bill payment",
        amount: "-LKR 45,780",
        cents: "25",
        type: "debit",
        status: "Completed",
    },
    {
        id: "5",
        toFrom: "Ceylon Electricity",
        initials: "CE",
        initialsColor: "bg-blue-500 text-white",
        date: "13 Nov",
        account: "Utilities",
        description: "Electricity bill - Head Office",
        amount: "-LKR 125,450",
        cents: "00",
        type: "debit",
        status: "Pending",
    },
    {
        id: "6",
        toFrom: "John Keells Holdings",
        initials: "JK",
        initialsColor: "bg-indigo-500 text-white",
        date: "12 Nov",
        account: "Investments",
        description: "Dividend payment received",
        amount: "+LKR 2,500,000",
        cents: "00",
        type: "credit",
        status: "Completed",
    },
    {
        id: "7",
        toFrom: "Mobitel",
        initials: "M",
        initialsColor: "bg-green-600 text-white",
        date: "11 Nov",
        account: "Utilities",
        description: "Corporate mobile package",
        amount: "-LKR 38,500",
        cents: "00",
        type: "debit",
        status: "Completed",
    },
    {
        id: "8",
        toFrom: "Commercial Bank",
        initials: "CB",
        initialsColor: "bg-orange-500 text-white",
        date: "10 Nov",
        account: "Banking",
        description: "Interest credit - Savings",
        amount: "+LKR 156,780",
        cents: "45",
        type: "credit",
        status: "Completed",
    },
    {
        id: "9",
        toFrom: "Hayleys PLC",
        initials: "HP",
        initialsColor: "bg-purple-500 text-white",
        date: "09 Nov",
        account: "Vendors",
        description: "Office supplies payment",
        amount: "-LKR 89,230",
        cents: "80",
        type: "debit",
        status: "Failed",
    },
    {
        id: "10",
        toFrom: "Sri Lanka Telecom",
        initials: "SL",
        initialsColor: "bg-cyan-500 text-white",
        date: "08 Nov",
        account: "Utilities",
        description: "Fiber connection - Branch",
        amount: "-LKR 15,500",
        cents: "00",
        type: "debit",
        status: "Completed",
    },
];

export default function TransactionsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const getStatusVariant = (status: Transaction["status"]) => {
        switch (status) {
            case "Completed":
                return "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400";
            case "Pending":
                return "bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-400";
            case "Failed":
                return "bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-900/30 dark:text-red-400";
            default:
                return "bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400";
        }
    };

    const filteredTransactions = transactions.filter(
        (transaction) =>
            transaction.toFrom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.account.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Page Title */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Transactions
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
                                placeholder="Search transactions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                            />
                        </div>

                        {/* Toolbar */}
                        <div className="flex items-center gap-2">
                            {/* View Icons */}
                            <div className="flex items-center gap-1 px-1 py-1 bg-slate-50 dark:bg-slate-800 rounded-md">
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

                            {/* Export Button */}
                            <Button
                                variant="outline"
                                className="gap-2 border-slate-200 dark:border-slate-700"
                            >
                                <Download className="h-4 w-4" />
                                Export
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
                                                To/From
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                </svg>
                                            </div>
                                        </th>
                                        <th className="text-left py-3 px-4">
                                            <div className="flex items-center gap-1">
                                                Date
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                </svg>
                                            </div>
                                        </th>
                                        <th className="text-left py-3 px-4">
                                            <div className="flex items-center gap-1">
                                                Account
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                </svg>
                                            </div>
                                        </th>
                                        <th className="text-left py-3 px-4">
                                            <div className="flex items-center gap-1">
                                                Description
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
                                        <th className="text-right py-3 px-4">
                                            <div className="flex items-center justify-end gap-1">
                                                Amount
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                </svg>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {filteredTransactions.map((transaction) => (
                                        <tr
                                            key={transaction.id}
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
                                                        <AvatarFallback className={`${transaction.initialsColor} text-xs font-semibold`}>
                                                            {transaction.initials}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-slate-900 dark:text-white text-sm">
                                                            {transaction.toFrom}
                                                        </span>
                                                        {transaction.type === "credit" ? (
                                                            <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-500" />
                                                        ) : (
                                                            <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                                    {transaction.date}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                                    {transaction.account}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                                    {transaction.description}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <Badge className={`${getStatusVariant(transaction.status)} font-medium text-xs`}>
                                                    {transaction.status}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <span className={`text-sm font-medium ${transaction.type === "credit"
                                                        ? "text-emerald-600 dark:text-emerald-400"
                                                        : "text-slate-900 dark:text-white"
                                                    }`}>
                                                    {transaction.amount}
                                                    <sup className="text-[10px]">.{transaction.cents}</sup>
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
                        {filteredTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-200 cursor-pointer border border-slate-100 dark:border-slate-800"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback className={`${transaction.initialsColor} text-xs font-semibold`}>
                                                {transaction.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-slate-900 dark:text-white text-sm">
                                                    {transaction.toFrom}
                                                </span>
                                                {transaction.type === "credit" ? (
                                                    <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-500" />
                                                ) : (
                                                    <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {transaction.date} • {transaction.account}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge className={`${getStatusVariant(transaction.status)} font-medium text-xs`}>
                                        {transaction.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {transaction.description}
                                    </span>
                                    <span className={`text-sm font-medium ${transaction.type === "credit"
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : "text-slate-900 dark:text-white"
                                        }`}>
                                        {transaction.amount}
                                        <sup className="text-[9px]">.{transaction.cents}</sup>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 px-4">
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            Showing <span className="font-medium">1-10</span> of{" "}
                            <span className="font-medium">256</span> transactions
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
                                26
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                ›
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
