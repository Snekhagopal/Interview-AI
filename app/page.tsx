"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Mic,
  Brain,
  Shield,
  ArrowRight,
  Sparkles,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Questions",
    desc: "Adaptive questions tailored to your role and experience level",
  },
  {
    icon: Mic,
    title: "Voice Recognition",
    desc: "Speak naturally — our AI transcribes and analyzes your responses",
  },
  {
    icon: Video,
    title: "Video Proctoring",
    desc: "Webcam monitoring ensures a fair and secure interview",
  },
  {
    icon: Shield,
    title: "Bias-Free Evaluation",
    desc: "Objective scoring based on competency frameworks",
  },
];

export default function Landing() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />

      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">InterviewAI</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Button
            variant="outline"
            className="border-border/50 text-foreground hover:bg-secondary"
            onClick={() => router.push("/auth")}
          >
            Get Started
          </Button>
        </motion.div>
      </nav>

      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 md:pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          AI-Powered Technical Interviews
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-7xl font-extrabold leading-tight max-w-4xl"
        >
          <span className="text-foreground">Ace Your Next</span>
          <br />
          <span className="gradient-text">Technical Interview</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Practice with our AI interviewer that adapts to your skill level. Get real-time feedback,
          detailed scoring, and actionable insights to land your dream role.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary text-base px-8 py-6 rounded-xl"
            onClick={() => router.push("/auth")}
          >
            Start Interview
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-border/50 text-foreground hover:bg-secondary text-base px-8 py-6 rounded-xl"
          >
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-float">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center animate-pulse-ring">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Mic className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 md:px-12 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}