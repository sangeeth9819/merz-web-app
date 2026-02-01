"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    X,
    ArrowRight,
    ArrowLeft,
    Users,
    Briefcase,
    User,
    UserCheck,
    Building,
    ShoppingBag,
    HelpCircle,
    Check,
    Search,
    Upload,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddRecipientModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type RecipientCategory = "Individual" | "Business";
type RecipientType = "Vendor" | "Employee" | "Partner" | "Customer" | "Agent" | "Other";

const banks = [
    { id: "1", name: "Seylan Bank PLC", icon: "🏦", color: "bg-red-50" },
    { id: "2", name: "Sampath Bank PLC", icon: "🏦", color: "bg-orange-50" },
    { id: "3", name: "Nations Trust Bank", icon: "🏦", color: "bg-blue-50" },
    { id: "4", name: "Bank of Ceylon", icon: "🏦", color: "bg-green-50" },
];

export function AddRecipientModal({ open, onOpenChange }: AddRecipientModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [category, setCategory] = useState<RecipientCategory>("Individual");
    const [recipientType, setRecipientType] = useState<RecipientType>("Vendor");
    const [selectedBank, setSelectedBank] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        legalName: "",
        email: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "Sri Lanka",
        postalCode: "",
        branch: "",
        accountNumber: "",
        notes: "",
    });

    // Handle client-side mounting
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            setCurrentStep(1);
            setCategory("Individual");
            setRecipientType("Vendor");
            setSelectedBank("");
            setFormData({
                legalName: "",
                email: "",
                phone: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                country: "Sri Lanka",
                postalCode: "",
                branch: "",
                accountNumber: "",
                notes: "",
            });
        }
    }, [open]);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinish = () => {
        // Handle form submission
        console.log("Form Data:", { category, recipientType, selectedBank, ...formData });
        onOpenChange(false);
    };

    const steps = [
        { number: 1, name: "General", completed: currentStep > 1, active: currentStep === 1 },
        { number: 2, name: "Personal", completed: currentStep > 2, active: currentStep === 2 },
        { number: 3, name: "Bank Account", completed: currentStep > 3, active: currentStep === 3 },
        { number: 4, name: "Documents", completed: false, active: currentStep === 4 },
    ];

    if (!mounted) return null;

    return createPortal(
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
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-x-0 top-4 bottom-0 z-50 h-[calc(100vh-1rem)] rounded-t-3xl border-0 shadow-2xl bg-white dark:bg-neutral-900 flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => onOpenChange(false)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <X className="h-5 w-5 text-slate-500" />
                        </button>

                        {/* Header */}
                        <div className="px-6 pb-4 pt-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-neutral-900 shrink-0">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                                        <Users className="h-5 w-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        Add New Recipient
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white dark:bg-neutral-900">
                            {/* Mobile Steps Indicator */}
                            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-neutral-900/50 shrink-0 overflow-x-auto">
                                {steps.map((step, index) => (
                                    <div key={step.number} className="flex items-center">
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${step.completed
                                                ? "bg-primary text-white"
                                                : step.active
                                                    ? "bg-primary text-white"
                                                    : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                                                }`}
                                        >
                                            {step.completed ? <Check className="h-3 w-3" /> : step.number}
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`w-8 h-0.5 mx-1 ${step.completed ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Left Sidebar - Steps (Hidden on Mobile) */}
                            <div className="hidden md:block w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-neutral-900/50 p-6 shrink-0">
                                <div className="space-y-3">
                                    {steps.map((step) => (
                                        <div
                                            key={step.number}
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${step.active
                                                ? "bg-primary/10 text-primary dark:bg-primary/20"
                                                : step.completed
                                                    ? "text-slate-600 dark:text-slate-400"
                                                    : "text-slate-400 dark:text-slate-600"
                                                }`}
                                        >
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${step.completed
                                                    ? "bg-primary text-white"
                                                    : step.active
                                                        ? "bg-primary text-white"
                                                        : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                                                    }`}
                                            >
                                                {step.completed ? <Check className="h-3 w-3" /> : step.number}
                                            </div>
                                            <span className="text-sm font-medium">{step.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <ScrollArea className="flex-1 p-4 md:p-8">
                                <div className="max-w-3xl mx-auto pb-24">
                                    {/* Step 1: General */}
                                    {currentStep === 1 && (
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">General</h3>

                                            {/* Onboarding Link Banner */}
                                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    Don't have all their details? Send an onboarding link, let them fill in their details.
                                                </p>
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    Send Now
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {/* Recipient Category */}
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium text-slate-900 dark:text-white">
                                                    Recipient Category
                                                </Label>
                                                <div className="grid grid-cols-2 gap-2 md:gap-3">
                                                    <button
                                                        onClick={() => setCategory("Individual")}
                                                        className={`p-4 rounded-xl border-2 transition-all ${category === "Individual"
                                                            ? "border-primary bg-primary/5 dark:bg-primary/10"
                                                            : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                                            }`}
                                                    >
                                                        <div className="flex flex-col items-center gap-2">
                                                            <User className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                                                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                                Individual
                                                            </span>
                                                        </div>
                                                    </button>
                                                    <button
                                                        onClick={() => setCategory("Business")}
                                                        className={`p-4 rounded-xl border-2 transition-all ${category === "Business"
                                                            ? "border-primary bg-primary/5 dark:bg-primary/10"
                                                            : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                                            }`}
                                                    >
                                                        <div className="flex flex-col items-center gap-2">
                                                            <Briefcase className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                                                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                                Business
                                                            </span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Recipient Type */}
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium text-slate-900 dark:text-white">
                                                    Recipient Type
                                                </Label>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                                                    {[
                                                        { value: "Vendor", icon: ShoppingBag },
                                                        { value: "Employee", icon: UserCheck },
                                                        { value: "Partner", icon: Users },
                                                        { value: "Customer", icon: User },
                                                        { value: "Agent", icon: UserCheck },
                                                        { value: "Other", icon: HelpCircle },
                                                    ].map((type) => {
                                                        const Icon = type.icon;
                                                        return (
                                                            <button
                                                                key={type.value}
                                                                onClick={() => setRecipientType(type.value as RecipientType)}
                                                                className={`p-4 rounded-xl border-2 transition-all ${recipientType === type.value
                                                                    ? "border-primary bg-primary/5 dark:bg-primary/10"
                                                                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                                                    }`}
                                                            >
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <Icon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                                                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                                        {type.value}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Next Button */}
                                            <div className="pt-4">
                                                <Button
                                                    onClick={handleNext}
                                                    className="gap-2 bg-primary hover:bg-primary/90"
                                                >
                                                    Next
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Personal Details */}
                                    {currentStep === 2 && (
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                                                Personal Details
                                            </h3>

                                            {/* Legal Full Name */}
                                            <div className="space-y-2">
                                                <Label htmlFor="legalName" className="text-sm font-medium">
                                                    Legal Full Name
                                                </Label>
                                                <Input
                                                    id="legalName"
                                                    value={formData.legalName}
                                                    onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                                                    placeholder="Alex Mirando"
                                                    className="bg-white dark:bg-slate-800"
                                                />
                                            </div>

                                            {/* Email and Phone */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-sm font-medium">
                                                        Email Address (optional)
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="alexmirando@mail.com"
                                                        className="bg-white dark:bg-slate-800"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone" className="text-sm font-medium">
                                                        Phone Number (optional)
                                                    </Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        placeholder="123 456 7890"
                                                        className="bg-white dark:bg-slate-800"
                                                    />
                                                </div>
                                            </div>

                                            <p className="text-xs text-primary">
                                                Email & Phone Number used for sending payout receipts & notifications.
                                            </p>

                                            {/* Address */}
                                            <div className="space-y-4">
                                                <Label className="text-sm font-medium">Address (optional)</Label>
                                                <Input
                                                    value={formData.addressLine1}
                                                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                                                    placeholder="Line 1"
                                                    className="bg-white dark:bg-slate-800"
                                                />
                                                <Input
                                                    value={formData.addressLine2}
                                                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                                                    placeholder="Line 2"
                                                    className="bg-white dark:bg-slate-800"
                                                />
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                                                        <SelectTrigger className="bg-white dark:bg-slate-800">
                                                            <SelectValue placeholder="City" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="colombo">Colombo</SelectItem>
                                                            <SelectItem value="kandy">Kandy</SelectItem>
                                                            <SelectItem value="galle">Galle</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                                                        <SelectTrigger className="bg-white dark:bg-slate-800">
                                                            <SelectValue placeholder="State" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="western">Western</SelectItem>
                                                            <SelectItem value="central">Central</SelectItem>
                                                            <SelectItem value="southern">Southern</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                                        <span className="text-lg">🇱🇰</span>
                                                        <span className="text-sm text-slate-900 dark:text-white">Sri Lanka</span>
                                                    </div>
                                                    <Input
                                                        value={formData.postalCode}
                                                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                                        placeholder="Postal Code"
                                                        className="bg-white dark:bg-slate-800"
                                                    />
                                                </div>
                                            </div>

                                            {/* Navigation Buttons */}
                                            <div className="flex gap-3 pt-4">
                                                <Button
                                                    onClick={handleBack}
                                                    variant="outline"
                                                    className="gap-2"
                                                >
                                                    <ArrowLeft className="h-4 w-4" />
                                                    Back
                                                </Button>
                                                <Button
                                                    onClick={handleNext}
                                                    className="gap-2 bg-primary hover:bg-primary/90"
                                                >
                                                    Next
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Bank Account */}
                                    {currentStep === 3 && (
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                                                Bank Account
                                            </h3>

                                            {/* Recipient's Bank */}
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium">Recipient's Bank</Label>
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                    <Input
                                                        placeholder="Search recipients..."
                                                        className="pl-10 bg-white dark:bg-slate-800"
                                                    />
                                                </div>

                                                {/* Banks List */}
                                                <div className="space-y-2 mt-4">
                                                    {banks.map((bank) => (
                                                        <button
                                                            key={bank.id}
                                                            onClick={() => setSelectedBank(bank.id)}
                                                            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${selectedBank === bank.id
                                                                ? "border-primary bg-primary/5 dark:bg-primary/10"
                                                                : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                                                }`}
                                                        >
                                                            <div className={`h-10 w-10 rounded-full ${bank.color} flex items-center justify-center text-lg`}>
                                                                {bank.icon}
                                                            </div>
                                                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                                {bank.name}
                                                            </span>
                                                            {selectedBank === bank.id && (
                                                                <Check className="h-5 w-5 text-primary ml-auto" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Branch and Account Number */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="branch" className="text-sm font-medium">
                                                        Branch
                                                    </Label>
                                                    <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
                                                        <SelectTrigger className="bg-white dark:bg-slate-800">
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="colombo">Colombo</SelectItem>
                                                            <SelectItem value="dehiwala">Dehiwala</SelectItem>
                                                            <SelectItem value="nugegoda">Nugegoda</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="accountNumber" className="text-sm font-medium">
                                                        Account Number
                                                    </Label>
                                                    <Input
                                                        id="accountNumber"
                                                        value={formData.accountNumber}
                                                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                                        placeholder="00000000"
                                                        className="bg-white dark:bg-slate-800"
                                                    />
                                                </div>
                                            </div>

                                            {/* Navigation Buttons */}
                                            <div className="flex gap-3 pt-4">
                                                <Button
                                                    onClick={handleBack}
                                                    variant="outline"
                                                    className="gap-2"
                                                >
                                                    <ArrowLeft className="h-4 w-4" />
                                                    Back
                                                </Button>
                                                <Button
                                                    onClick={handleNext}
                                                    className="gap-2 bg-primary hover:bg-primary/90"
                                                >
                                                    Next
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 4: Documents */}
                                    {currentStep === 4 && (
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                                                Documents
                                            </h3>

                                            {/* Document Uploads */}
                                            <div className="space-y-4">
                                                {[
                                                    { label: "NIC (optional)", id: "nic" },
                                                    { label: "Business Registration (optional)", id: "business" },
                                                    { label: "Tax Registration Certificate (optional)", id: "tax" },
                                                    { label: "Other Attachments (optional)", id: "other" },
                                                ].map((doc) => (
                                                    <div key={doc.id} className="space-y-2">
                                                        <Label className="text-sm font-medium">{doc.label}</Label>
                                                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 bg-slate-50 dark:bg-slate-800/50 hover:border-primary transition-colors cursor-pointer">
                                                            <div className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400">
                                                                <Upload className="h-5 w-5" />
                                                                <div className="text-sm text-center">
                                                                    <span className="font-medium">Drag and drop or click here to upload</span>
                                                                    <br />
                                                                    <span className="text-xs">Upload CSV, PDF or Spreadsheet</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Notes */}
                                            <div className="space-y-2">
                                                <Label htmlFor="notes" className="text-sm font-medium">
                                                    Notes (optional)
                                                </Label>
                                                <textarea
                                                    id="notes"
                                                    value={formData.notes}
                                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                    placeholder="Type your message here."
                                                    className="w-full min-h-[120px] px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                            </div>

                                            {/* Finish Button */}
                                            <div className="pt-4">
                                                <Button
                                                    onClick={handleFinish}
                                                    className="gap-2 bg-primary hover:bg-primary/90"
                                                >
                                                    Finish
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
