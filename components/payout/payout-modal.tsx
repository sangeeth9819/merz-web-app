"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Mail, Plus, Upload, ArrowRight, X, Wallet, CreditCard, Building2, Circle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAmountVisibility } from "@/contexts/amount-visibility-context";

interface Recipient {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  bank: string;
  bankLogo: string;
  accountNumber: string;
  type: string;
}

interface Account {
  id: string;
  name: string;
  logo: string;
  logoBg: string;
  accountNumber: string;
  balance: number;
  isPrimary?: boolean;
}

const recipients: Recipient[] = [
  {
    id: "1",
    name: "Alex Davidson",
    avatar: "AD",
    avatarBg: "bg-blue-100 text-blue-600",
    bank: "HNB",
    bankLogo: "credit-card",
    accountNumber: "••3456",
    type: "Vendors",
  },
  {
    id: "2",
    name: "Apex Logistics",
    avatar: "AL",
    avatarBg: "bg-slate-100 text-slate-600",
    bank: "Sampath",
    bankLogo: "circle",
    accountNumber: "••8050",
    type: "Employees",
  },
  {
    id: "3",
    name: "Apex Logistics",
    avatar: "AL",
    avatarBg: "bg-slate-100 text-slate-600",
    bank: "Sampath",
    bankLogo: "circle",
    accountNumber: "••8050",
    type: "Agent",
  },
  {
    id: "4",
    name: "Damien Fernando",
    avatar: "DF",
    avatarBg: "bg-slate-100 text-slate-600",
    bank: "Sampath",
    bankLogo: "circle",
    accountNumber: "••7555",
    type: "Vendors",
  },
  {
    id: "5",
    name: "Eco Clean Services",
    avatar: "EC",
    avatarBg: "bg-slate-100 text-slate-600",
    bank: "HNB",
    bankLogo: "credit-card",
    accountNumber: "••3456",
    type: "Employees",
  },
  {
    id: "6",
    name: "Eco Clean Services",
    avatar: "EC",
    avatarBg: "bg-slate-100 text-slate-600",
    bank: "HNB",
    bankLogo: "credit-card",
    accountNumber: "••3456",
    type: "Employees",
  },
  {
    id: "7",
    name: "Damien Fernando",
    avatar: "DF",
    avatarBg: "bg-slate-100 text-slate-600",
    bank: "Sampath",
    bankLogo: "circle",
    accountNumber: "••7555",
    type: "Vendors",
  },
  {
    id: "8",
    name: "Alex Davidson",
    avatar: "AD",
    avatarBg: "bg-blue-100 text-blue-600",
    bank: "HNB",
    bankLogo: "credit-card",
    accountNumber: "••3456",
    type: "Vendors",
  },
];

const accounts: Account[] = [
  {
    id: "1",
    name: "Seylan Bank PLC",
    logo: "building",
    logoBg: "bg-red-100",
    accountNumber: "•• 4566",
    balance: 5674344.0,
    isPrimary: true,
  },
  {
    id: "2",
    name: "Nations Trust Bank",
    logo: "building",
    logoBg: "bg-blue-100",
    accountNumber: "•• 2310",
    balance: 32200.0,
  },
  {
    id: "3",
    name: "Sampath Bank PLC",
    logo: "circle",
    logoBg: "bg-orange-100",
    accountNumber: "•• 8050",
    balance: 156780.0,
  },
];

interface PayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PayoutModal({ open, onOpenChange }: PayoutModalProps) {
  const { isAmountVisible } = useAmountVisibility();
  const [activeTab, setActiveTab] = useState("single");
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState("CEFT");
  const [amount, setAmount] = useState("250,000");
  const [searchQuery, setSearchQuery] = useState("");

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const filteredRecipients = recipients.filter((recipient) =>
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatBalance = (balance: number) => {
    if (!isAmountVisible) return "LKR ******";
    return `LKR ${balance.toLocaleString()}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
            onWheel={(e) => e.stopPropagation()}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 h-[95vh] rounded-t-3xl border-0 shadow-2xl bg-white dark:bg-slate-900 flex flex-col"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>

            {/* Header */}
            <div className="px-6 pb-4 pt-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Make a Payout</h2>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col bg-white dark:bg-slate-900 min-h-0">
              <div className="px-6 pt-4 bg-white dark:bg-slate-900 shrink-0">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-100 dark:bg-slate-800/50 p-1 h-10">
                  <TabsTrigger value="single" className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Single Payout
                  </TabsTrigger>
                  <TabsTrigger value="bulk" className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Bulk Payout
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1 px-6 bg-white dark:bg-slate-900 min-h-0">
              {/* Single Payout Tab */}
              <TabsContent value="single" className="mt-6 space-y-6 pb-24">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Left Section - Recipient Selection */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Search and Action Buttons Row */}
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search recipients..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-11"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="gap-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-primary">
                        <Mail className="h-4 w-4" />
                        Invite
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-primary">
                        <Plus className="h-4 w-4" />
                        Add New
                      </Button>
                    </div>

                    {/* Recipients Table */}
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                      {/* Table Header */}
                      <div className="grid grid-cols-3 gap-6 px-4 py-3 bg-white dark:bg-slate-900 text-xs font-medium text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-1">
                          Name
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>
                        </div>
                        <div className="flex items-center gap-1">
                          Bank
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>
                        </div>
                        <div className="flex items-center gap-1">
                          Type
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>
                        </div>
                      </div>

                      {/* Table Body */}
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredRecipients.map((recipient) => (
                          <div
                            key={recipient.id}
                            className={`grid grid-cols-3 gap-6 px-4 py-3.5 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/30 ${
                              selectedRecipient === recipient.id
                                ? "bg-slate-50 dark:bg-slate-800/50"
                                : ""
                            }`}
                            onClick={() => setSelectedRecipient(recipient.id)}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                checked={selectedRecipient === recipient.id}
                                onChange={() => setSelectedRecipient(recipient.id)}
                                className="accent-primary w-4 h-4"
                              />
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className={`${recipient.avatarBg} text-xs font-semibold`}>
                                  {recipient.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium text-slate-900 dark:text-white">
                                {recipient.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {recipient.bankLogo === "credit-card" ? (
                                <CreditCard className="h-4 w-4 text-blue-500" />
                              ) : (
                                <Circle className="h-4 w-4 text-orange-500 fill-orange-500" />
                              )}
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {recipient.bank} {recipient.accountNumber}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {recipient.type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Payment Details */}
                  <div className="space-y-4">
                    {/* Amount */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-900 dark:text-white">
                        Amount
                      </Label>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-slate-500 dark:text-slate-400">LKR</span>
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="flex-1 text-3xl font-bold bg-transparent border-none outline-none text-slate-900 dark:text-white"
                        />
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">.00</span>
                      </div>
                    </div>

                    {/* Pay with Account */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-900 dark:text-white">
                        Pay with
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 z-10" />
                        <Input
                          placeholder="Search 3 accounts..."
                          className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <RadioGroup value={selectedAccount} onValueChange={setSelectedAccount}>
                        <div className="space-y-2">
                          {accounts.map((account) => (
                            <div
                              key={account.id}
                              className={`relative flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                selectedAccount === account.id
                                  ? "border-primary bg-primary/5 dark:bg-primary/10"
                                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                              }`}
                            >
                              <RadioGroupItem value={account.id} id={account.id} className="mt-1" />
                              <Label htmlFor={account.id} className="flex-1 cursor-pointer">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-full ${account.logoBg} flex items-center justify-center`}>
                                      {account.logo === "building" ? (
                                        <Building2 className="h-5 w-5 text-slate-700" />
                                      ) : (
                                        <Circle className="h-5 w-5 text-orange-500 fill-orange-500" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                        {account.name}
                                        {account.isPrimary && (
                                          <Badge variant="secondary" className="bg-primary text-white text-[10px] px-2 py-0">
                                            Primary
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="text-xs text-slate-500 dark:text-slate-400">
                                        Current account ({account.accountNumber})
                                      </div>
                                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1">
                                        Balance: {formatBalance(account.balance)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-900 dark:text-white">
                        Payment Method
                      </Label>
                      <div className="flex gap-2 flex-wrap">
                        {["CEFT", "SLIP", "RGTS", "Internal Transfer"].map((method) => (
                          <Button
                            key={method}
                            variant={paymentMethod === method ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPaymentMethod(method)}
                            className={`h-9 text-xs font-medium rounded-full px-4 ${
                              paymentMethod === method
                                ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                            }`}
                          >
                            {method}
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Instant transfer • Fee 25LKR
                      </p>
                    </div>

                    {/* Review Button */}
                    <Button className="w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-sm font-medium" size="lg">
                      Review
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Bulk Payout Tab */}
              <TabsContent value="bulk" className="mt-6 space-y-6 pb-24">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Left Section - Upload & Recipients */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Upload Section Title */}
                    <h3 className="font-medium text-slate-900 dark:text-white">
                      Upload a File
                    </h3>
                    
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-900 hover:border-primary transition-colors cursor-pointer">
                      <div className="flex items-center justify-center gap-3 text-slate-600 dark:text-slate-400">
                        <Upload className="h-5 w-5" />
                        <div className="text-sm">
                          <span className="font-medium">Drag and drop or click here to upload</span>
                          <br />
                          <span className="text-xs">Upload CSV, PDF or Spreadsheet</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center text-xs text-slate-500 dark:text-slate-400">or</div>

                    {/* Select from Recipients */}
                    <div className="space-y-3">
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        Select from Recipients
                      </h3>

                      {/* Search and Action Buttons Row */}
                      <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder="Search recipients..."
                            className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 text-primary border-slate-200 dark:border-slate-700">
                          <Mail className="h-4 w-4" />
                          Invite
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 text-primary border-slate-200 dark:border-slate-700">
                          <Plus className="h-4 w-4" />
                          Add New
                        </Button>
                      </div>

                      {/* Recipients Table */}
                      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                        {/* Table Header */}
                        <div className="grid grid-cols-5 gap-4 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 text-xs font-medium text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                          <div className="col-span-2">Name</div>
                          <div>Bank</div>
                          <div>Type</div>
                          <div className="text-right">Payment</div>
                        </div>

                        {/* Table Body - Scrollable */}
                        <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[280px] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                          {recipients.map((recipient) => (
                            <div
                              key={recipient.id}
                              className="grid grid-cols-5 gap-4 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                            >
                              <div className="col-span-2 flex items-center gap-2.5">
                                <input type="checkbox" className="accent-primary w-4 h-4" />
                                <Avatar className="h-7 w-7">
                                  <AvatarFallback className={`${recipient.avatarBg} text-[10px] font-semibold`}>
                                    {recipient.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                  {recipient.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                  {recipient.bank} {recipient.accountNumber}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                  {recipient.type}
                                </span>
                              </div>
                              <div className="flex items-center justify-end">
                                <span className="text-sm font-medium">1,000.00</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Payment Details */}
                  <div className="space-y-4">
                    {/* Pay with Account */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Pay with
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 z-10" />
                        <Input
                          placeholder="Search 3 accounts..."
                          className="pl-10 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <RadioGroup defaultValue="2">
                        <div className="space-y-2">
                          {accounts.map((account) => (
                            <div
                              key={account.id}
                              className="relative flex items-start gap-3 p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 cursor-pointer hover:border-primary transition-all"
                            >
                              <RadioGroupItem value={account.id} id={`bulk-${account.id}`} className="mt-1" />
                              <Label htmlFor={`bulk-${account.id}`} className="flex-1 cursor-pointer">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-full ${account.logoBg} flex items-center justify-center`}>
                                      {account.logo === "building" ? (
                                        <Building2 className="h-5 w-5 text-slate-700" />
                                      ) : (
                                        <Circle className="h-5 w-5 text-orange-500 fill-orange-500" />
                                      )}
                                    </div>
                                    <div>
                                      <div className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                        {account.name}
                                        {account.isPrimary && (
                                          <Badge variant="secondary" className="bg-primary text-white text-[10px] px-2 py-0">
                                            Primary
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="text-xs text-slate-500 dark:text-slate-400">
                                        Savings account ({account.accountNumber})
                                      </div>
                                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1">
                                        Balance: {formatBalance(account.balance)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Review Button */}
                    <Button className="w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-sm font-medium" size="lg">
                      Review
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
