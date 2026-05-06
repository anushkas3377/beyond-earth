import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles, Trash2, User } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

// Keyword-based Q&A dataset
const SPACE_QA: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["moon", "lunar", "how far"],
    answer:
      "The Moon is about 384,400 km (238,855 miles) from Earth on average. It orbits Earth every 27.3 days. The Moon's distance varies slightly because its orbit is elliptical — at perigee it's ~356,500 km away, and at apogee ~406,700 km.",
  },
  {
    keywords: ["black hole", "blackhole"],
    answer:
      "A black hole is a region of spacetime where gravity is so strong that nothing can escape it — not even light. They form when massive stars collapse at the end of their lives. The boundary of no return is called the event horizon.",
  },
  {
    keywords: ["planet", "solar system", "how many planets"],
    answer:
      "Our solar system has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto was reclassified as a dwarf planet in 2006. Jupiter is the largest, and Mercury is the closest to the Sun.",
  },
  {
    keywords: ["iss", "space station", "international space station"],
    answer:
      "The International Space Station (ISS) orbits Earth at approximately 400 km altitude, completing one full orbit every 90 minutes. It has been continuously inhabited since November 2000 and serves as a microgravity research laboratory.",
  },
  {
    keywords: ["mars", "red planet"],
    answer:
      "Mars is the 4th planet from the Sun, known as the Red Planet due to iron oxide on its surface. A Martian day is 24 hours 37 minutes. Temperatures range from -125°C at the poles to 20°C near the equator. NASA's Perseverance rover is currently exploring its surface.",
  },
  {
    keywords: ["sun", "star", "yellow dwarf"],
    answer:
      "The Sun is a G-type main-sequence star (yellow dwarf) approximately 4.6 billion years old. It accounts for 99.86% of the solar system's total mass. Its surface temperature is about 5,500°C, while the mysterious corona reaches over 1,000,000°C.",
  },
  {
    keywords: ["galaxy", "milky way"],
    answer:
      "The Milky Way is a barred spiral galaxy containing an estimated 200–400 billion stars. It is about 100,000 light-years across and 1,000 light-years thick. Our solar system is located about 26,000 light-years from the galactic center.",
  },
  {
    keywords: [
      "astronaut",
      "cosmonaut",
      "neil armstrong",
      "gagarin",
      "tereshkova",
    ],
    answer:
      "Astronauts train for years before reaching orbit. ISS missions require approximately 6 months of intensive preparation. Famous astronauts include Neil Armstrong (first on the Moon), Yuri Gagarin (first human in space), and Valentina Tereshkova (first woman in space).",
  },
  {
    keywords: ["speed of light", "light speed"],
    answer:
      "Light travels at exactly 299,792,458 meters per second in a vacuum — approximately 300,000 km/s. It takes sunlight about 8 minutes and 20 seconds to reach Earth, and over 4 years to reach the nearest star beyond our Sun, Proxima Centauri.",
  },
  {
    keywords: ["dark matter"],
    answer:
      "Dark matter is an invisible substance estimated to make up about 27% of the universe's total mass-energy content. It doesn't emit, absorb, or reflect light, but its gravitational influence on visible matter and light reveals its presence throughout the cosmos.",
  },
  {
    keywords: ["nebula", "nebulae"],
    answer:
      "A nebula is a vast cloud of gas and dust in space. Many are stellar nurseries — regions where gravity pulls matter together until nuclear fusion ignites and a new star is born. Famous examples include the Pillars of Creation in the Eagle Nebula.",
  },
];

const FALLBACK =
  "That's a fascinating space question! While I'm focused on key space topics, I can tell you about planets, the Moon, black holes, the ISS, the Sun, our galaxy, and famous astronauts. Try asking about one of those!";

const SUGGESTED = [
  "How far is the Moon?",
  "What is a black hole?",
  "How many planets are in our solar system?",
  "What is the ISS?",
];

function getAIResponse(question: string): string {
  const normalized = question
    .toLowerCase()
    .replace(/[?!.,]/g, "")
    .trim();
  for (const entry of SPACE_QA) {
    if (entry.keywords.some((kw) => normalized.includes(kw))) {
      return entry.answer;
    }
  }
  return FALLBACK;
}

const WELCOME: Message = {
  id: 0,
  role: "ai",
  text: "Hello! I'm Space AI, your guide to the cosmos. Ask me anything about space, planets, stars, missions, or anything beyond Earth!",
  timestamp: new Date(),
};

let msgCounter = 1;

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function sendMessage(text?: string) {
    const q = (text ?? input).trim();
    if (!q || isTyping) return;
    setInput("");

    const userMsg: Message = {
      id: msgCounter++,
      role: "user",
      text: q,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setTimeout(scrollToBottom, 60);

    setTimeout(
      () => {
        setMessages((prev) => [
          ...prev,
          {
            id: msgCounter++,
            role: "ai",
            text: getAIResponse(q),
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
        setTimeout(scrollToBottom, 80);
        setTimeout(() => inputRef.current?.focus(), 100);
      },
      800 + Math.random() * 400,
    );
  }

  function clearChat() {
    setMessages([{ ...WELCOME, timestamp: new Date() }]);
    setIsTyping(false);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <div
      data-ocid="ai_assistant.page"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-start justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            AI Assistant
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-2">
            Ask Space AI
          </h1>
          <p className="text-muted-foreground text-sm">
            Powered by AI trained on space knowledge
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearChat}
          className="shrink-0 mt-8 border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-smooth"
          data-ocid="ai_assistant.clear_button"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
          Clear Chat
        </Button>
      </motion.div>

      {/* Chat Window */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-card rounded-lg overflow-hidden flex flex-col flex-1"
        style={{ minHeight: "480px", maxHeight: "600px" }}
        data-ocid="ai_assistant.chat_panel"
      >
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.28,
                delay: i === messages.length - 1 ? 0.05 : 0,
              }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              data-ocid={`ai_assistant.message_${msg.role}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 ${
                  msg.role === "ai"
                    ? "bg-primary/15 border border-primary/30"
                    : "bg-muted/50 border border-border/40"
                }`}
              >
                {msg.role === "ai" ? (
                  <Bot className="w-4 h-4 text-primary" strokeWidth={1.5} />
                ) : (
                  <User
                    className="w-4 h-4 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[78%] px-4 py-3 rounded-lg text-sm leading-relaxed ${
                  msg.role === "ai"
                    ? "border text-foreground"
                    : "text-foreground"
                }`}
                style={
                  msg.role === "ai"
                    ? {
                        background: "oklch(0.14 0.018 245 / 0.7)",
                        borderColor: "oklch(0.62 0.2 265 / 0.35)",
                        borderLeftWidth: "2px",
                      }
                    : {
                        background: "oklch(0.52 0.21 257 / 0.85)",
                        border: "1px solid oklch(0.65 0.22 257 / 0.4)",
                      }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3" data-ocid="ai_assistant.loading_state">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 bg-primary/15 border border-primary/30">
                <Bot className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </div>
              <div
                className="px-4 py-3 rounded-lg border flex items-center gap-1.5"
                style={{
                  background: "oklch(0.14 0.018 245 / 0.7)",
                  borderColor: "oklch(0.62 0.2 265 / 0.35)",
                  borderLeftWidth: "2px",
                }}
              >
                {[0, 150, 300].map((delay) => (
                  <motion.span
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: delay / 1000,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div
          className="border-t p-4"
          style={{ borderColor: "oklch(0.2 0.01 245 / 0.5)" }}
        >
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              placeholder="Ask your question about space..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex-1 bg-input/50 border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
              data-ocid="ai_assistant.message_input"
              disabled={isTyping}
              aria-label="Ask Space AI a question"
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth shrink-0"
              data-ocid="ai_assistant.send_button"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Suggested Questions */}
      <div className="mt-5" data-ocid="ai_assistant.suggestions_section">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Suggested Questions
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.map((q, i) => (
            <button
              key={q}
              type="button"
              onClick={() => sendMessage(q)}
              disabled={isTyping}
              className="text-xs px-3 py-1.5 rounded-sm border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/10 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "oklch(0.13 0.015 245 / 0.6)",
                borderColor: "oklch(0.2 0.01 245 / 0.4)",
              }}
              data-ocid={`ai_assistant.suggestion.${i + 1}`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-6">
        Powered by AI trained on space knowledge · Answers are educational and
        may not reflect the latest discoveries.
      </p>
    </div>
  );
}
