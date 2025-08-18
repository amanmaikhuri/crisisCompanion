import { LuDelete, LuSend } from "react-icons/lu";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

const CompanionAI = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello Aman! I am your AI Companion. How can I help you?" },
  ]);
  const [userMsg, setUserMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const chatRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // ------------------------------
  // Fetch Gemini response with length control
  // ------------------------------
  async function sendAiQuery(
    prompt,
    role = "You are a concise, empathetic mental health assistant and virtual psychiatrist. Keep responses short (max 500 ) and to the point, while still caring."
  ) {
    if (!apiKey) return "API key missing. Please set VITE_GEMINI_API_KEY.";

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `You are a ${role}. User says: ${prompt}` }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return `API error: ${error.error?.message || "Unknown error"}`;
      }

      const data = await response.json();
      let text =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No response";

      // ✂️ Hard cap on length to avoid flooding
      if (text.length > 1200) {
        text = text.slice(0, 1200) + "…";
      }
      return text;
    } catch (err) {
      console.error(err);
      return "Sorry, I couldn't process your request.";
    }
  }

  // ------------------------------
  // Handle send message
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = userMsg.trim();
    if (!text) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text }]);
    setUserMsg("");

    // Fetch AI response
    setIsTyping(true);
    const aiText = await sendAiQuery(text);

    // Typing animation
    let i = 0;
    const speed = 5; // ⚡ faster typing (5ms/char)
    let current = "";

    const interval = setInterval(() => {
      if (i < aiText.length) {
        current += aiText.charAt(i);
        i++;
        setMessages((prev) => {
          const newMsgs = [...prev];
          if (newMsgs[newMsgs.length - 1]?.role === "ai-typing") {
            newMsgs[newMsgs.length - 1].text = current;
          } else {
            newMsgs.push({ role: "ai-typing", text: current });
          }
          return newMsgs;
        });

        // Auto-scroll ONLY if user is NOT scrolling manually
        if (!isUserScrolling && chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsTyping(false);

        // Finalize AI message
        setMessages((prev) => {
          const newMsgs = [...prev];
          if (newMsgs[newMsgs.length - 1]?.role === "ai-typing") {
            newMsgs[newMsgs.length - 1].role = "ai";
          }
          return newMsgs;
        });
      }
    }, speed);
  };

  // ------------------------------
  // Track user scrolling
  // ------------------------------
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const handleScroll = () => {
      // if user scrolls up (not at bottom), lock auto-scroll
      const atBottom =
        Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 10;
      setIsUserScrolling(!atBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // ------------------------------
  // Clear chat
  // ------------------------------
  const clearChat = () => {
    setMessages([
      { role: "ai", text: "Chat cleared! How are you feeling right now?" },
    ]);
  };

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <>
      <Header />
      <div className="h-screen w-full max-w-[1080px] mx-auto px-2 py-1 flex flex-col">
        {/* Title + Clear */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl px-1.5">Companion AI</h1>
          <button
            onClick={clearChat}
            className="text-sm text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md"
          >
            <LuDelete size={20} />
          </button>
        </div>

        {/* Chat */}
        <div
          ref={chatRef}
          className="flex-1 p-1 mt-2 rounded-md flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`px-2 py-1.5 rounded-md max-w-[95%] md:max-w-[80%] text-sm md:text-lg break-words ${
                msg.role === "user"
                  ? "ml-auto bg-blue-500 text-white rounded-bl-2xl"
                  : "mr-auto bg-gray-400 text-black rounded-br-2xl"
              }`}
            >
              {msg.role.startsWith("ai") ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    code({ inline, children, ...props }) {
                      return inline ? (
                        <code className="px-1 rounded bg-black/10">{children}</code>
                      ) : (
                        <pre className="overflow-auto p-3 rounded-md border">
                          <code {...props}>{children}</code>
                        </pre>
                      );
                    },
                    li: ({ children }) => <li className="ml-5 list-disc">{children}</li>,
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              ) : (
                <div className="whitespace-pre-wrap">{msg.text}</div>
              )}
            </div>
          ))}
          {/* Typing indicator */}
          {isTyping && (
            <div className="mr-auto bg-gray-100 text-black rounded-br-2xl px-2 py-1 text-sm md:text-lg w-fit">
              <span className="opacity-70">AI is typing…</span>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="py-2 flex gap-2 items-center mb-13">
          <textarea
            id="user-msg"
            placeholder="Ask for help!"
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className="w-full h-18 border border-blue-500 rounded-md px-3 py-2 resize-none"
          />
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600 p-3 rounded-md flex items-center justify-center"
            aria-label="Send message"
          >
            <LuSend size={20} />
          </button>
        </form>
      </div>
    </>
  );
};

export default CompanionAI;
