"use client";

import { Brain, Clock, MessageSquare } from "lucide-react";

type Props = {
  currentQ: number;
  totalQuestions: number;
  timeLeft: number;
  mins: number;
  secs: number;
};

export function InterviewHeader({
  currentQ,
  totalQuestions,
  timeLeft,
  mins,
  secs,
}: Props) {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-border/50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Brain className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-foreground text-sm">
          InterviewAI
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MessageSquare className="w-4 h-4" />
          {currentQ + 1}/{totalQuestions}
        </div>

        <div
          className={`flex items-center gap-1.5 text-sm font-mono ${
            timeLeft < 30 ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          <Clock className="w-4 h-4" />
          {mins}:{secs.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}