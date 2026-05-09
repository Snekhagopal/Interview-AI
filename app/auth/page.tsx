"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Brain, Mail, UserRound } from "lucide-react";
import { z } from "zod";
import { useAuth } from "@/hooks/use-Auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
});

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profile, loading, saveProfile } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const redirectTo = searchParams.get("from") || "/setup";

  useEffect(() => {
    if (!loading && profile) {
      router.replace(redirectTo);
    }
  }, [loading, profile, router, redirectTo]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = profileSchema.safeParse({ fullName, email });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    saveProfile({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
    });

    toast.success(`Welcome, ${parsed.data.fullName.split(" ")[0]}!`);
    router.replace(redirectTo);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-[-15%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/5 blur-[120px]" />

      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md glass rounded-2xl p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">InterviewAI</span>
        </div>

        <h1 className="text-2xl font-extrabold text-foreground mb-1">
          Create your profile
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Quick one-time setup. We save it locally on this device so you won&apos;t be asked again.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Full name
            </label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Aarav Sharma"
                className="pl-9 border-border/50 bg-secondary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="pl-9 border-border/50 bg-secondary"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-primary py-6 text-primary-foreground hover:bg-primary/90 glow-primary"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Your details stay on this device. No account, no password.
        </p>
      </motion.div>
    </div>
  );
}