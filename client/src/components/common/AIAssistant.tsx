import { useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiPaperAirplane,
  HiSparkles,
  HiXMark,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAssistantReply } from "@/utils/assistantBrain";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "Tell me about Tharun",
  "Show your projects",
  "What cybersecurity skills do you have?",
  "Show your certificates",
  "What is your TryHackMe status?",
  "How can I contact you?",
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messageIdRef = useRef(2);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi, I’m Tharun’s portfolio assistant. Ask me about his projects, skills, certificates, cyber labs, or contact details.",
    },
  ]);

  function createMessage(role: Message["role"], content: string): Message {
    messageIdRef.current += 1;

    return {
      id: messageIdRef.current,
      role,
      content,
    };
  }

  function sendMessage(customQuestion?: string) {
    const question = customQuestion ?? input;

    if (!question.trim()) return;

    const userMessage = createMessage("user", question);

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getAssistantReply(question);
      const assistantMessage = createMessage("assistant", reply);

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);

      setTyping(false);
    }, 700);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-24 left-6 z-50 flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.35)] transition hover:-translate-y-1 hover:bg-secondary/90"
        aria-label="Open AI portfolio assistant"
      >
        <HiSparkles className="text-lg" />
        AI Assistant
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-6 z-[80] w-[calc(100vw-3rem)] max-w-md"
          >
            <Card className="cyber-card overflow-hidden border-border bg-card/95 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <p className="flex items-center gap-2 font-bold">
                    <HiSparkles className="text-primary" />
                    Portfolio Assistant
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Answers using portfolio content
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-border p-2 text-muted-foreground transition hover:text-primary"
                  aria-label="Close assistant"
                >
                  <HiXMark />
                </button>
              </div>

              <CardContent className="p-0">
                <div className="h-80 space-y-4 overflow-y-auto p-5">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={
                        message.role === "user"
                          ? "flex justify-end"
                          : "flex justify-start"
                      }
                    >
                      <div
                        className={
                          message.role === "user"
                            ? "max-w-[85%] whitespace-pre-line rounded-2xl bg-primary px-4 py-3 text-sm text-primary-foreground"
                            : "max-w-[85%] whitespace-pre-line rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground"
                        }
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}

                  {typing && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-border p-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 3).map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => sendMessage(question)}
                        className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                      >
                        {question}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about Tharun..."
                      className="border-border bg-background/70"
                    />

                    <Button
                      type="button"
                      onClick={() => sendMessage()}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      aria-label="Send message"
                    >
                      <HiPaperAirplane />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}