"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getInterviewStack, stackQuestions } from "@/lib/interviewStacks";

import { InterviewHeader } from "@/app/interview/_components/interview-header";
import { QuestionPanel } from "@/app/interview/_components/question-panel";
import { CameraPanel } from "@/app/interview/_components/camera-panel";
import { TipsPanel } from "@/app/interview/_components/tips-panel";

type InterviewSession = {
  name: string;
  role: string;
  stackName: string;
  answers: string[];
  questions: string[];
};

export default function InterviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Candidate";
  const role = searchParams.get("role") || "";
  const stackId = searchParams.get("stackId") || "react";

  const stack = getInterviewStack(stackId);
  const questions = stackQuestions[stack.id];
  const interviewRole = role || stack.role;

  const [currentQ, setCurrentQ] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);

  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => {});

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream | null;
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timeLeft]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (e: any) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  }, [isRecording]);

  const handleNext = () => {
    const newAnswers = [...answers, transcript || "(No response)"];
    setAnswers(newAnswers);
    setTranscript("");
    recognitionRef.current?.stop();
    setIsRecording(false);

    if (currentQ >= questions.length - 1) {
      const session: InterviewSession = {
        name,
        role: interviewRole,
        stackName: stack.name,
        answers: newAnswers,
        questions,
      };

      sessionStorage.setItem("interview_result", JSON.stringify(session));
      router.push("/results");
    } else {
      setCurrentQ((q) => q + 1);
      setTimeLeft(120);
    }
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <InterviewHeader
        currentQ={currentQ}
        totalQuestions={questions.length}
        timeLeft={timeLeft}
        mins={mins}
        secs={secs}
      />

      <div className="h-1 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <QuestionPanel
          stackName={stack.name}
          currentQ={currentQ}
          totalQuestions={questions.length}
          question={questions[currentQ]}
          transcript={transcript}
          isRecording={isRecording}
          onToggleRecording={toggleRecording}
          onNext={handleNext}
          isLastQuestion={currentQ >= questions.length - 1}
        />

        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border/50 p-4 flex flex-col gap-4 bg-card/30">
          <CameraPanel videoRef={videoRef} />
          <TipsPanel />
        </div>
      </div>
    </div>
  );
}