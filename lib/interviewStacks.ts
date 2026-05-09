import { Atom, Braces, Database, Layers, Server, Smartphone } from "lucide-react";

export type InterviewStackId = "react" | "javascript" | "typescript" | "node" | "python" | "fullstack";

export const interviewStacks = [
  {
    id: "react",
    name: "React",
    role: "React Developer",
    icon: Atom,
    level: "Frontend",
    focus: "Hooks, rendering, state, performance, component design",
    questionTypes: ["Component lifecycle", "Hooks", "State patterns", "Performance", "Forms", "Architecture"],
    previewQuestions: [
      "What causes a React component to re-render?",
      "When should you use useMemo or useCallback?",
      "How do you structure reusable components?",
    ],
    questionCount: 6,
  },
  {
    id: "javascript",
    name: "JavaScript",
    role: "JavaScript Developer",
    icon: Braces,
    level: "Core Web",
    focus: "Closures, async flow, prototypes, DOM, event loop",
    questionTypes: ["Closures", "Event loop", "Promises", "Prototype chain", "DOM", "Performance"],
    previewQuestions: [
      "Explain closures with a production example.",
      "How do microtasks differ from macrotasks?",
      "When would you debounce or throttle an event?",
    ],
    questionCount: 6,
  },
  {
    id: "typescript",
    name: "TypeScript",
    role: "TypeScript Developer",
    icon: Layers,
    level: "Typed Frontend",
    focus: "Generics, narrowing, utility types, architecture",
    questionTypes: ["Generics", "Type narrowing", "Utility types", "API typing", "Interfaces", "Maintainability"],
    previewQuestions: [
      "How do generics improve reusable code?",
      "Explain discriminated unions with an example.",
      "How would you type a success or error API response?",
    ],
    questionCount: 6,
  },
  {
    id: "node",
    name: "Node.js",
    role: "Node.js Developer",
    icon: Server,
    level: "Backend",
    focus: "APIs, streams, runtime, scaling, security",
    questionTypes: ["Runtime", "REST APIs", "Streams", "Auth", "Debugging", "Logging"],
    previewQuestions: [
      "How does the Node.js event loop affect API performance?",
      "When are streams better than loading a full file?",
      "How do you design secure API authorization?",
    ],
    questionCount: 6,
  },
  {
    id: "python",
    name: "Python",
    role: "Python Developer",
    icon: Smartphone,
    level: "Backend / Scripting",
    focus: "Data structures, OOP, async, testing, clean code",
    questionTypes: ["Data structures", "Memory", "Decorators", "Generators", "Testing", "Async"],
    previewQuestions: [
      "When would you use a tuple instead of a list?",
      "What are decorators used for?",
      "How do generators help with large datasets?",
    ],
    questionCount: 6,
  },
  {
    id: "fullstack",
    name: "Full Stack",
    role: "Full Stack Developer",
    icon: Database,
    level: "End-to-End",
    focus: "Frontend, APIs, databases, auth, deployment trade-offs",
    questionTypes: ["Feature design", "State and APIs", "Auth", "Debugging", "Validation", "Deployment"],
    previewQuestions: [
      "How would you design a feature from UI to database?",
      "How do frontend cache and backend data stay consistent?",
      "How would you debug a slow full-stack user flow?",
    ],
    questionCount: 6,
  },
] as const;

export const stackQuestions: Record<InterviewStackId, string[]> = {
  react: [
    "Explain how React's rendering model works and what can trigger a component re-render.",
    "When would you use useMemo, useCallback, or React.memo, and what mistakes should you avoid?",
    "How do you design reusable React components without making them too generic?",
    "Explain controlled vs uncontrolled components with a practical form example.",
    "How would you debug and improve performance in a slow React page?",
    "Describe how you manage server state and client UI state in a React application.",
  ],
  javascript: [
    "Explain closures with a real-world example where they are useful.",
    "Walk through the JavaScript event loop, microtasks, and macrotasks.",
    "How do promises differ from async/await, and how do you handle errors cleanly?",
    "Explain prototypal inheritance and how it differs from class-based inheritance.",
    "How would you prevent memory leaks in a browser-based JavaScript application?",
    "Describe debounce and throttle, and when you would use each.",
  ],
  typescript: [
    "How do generics improve type safety in reusable functions or components?",
    "Explain union narrowing and discriminated unions with an example.",
    "When should you use interface vs type in TypeScript?",
    "How would you type an API response that can succeed or fail?",
    "Explain utility types like Pick, Omit, Partial, and Record.",
    "How do you keep TypeScript types maintainable in a growing codebase?",
  ],
  node: [
    "Explain the Node.js event loop and how it affects API performance.",
    "How would you structure a production-ready REST API in Node.js?",
    "What are streams in Node.js and when are they better than loading full files into memory?",
    "How do you handle authentication and authorization securely in a backend service?",
    "How would you debug a memory leak or slow endpoint in Node.js?",
    "Explain how you would design error handling and logging for a Node.js API.",
  ],
  python: [
    "Explain Python lists, tuples, sets, and dictionaries with use cases.",
    "How does Python handle memory management and garbage collection?",
    "What are decorators, and where would you use them in production code?",
    "Explain generators and why they are useful for large datasets.",
    "How would you write testable Python code for a service layer?",
    "Describe async programming in Python and when you would use it.",
  ],
  fullstack: [
    "How would you design a full-stack feature from UI to database schema?",
    "Explain how frontend state, API caching, and backend data consistency work together.",
    "How do you approach authentication across frontend and backend systems?",
    "Describe how you would debug a slow user flow across browser, API, and database layers.",
    "How would you design validation so data remains consistent client-side and server-side?",
    "Explain deployment considerations for a full-stack web application.",
  ],
};

export const getInterviewStack = (id?: string) => interviewStacks.find((stack) => stack.id === id) ?? interviewStacks[0];
