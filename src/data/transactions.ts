// The shape of one row. A real account has tens of thousands of these.
export interface Transaction {
  id: string;
  date: string;          // ISO
  merchant: string;
  amountCents: number;
  category: string;
  status: "pending" | "categorized" | "flagged" | "approved";
}

// Generate a large, realistic dataset so the perf problem is REAL, not faked.
export function makeTransactions(n: number): Transaction[] {
  const merchants = ["AWS", "Figma", "Delta", "Uber", "Notion", "Slack", "Apple"];
  const categories = ["software", "travel", "meals", "ads", "hardware", "ops"];
  const out: Transaction[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      id: `txn_${i}`,
      date: new Date(2026, 0, 1 + (i % 180)).toISOString().slice(0, 10),
      merchant: merchants[i % merchants.length],
      amountCents: ((i * 37) % 50000) + 100,
      category: categories[i % categories.length],
      status: (["pending", "categorized", "flagged", "approved"] as const)[i % 4],
    });
  }
  return out;
}
