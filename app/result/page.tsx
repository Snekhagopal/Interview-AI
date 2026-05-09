"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Trophy,
  BarChart3,
  MessageSquare,
  ArrowRight,
  RotateCcw,
  Download,
  CheckCircle2,
  XCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mockScores = [
  { category: "Communication", score: 82, max: 100 },
  { category: "Technical Knowledge", score: 75, max: 100 },
  { category: "Problem Solving", score: 88, max: 100 },
  { category: "Code Quality", score: 70, max: 100 },
  { category: "Culture Fit", score: 90, max: 100 },
];

const strengths = [
  "Clear and structured communication",
  "Strong problem-solving approach",
  "Good understanding of system design",
];

const improvements = [
  "Could provide more concrete code examples",
  "Consider edge cases more thoroughly",
];

type ResultSession = {
  name?: string;
  role?: string;
  stackName?: string;
  questions?: string[];
  answers?: string[];
};

export default function Results() {
  const router = useRouter();
  const [session, setSession] = useState<ResultSession>({
    name: "Candidate",
    role: "Developer",
    stackName: "Technical",
    questions: [],
    answers: [],
  });

  useEffect(() => {
    const raw = sessionStorage.getItem("interview_result");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as ResultSession;
      setSession((prev) => ({
        ...prev,
        ...parsed,
      }));
    } catch {
      sessionStorage.removeItem("interview_result");
    }
  }, []);

  const {
    name = "Candidate",
    role = "Developer",
    stackName = "Technical",
    questions = [],
    answers = [],
  } = session;

  const overall = useMemo(
    () =>
      Math.round(
        mockScores.reduce((sum, item) => sum + item.score, 0) / mockScores.length
      ),
    []
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-[-10%] left-[30%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
            Interview Complete!
          </h1>
          <p className="text-muted-foreground">
            Great job, {name}. Here&apos;s your {stackName} interview performance breakdown.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-8 mb-6 text-center"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Overall Score
          </p>

          <div className="relative w-36 h-36 mx-auto mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="8"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 52 * (1 - overall / 100),
                }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-extrabold text-foreground">
                {overall}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-5 h-5 ${
                  s <= Math.round(overall / 20)
                    ? "text-warning fill-warning"
                    : "text-secondary"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Category Scores
            </h3>
          </div>

          <div className="space-y-5">
            {mockScores.map((s, i) => (
              <div key={s.category}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-foreground font-medium">
                    {s.category}
                  </span>
                  <span className="text-muted-foreground">{s.score}%</span>
                </div>

                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.score}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Strengths
            </h3>

            <ul className="space-y-3">
              {strengths.map((item) => (
                <li
                  key={item}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-warning" />
              Areas to Improve
            </h3>

            <ul className="space-y-3">
              {improvements.map((item) => (
                <li
                  key={item}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">
                Response Review
              </h3>
            </div>

            <div className="space-y-6">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="border-b border-border/30 pb-5 last:border-0 last:pb-0"
                >
                  <p className="text-sm font-medium text-foreground mb-2">
                    Q{i + 1}: {q}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {answers[i] || "(No response)"}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-6"
            onClick={() => router.push("/setup")}
          >
            <RotateCcw className="mr-2 w-4 h-4" />
            Try Again
          </Button>

          <Button
            variant="outline"
            className="border-border/50 text-foreground hover:bg-secondary rounded-xl px-8 py-6"
          >
            <Download className="mr-2 w-4 h-4" />
            Download Report
          </Button>

          <Button
            variant="outline"
            className="border-border/50 text-foreground hover:bg-secondary rounded-xl px-8 py-6"
            onClick={() => router.push("/")}
          >
            Back Home
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}