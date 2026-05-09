"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ListChecks,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { interviewStacks } from "@/lib/interviewStacks";

type Session = {
  name?: string;
  email?: string;
  goal?: string;
  experience?: string;
};

export default function StackSelection() {
  const router = useRouter();
  const [session, setSession] = useState<Session>({});

  useEffect(() => {
    const saved = sessionStorage.getItem("interview_session");
    if (!saved) return;

    try {
      setSession(JSON.parse(saved));
    } catch {
      sessionStorage.removeItem("interview_session");
    }
  }, []);

  const chooseStack = (stackId: string, role: string) => {
    const nextSession = {
      ...session,
      stackId,
      role,
    };

    sessionStorage.setItem("interview_session", JSON.stringify(nextSession));
    router.push("/start");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute right-[-10%] top-[-18%] h-[32rem] w-[32rem] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-[-22%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/5 blur-[120px]" />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-6 md:px-12">
        <button
          onClick={() => router.push("/setup")}
          className="mb-10 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to onboarding
        </button>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 max-w-4xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Stack-based interview listing
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
            Choose a stack, get different question sets.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every track has its own interview focus, sample question style, and
            final interview questions.
          </p>
        </motion.header>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {interviewStacks.map((stack, index) => {
            const Icon = stack.icon;

            return (
              <motion.article
                key={stack.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="glass group flex min-h-[28rem] flex-col rounded-2xl p-5 transition-colors hover:border-primary/40"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        {stack.name}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {stack.role}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-border/50 bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                    {stack.level}
                  </span>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {stack.focus}
                </p>

                <div className="mb-5">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <ListChecks className="h-4 w-4 text-primary" />
                    Question areas
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {stack.questionTypes.map((type) => (
                      <span
                        key={type}
                        className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6 flex-1 space-y-3">
                  <p className="text-sm font-semibold text-foreground">
                    Example questions
                  </p>

                  {stack.previewQuestions.map((question) => (
                    <div
                      key={question}
                      className="flex gap-2 rounded-xl bg-secondary/60 p-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {question}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => chooseStack(stack.id, stack.role)}
                  className="w-full rounded-xl bg-primary py-6 text-primary-foreground hover:bg-primary/90"
                >
                  Choose {stack.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.article>
            );
          })}
        </section>
      </main>
    </div>
  );
}