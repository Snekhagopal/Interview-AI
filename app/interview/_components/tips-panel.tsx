"use client";

import { AlertCircle } from "lucide-react";

export function TipsPanel() {
  return (
    <div className="glass rounded-xl p-4 space-y-3">
      <h4 className="text-sm font-semibold text-foreground">Tips</h4>

      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-warning" />
        Take a moment to organize your thoughts before answering.
      </div>

      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-info" />
        Use specific examples from your experience.
      </div>
    </div>
  );
}