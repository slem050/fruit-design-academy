import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";

const mockPurchases = [
  {
    id: "p-1",
    customer: "demo@student.test",
    course: "Elegant Fruit Tray Design",
    amount: 149,
    status: "mock_completed",
    at: "2025-03-01"
  },
  {
    id: "p-2",
    customer: "client@events.test",
    course: "Elegant Fruit Tray Design",
    amount: 149,
    status: "mock_pending",
    at: "2025-03-15"
  }
];

export default function AdminPurchasesPage(): ReactElement {
  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header className="space-y-2">
        <h1 className={pageTitle}>Purchases (mock)</h1>
        <p className={pageLead}>
          Sample rows for a future Stripe-backed ledger. Replace with repository queries when
          checkout is live.
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-orange-100 bg-white shadow-sm sm:rounded-3xl">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockPurchases.map((row) => (
              <tr key={row.id} className="border-t border-orange-100">
                <td className="px-4 py-3">{row.customer}</td>
                <td className="px-4 py-3">{row.course}</td>
                <td className="px-4 py-3">${row.amount}</td>
                <td className="px-4 py-3 font-medium text-orange-800">{row.status}</td>
                <td className="px-4 py-3 text-neutral-600">{row.at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
