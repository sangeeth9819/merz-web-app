// Type definitions for Merz Banking Portal

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "corporate";
  company?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: "current" | "savings" | "corporate";
  bankName: string;
  balance: number;
  currency: string;
  isPrimary: boolean;
  status: "active" | "frozen" | "closed";
}

export interface Transaction {
  id: string;
  accountId: string;
  type: "credit" | "debit";
  amount: number;
  currency: string;
  description: string;
  category: string;
  recipient?: string;
  sender?: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  date: Date;
  reference: string;
}

export interface Recipient {
  id: string;
  userId: string;
  name: string;
  email?: string;
  bankName: string;
  accountNumber: string;
  bankCode?: string;
  recipientType: "vendor" | "employee" | "agent";
  isVerified: boolean;
  createdAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  accountId: string;
  recipientId: string;
  amount: number;
  currency: string;
  paymentMethod: "CEFT" | "SLIP" | "RGTS" | "INTERNAL_TRANSFER";
  description: string;
  status: "draft" | "pending" | "processing" | "completed" | "failed";
  scheduledDate?: Date;
  processedDate?: Date;
  reference: string;
  fee?: number;
}

export interface PaymentBatch {
  id: string;
  userId: string;
  accountId: string;
  totalAmount: number;
  paymentCount: number;
  status: "draft" | "pending" | "processing" | "completed" | "partial";
  createdAt: Date;
  scheduledDate?: Date;
}
