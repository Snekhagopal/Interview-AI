"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles, Target, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-Auth";

export default function Setup() {
  const router = useRouter();
  const { profile, clearProfile } = useAuth();

  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("mid");

  const displayName = profile?.fullName || "there";
  const canProceed = goal.trim().length > 0;

  const continueFlow = () => {
    const session = {
      name: profile?.fullName,
      email: profile?.email,
      goal,
      experience,
    };

    sessionStorage.setItem("interview_session", JSON.stringify(session));
    router.push("/stacks");
  };

  const handleSignOut = () => {
    clearProfile();
    sessionStorage.removeItem("interview_session");
    sessionStorage.removeItem("interview_result");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-[-12%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-[-18%] left-[-8%] h-[26rem] w-[26rem] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 px-6 py-6 md:px-12 flex items-center justify-between">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-6xl items-center gap-10 px-6 pb-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Welcome, {displayName}
            </div>

            <h1 className="text-5xl font-extrabold leading-tight text-foreground">
              Set your prep goal, then choose a stack.
            </h1>

            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              We use your goal to make the interview track feel focused. Pick the
              stack on the next screen.
            </p>
          </motion.div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
              <Target className="h-7 w-7 text-accent" />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Set your preparation goal
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">
              Tell us what you want to practice so the next screen feels focused.
            </p>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Experience level
                </label>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {["junior", "mid", "senior", "lead"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setExperience(level)}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium capitalize transition-all ${
                        experience === level
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/50 bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Interview goal
                </label>

                <Textarea
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  placeholder="Example: Prepare for a React frontend interview next week"
                  className="min-h-28 border-border/50 bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </motion.div>

          <div className="mt-5">
            <Button
              className="w-full rounded-xl bg-primary py-6 text-primary-foreground hover:bg-primary/90 disabled:opacity-40 glow-primary"
              disabled={!canProceed}
              onClick={continueFlow}
            >
              View interview stacks
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}