import { useState } from "react";
import { X, Paperclip } from "lucide-react";

interface Message {
  date: string;
  text: string;
}
interface HistoryReport {
  id: number;
  doctor_id: number;
  patient_id: number;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

type ChatMessage = {
  role: "doctor" | "ai";
  text: string;
};

export default function ChatWithAIModal({
  open,
  onClose,
  reports,
  patientName,
}: {
  open: boolean;
  onClose: () => void;
  reports: HistoryReport[];
  patientName: string;
}) {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showReportSelector, setShowReportSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReportId(e.target.value);
    const report = reports.find((r) => r.id.toString() === e.target.value);
    if (report) {
      setInput(report.messages.map((m) => m.text).join("\n\n"));
      setShowReportSelector(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "doctor", text: input }
    ]);
    setInput("");
    setSelectedReportId(null);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://6ca7-34-16-217-217.ngrok-free.app/next-steps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ report: input }),
      });
      if (!res.ok) {
        throw new Error("AI API error");
      }
      const data = await res.json();
      const aiText = typeof data.next_steps === "string" ? data.next_steps : "";
      if (!aiText.trim()) {
        setError("No valid response received from the AI.");
      } else {
        const parts = aiText.split('---');
        const formatted = parts.length > 1 ? parts[parts.length - 1].trim() : aiText.trim();
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: formatted }
        ]);
      }
    } catch {
      setError("Sorry, there was an error contacting the AI. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => setError(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl min-h-[680px] flex flex-col relative p-0 animate-fadeIn">
        {/* Error Popup */}
        {error && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center">
              <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
              <div className="text-gray-700 mb-4 text-center">{error}</div>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                onClick={handleCloseError}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-primary transition p-2 rounded-full bg-white shadow"
          onClick={onClose}
          aria-label="Close chat"
        >
          <X className="w-6 h-6" />
        </button>
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-2xl font-bold text-primary mb-1">Chat with AI</h2>
          <div className="text-base text-gray-500 font-medium">Patient: <span className="text-gray-800 font-semibold">{patientName}</span></div>
        </div>
        {/* Chat Area */}
        <div className="flex-1 flex flex-col px-8 pb-4">
          <div className="flex-1 flex flex-col gap-2 max-h-[440px] min-h-[240px] overflow-y-auto rounded-2xl bg-gray-50 border border-gray-100 shadow-inner p-4 mb-4">
            {messages.length === 0 && (
              <div className="text-gray-400 text-center my-auto">No messages yet. Start the conversation!</div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "doctor" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[70%] break-words whitespace-pre-line shadow-sm text-base
                    ${msg.role === "doctor"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-gray-200 text-gray-800 rounded-bl-md border border-gray-100"}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl max-w-[70%] bg-gray-200 text-gray-400 rounded-bl-md border border-gray-100 animate-pulse">
                  (AI is typing...)
                </div>
              </div>
            )}
          </div>
          {/* Floating Report Selector */}
          {showReportSelector && (
            <div className="absolute left-1/2 bottom-32 -translate-x-1/2 z-50 w-[90%] max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col gap-2 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-primary">Select a report</span>
                <button
                  className="text-gray-400 hover:text-primary transition p-1 rounded-full"
                  onClick={() => setShowReportSelector(false)}
                  aria-label="Close report selector"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-white text-gray-800"
                value={selectedReportId || ""}
                onChange={handleSelect}
              >
                <option value="">-- Select report --</option>
                {reports
                  .slice()
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map((report) => (
                    <option key={report.id} value={report.id}>
                      {new Date(report.created_at).toLocaleString()}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
        {/* Footer/Input */}
        <div className="px-8 py-6 border-t flex items-center gap-3 rounded-b-3xl bg-white relative">
          <button
            className="p-2 rounded-full hover:bg-primary/10 transition text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setShowReportSelector((v) => !v)}
            aria-label="Select report"
            title="Select report"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            className="flex-1 h-20 p-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary focus:outline-none text-gray-800 bg-gray-50 shadow-inner placeholder-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message or select a report..."
          />
          <button
            className="py-2 px-6 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition text-lg shadow disabled:opacity-50"
            onClick={handleSend}
            disabled={!input.trim() || loading}
          >
            Send
          </button>
        </div>
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 