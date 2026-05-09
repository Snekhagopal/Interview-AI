"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  stackName: string;
  currentQ: number;
  totalQuestions: number;
  question: string;
  transcript: string;
  isRecording: boolean;
  onToggleRecording: () => void;
  onNext: () => void;
  isLastQuestion: boolean;
};

export function QuestionPanel({
  stackName,
  currentQ,
  totalQuestions,
  question,
  transcript,
  isRecording,
  onToggleRecording,
  onNext,
  isLastQuestion,
}: Props) {
  return (
    <div className="flex-1 flex flex-col p-6 md:p-10 overflow-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="flex-1 flex flex-col"
        >
          <span className="text-xs font-medium text-primary uppercase tracking-wider mb-3">
            {stackName} Question {currentQ + 1} of {totalQuestions}
          </span>

          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed mb-8">
            {question}
          </h2>

          <div className="flex-1 glass rounded-2xl p-6 mb-6 overflow-auto">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Your Response
            </p>

            {transcript ? (
              <p className="text-foreground leading-relaxed">{transcript}</p>
            ) : (
              <p className="text-muted-foreground italic">
                {isRecording
                  ? "Listening… speak your answer"
                  : "Click the microphone to start recording"}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleRecording}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? "bg-destructive text-destructive-foreground animate-pulse-ring"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
              }`}
            >
              {isRecording ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>

            {isRecording && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    animate={{ height: [8, 20, 8] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="flex-1" />

            <Button
              onClick={onNext}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-5"
            >
              {isLastQuestion ? "Finish" : "Next Question"}
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}