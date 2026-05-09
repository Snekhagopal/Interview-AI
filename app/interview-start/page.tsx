"use client";

import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Mic,
  ShieldCheck,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInterviewStack } from "@/lib/interviewStacks";

const readinessItems = [
  {
    icon: Mic,
    label: "Voice answers",
    detail: "Speak naturally using Chrome or Edge speech capture.",
  },
  {
    icon: Video,
    label: "Camera preview",
    detail: "Webcam turns on in the interview room.",
  },
  {
    icon: Clock,
    label: "Timed questions",
    detail: "Each question has a focused response window.",
  },
  {
    icon: ShieldCheck,
    label: "Practice mode",
    detail: "Frontend-only simulation with guided feedback.",
  },
];

type Session = {
  name?: string;
  stackId?: string;
  role?: string;
};

export default function InterviewStart() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [session, setSession] = useState<Session>({});

  useEffect(() => {
    const saved = sessionStorage.getItem("interview_session");
    if (saved) {
      try {
        setSession(JSON.parse(saved));
        return;
      } catch {
        sessionStorage.removeItem("interview_session");
      }
    }

    setSession({
      name: searchParams.get("name") || "",
      stackId: searchParams.get("stackId") || "react",
      role: searchParams.get("role") || "",
    });
  }, [searchParams]);

  const stack = useMemo(
    () => getInterviewStack(session.stackId || "react"),
    [session.stackId]
  );

  const StackIcon = stack.icon;

  const startInterview = () => {
    const nextSession = {
      ...session,
      stackId: stack.id,
      role: stack.role,
    };

    sessionStorage.setItem("interview_session", JSON.stringify(nextSession));
    router.push("/interview");
  };

  const goToStacks = () => {
    router.push("/stacks");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute right-[-12%] top-[-16%] h-[34rem] w-[34rem] rounded-full bg-primary/5 blur-[120px]" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6 md:px-12">
        <button
          onClick={goToStacks}
          className="mb-10 flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to stacks
        </button>

        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-muted-foreground">
              <StackIcon className="h-4 w-4 text-primary" />
              {stack.name} interview selected
            </div>

            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
                Ready for your {stack.name} technical interview?
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Hi {session.name || "there"}, this session will ask only{" "}
                {stack.name}-based questions focused on{" "}
                {stack.focus.toLowerCase()}.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={startInterview}
                className="rounded-xl bg-primary px-8 py-6 text-primary-foreground hover:bg-primary/90 glow-primary"
              >
                Start {stack.name} Interview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                onClick={goToStacks}
                className="rounded-xl border-border/50 px-8 py-6 text-foreground hover:bg-secondary"
              >
                Change stack
              </Button>
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <StackIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interview track</p>
                <h2 className="text-2xl font-bold text-foreground">
                  {stack.role}
                </h2>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/50 bg-secondary/60 p-4">
                <p className="text-xs text-muted-foreground">Questions</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {stack.questionCount}
                </p>
              </div>
              <div className="rounded-xl border border-border/50 bg-secondary/60 p-4">
                <p className="text-xs text-muted-foreground">Level</p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {stack.level}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {readinessItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.08 }}
                    className="flex gap-3 rounded-xl bg-secondary/50 p-4"
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.aside>
        </div>
      </main>
    </div>
  );
}