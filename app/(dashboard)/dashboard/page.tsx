import { AccountBalance } from "@/components/dashboard/account-balance";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";

export default function DashboardPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Home</h1>
      </div>

      <AccountBalance />
      <RecentTransactions />
    </div>
  );
}
