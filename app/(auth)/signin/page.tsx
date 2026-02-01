"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        // In a real app, handle redirect here
        window.location.href = "/dashboard";
    };

    return (
        <div className="w-full min-h-screen flex">
            {/* Left Panel - Branding (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-neutral-900 relative overflow-hidden flex-col justify-between p-12 text-white">
                {/* Abstract Background Effect */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-neutral-900 to-neutral-900" />
                    <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <Image
                        src="/assets/logo-white.svg"
                        alt="Merz"
                        width={120}
                        height={40}
                        className="mb-8"
                    />
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-4xl font-bold mb-6 leading-tight">
                        Seamless banking for the modern enterprise.
                    </h1>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Manage your corporate finances, payouts, and recipients with unprecedented ease and security.
                    </p>
                </div>

                <div className="relative z-10 text-sm text-slate-500">
                    © 2026 Merz. All rights reserved.
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 bg-white dark:bg-neutral-900">
                <div className="w-full max-w-sm space-y-8">
                    {/* Logo (Mobile Only) */}
                    <div className="lg:hidden mb-8">
                        <div className="relative h-8 w-24">
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

                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Welcome back
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                required
                                className="bg-slate-50 dark:bg-slate-800/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    className="bg-slate-50 dark:bg-slate-800/50 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <label
                                    htmlFor="remember"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600 dark:text-slate-400"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link
                                href="#"
                                className="text-sm font-medium text-primary hover:text-primary/80"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white h-11"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                "Signing in..."
                            ) : (
                                <span className="flex items-center gap-2">
                                    Sign in <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="#"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Contact Admin
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
