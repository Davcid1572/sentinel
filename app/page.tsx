"use client";

import { useChat } from "@ai-sdk/react";
import { DashboardShell } from "@/components/Dashboard-Shell";
import { Send } from "lucide-react";
import { useState } from "react";
import { SecurityCard } from "@/components/SecurityCard";
import { toolInvocation } from "ai";

export default function Home() {
  // In SDK 5.0+, you manage the input state yourself for maximum performance
  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage, // Renamed from append/handleSubmit in SDK 5.0
    status, // Replaces isLoading
  } = useChat();

  const isProcessing = status === "submitted" || status === "streaming";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      // SDK 5.0 expects an object with a 'text' property
      sendMessage({ text: input });
      setInput("");
    }
  };

  return (
    <DashboardShell>
      <div className="flex flex-col h-full max-w-4xl mx-auto">
        <div className="flex-1 space-y-6 pb-24 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center mt-20 text-zinc-500">
              Sentinel Command Center Online.
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-200"
                }`}
              >
                <span className="block font-bold text-[10px] uppercase mb-1 opacity-50">
                  {m.role === "user" ? "Operator" : "Sentinel"}
                </span>

                {/* SDK 5.0 rendering: Messages are made of 'parts' */}
                {m.parts.map((part, index) => {
                  if (part.type === "text") {
                    return <span key={index}>{part.text}</span>;
                  }

                  if (part.type === "tool-invocation") {
                    const { toolName, state, result } = part.toolInvocation;

                    // While the tool is running
                    if (state === "call") {
                      return (
                        <div key={index} className="italic text-zinc-500">
                          Scanning {toolName}...
                        </div>
                      );
                    }

                    // Once we have the result, show the SecurityCard!
                    if (
                      state === "result" &&
                      toolName === "scan_infrastructure"
                    ) {
                      return (
                        <SecurityCard
                          key={index}
                          riskLevel={result.riskLevel}
                          issue={result.issue}
                          resource={result.resource}
                          recommendation={result.recommendation}
                        />
                      );
                    }
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-6 left-64 right-80 px-6">
          <form onSubmit={onSubmit} className="relative max-w-3xl mx-auto">
            <input
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 px-6 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
              value={input}
              placeholder="Execute security command..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-3 p-2 bg-primary rounded-lg disabled:opacity-50"
              disabled={isProcessing || !input}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
