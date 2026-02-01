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
    User,
    Briefcase,
    Store,
    Users,
    UserCheck,
    ShoppingBag,
    Headphones,
    MoreHorizontal,
    Check,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
} from "lucide-react";

type RecipientCategory = "Individual" | "Business";
type RecipientType = "Vendor" | "Employee" | "Partner" | "Customer" | "Agent" | "Other";

interface InviteRecipientModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function InviteRecipientModal({ open, onOpenChange }: InviteRecipientModalProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [category, setCategory] = useState<RecipientCategory>("Individual");
    const [recipientType, setRecipientType] = useState<RecipientType>("Vendor");
    const [mounted, setMounted] = useState(false);

    // Document requirements toggles
    const [requireAddress, setRequireAddress] = useState(false);
    const [requireNIC, setRequireNIC] = useState(false);
    const [requireBusinessReg, setRequireBusinessReg] = useState(false);
    const [requireTaxCert, setRequireTaxCert] = useState(false);

    // Invitation details
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

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
            setRequireAddress(false);
            setRequireNIC(false);
            setRequireBusinessReg(false);
            setRequireTaxCert(false);
            setName("");
            setEmail("");
            setPhone("");
        }
    }, [open]);

    const handleNext = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSend = () => {
        // Handle invitation send
        console.log("Invitation Data:", {
            category,
            recipientType,
            requirements: { requireAddress, requireNIC, requireBusinessReg, requireTaxCert },
            name,
            email,
            phone,
        });
        onOpenChange(false);
    };

    const steps = [
        { number: 1, name: "General", completed: currentStep > 1, active: currentStep === 1 },
        { number: 2, name: "Invitation", completed: false, active: currentStep === 2 },
    ];

    const recipientTypes: { value: RecipientType; icon: typeof Store; label: string }[] = [
        { value: "Vendor", icon: Store, label: "Vendor" },
        { value: "Employee", icon: Users, label: "Employee" },
        { value: "Partner", icon: UserCheck, label: "Partner" },
        { value: "Customer", icon: ShoppingBag, label: "Customer" },
        { value: "Agent", icon: Headphones, label: "Agent" },
        { value: "Other", icon: MoreHorizontal, label: "Other" },
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
                        className="fixed inset-x-0 top-4 bottom-0 z-50 h-[calc(100vh-1rem)] rounded-t-3xl border-0 shadow-2xl bg-slate-50 dark:bg-neutral-900 flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => onOpenChange(false)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        >
                            <X className="h-5 w-5 text-slate-500" />
                        </button>

                        <div className="flex h-full overflow-hidden flex-col xl:flex-row">
                            {/* Mobile/Tablet Steps Indicator - Shows at top */}
                            <div className="xl:hidden flex items-center justify-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 shrink-0">
                                {steps.map((step, index) => (
                                    <div key={step.number} className="flex items-center">
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${step.completed
                                                ? "bg-teal-500 text-white"
                                                : step.active
                                                    ? "bg-teal-500 text-white"
                                                    : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                                                }`}
                                        >
                                            {step.completed ? <Check className="h-3 w-3" /> : step.number}
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`w-8 h-0.5 mx-1 ${step.completed ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-700"}`} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Left Sidebar - Step Navigator (Desktop only) */}
                            <div className="w-64 bg-slate-100 dark:bg-slate-800/50 p-6 shrink-0 hidden xl:block">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="h-10 w-10 rounded-xl bg-teal-500 flex items-center justify-center">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Invite a Recipient
                                    </h2>
                                </div>

                                <div className="space-y-2">
                                    {steps.map((step) => (
                                        <div
                                            key={step.number}
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${step.active
                                                ? "bg-slate-200 dark:bg-slate-700"
                                                : step.completed
                                                    ? "text-slate-600 dark:text-slate-400"
                                                    : "text-slate-400 dark:text-slate-600"
                                                }`}
                                        >
                                            <div
                                                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${step.completed
                                                    ? "bg-teal-500 text-white"
                                                    : step.active
                                                        ? "bg-teal-500 text-white"
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
                            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-neutral-900 w-full">
                                <ScrollArea className="flex-1 px-4 xl:px-8 py-4 xl:py-6">
                                    {currentStep === 1 && (
                                        <div className="max-w-3xl mx-auto space-y-6">
                                            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                                                General
                                            </h1>

                                            {/* Info Banner */}
                                            <div className="flex items-center justify-between p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                                    Do you know all their information? Don&apos;t wait for them, fill it yourself in minutes.
                                                </p>
                                                <Button
                                                    size="sm"
                                                    className="bg-teal-500 hover:bg-teal-600 text-white shrink-0"
                                                >
                                                    Add Now →
                                                </Button>
                                            </div>

                                            {/* Recipient Category */}
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium text-slate-900 dark:text-white">
                                                    Recipient Category
                                                </Label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        onClick={() => setCategory("Individual")}
                                                        className={`p-4 rounded-xl border-2 transition-all ${category === "Individual"
                                                            ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                                                            : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                                            }`}
                                                    >
                                                        <div className="flex flex-col items-center gap-2">
                                                            <User className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                                                            <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                                Individual
                                                            </span>
                                                        </div>
                                                    </button>
                                                    <button
                                                        onClick={() => setCategory("Business")}
                                                        className={`p-4 rounded-xl border-2 transition-all ${category === "Business"
                                                            ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                                                            : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                                            }`}
                                                    >
                                                        <div className="flex flex-col items-center gap-2">
                                                            <Briefcase className="h-5 w-5 text-slate-700 dark:text-slate-300" />
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
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {recipientTypes.map((type) => {
                                                        const Icon = type.icon;
                                                        return (
                                                            <button
                                                                key={type.value}
                                                                onClick={() => setRecipientType(type.value)}
                                                                className={`p-4 rounded-xl border-2 transition-all ${recipientType === type.value
                                                                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                                                                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                                                                    }`}
                                                            >
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <Icon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                                                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                                        {type.label}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Other Information/Documents */}
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium text-slate-900 dark:text-white">
                                                    Other Information/Documents
                                                </Label>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    All personal and bank details are mandatory for a recipient to fill.
                                                </p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => setRequireAddress(!requireAddress)}
                                                            className={`relative w-11 h-6 rounded-full transition-colors ${requireAddress
                                                                ? "bg-teal-500"
                                                                : "bg-slate-300 dark:bg-slate-600"
                                                                }`}
                                                        >
                                                            <span
                                                                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${requireAddress ? "translate-x-5" : "translate-x-0"
                                                                    }`}
                                                            />
                                                        </button>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">
                                                            Address
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => setRequireNIC(!requireNIC)}
                                                            className={`relative w-11 h-6 rounded-full transition-colors ${requireNIC
                                                                ? "bg-teal-500"
                                                                : "bg-slate-300 dark:bg-slate-600"
                                                                }`}
                                                        >
                                                            <span
                                                                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${requireNIC ? "translate-x-5" : "translate-x-0"
                                                                    }`}
                                                            />
                                                        </button>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">
                                                            NIC/Passport
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => setRequireBusinessReg(!requireBusinessReg)}
                                                            className={`relative w-11 h-6 rounded-full transition-colors ${requireBusinessReg
                                                                ? "bg-teal-500"
                                                                : "bg-slate-300 dark:bg-slate-600"
                                                                }`}
                                                        >
                                                            <span
                                                                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${requireBusinessReg ? "translate-x-5" : "translate-x-0"
                                                                    }`}
                                                            />
                                                        </button>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">
                                                            Business Registration
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => setRequireTaxCert(!requireTaxCert)}
                                                            className={`relative w-11 h-6 rounded-full transition-colors ${requireTaxCert
                                                                ? "bg-teal-500"
                                                                : "bg-slate-300 dark:bg-slate-600"
                                                                }`}
                                                        >
                                                            <span
                                                                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${requireTaxCert ? "translate-x-5" : "translate-x-0"
                                                                    }`}
                                                            />
                                                        </button>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">
                                                            Tax Reg. Certificate
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Next Button */}
                                            <div className="pt-4">
                                                <Button
                                                    onClick={handleNext}
                                                    className="bg-teal-500 hover:bg-teal-600 text-white gap-2"
                                                >
                                                    Next
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="max-w-2xl mx-auto space-y-6">
                                            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                                                Invitation Details
                                            </h1>

                                            {/* Name */}
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-sm font-medium text-slate-900 dark:text-white">
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Alex Mirando"
                                                    className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                                />
                                            </div>

                                            {/* Email and Phone */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-sm font-medium text-slate-900 dark:text-white">
                                                        Email Address
                                                    </Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="alexmirando@mail.com"
                                                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone" className="text-sm font-medium text-slate-900 dark:text-white">
                                                        Phone Number (optional)
                                                    </Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="123 456 7890"
                                                        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                                    />
                                                </div>
                                            </div>

                                            {/* Info Text */}
                                            <p className="text-sm text-teal-600 dark:text-teal-400">
                                                The invitation will be sent to these contact information.
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4">
                                                <Button
                                                    onClick={handleBack}
                                                    variant="outline"
                                                    className="gap-2 border-slate-200 dark:border-slate-700"
                                                >
                                                    <ArrowLeft className="h-4 w-4" />
                                                    Back
                                                </Button>
                                                <Button
                                                    onClick={handleSend}
                                                    className="bg-teal-500 hover:bg-teal-600 text-white gap-2"
                                                >
                                                    Finish & Send
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </ScrollArea>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
