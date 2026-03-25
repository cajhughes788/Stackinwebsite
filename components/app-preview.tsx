"use client";

import { TrendingUp, DollarSign, PiggyBank, Wallet } from "lucide-react";

export function AppPreview() {
  return (
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl" />

      {/* Phone Frame */}
      <div className="relative rounded-3xl border border-border bg-card/80 p-4 backdrop-blur-xl shadow-2xl">
        {/* Status Bar */}
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-4 rounded-sm bg-muted-foreground" />
          </div>
        </div>

        {/* App Header */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        </div>

        {/* Balance Card */}
        <div className="mb-6 rounded-2xl bg-primary/10 border border-primary/20 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Total Earnings</span>
            <span className="flex items-center gap-1 text-xs text-primary">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </span>
          </div>
          <p className="text-3xl font-bold text-foreground">$8,429.50</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl bg-secondary/50 p-3 text-center">
            <DollarSign className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Income</p>
            <p className="text-sm font-semibold text-foreground">$6,420</p>
          </div>
          <div className="rounded-xl bg-secondary/50 p-3 text-center">
            <PiggyBank className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Tips</p>
            <p className="text-sm font-semibold text-foreground">$1,245</p>
          </div>
          <div className="rounded-xl bg-secondary/50 p-3 text-center">
            <Wallet className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Cash</p>
            <p className="text-sm font-semibold text-foreground">$764</p>
          </div>
        </div>

        {/* Recent Entries */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Recent</h3>
            <span className="text-xs text-primary">See all</span>
          </div>
          <div className="space-y-3">
            {[
              { label: "Shift Pay", amount: "+$245.00", time: "Today" },
              { label: "Tips", amount: "+$67.50", time: "Today" },
              { label: "Freelance", amount: "+$350.00", time: "Yesterday" },
            ].map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-secondary/30 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{entry.label}</p>
                  <p className="text-xs text-muted-foreground">{entry.time}</p>
                </div>
                <span className="text-sm font-semibold text-primary">{entry.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
