import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { socket } from "../socket";
import { getMessages, sendMessage } from "../services/chatApi";

function VendorChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const vendorId = user._id;

  const roomId = `admin_${vendorId}`;

  // ================= JOIN ROOM =================
  useEffect(() => {
    socket.emit("join-room", roomId);
  }, [roomId]);

  // ================= LOAD MESSAGES =================
  useEffect(() => {
    const loadMessages = async () => {
      const res = await getMessages(roomId);
      setMessages(res.data);
    };

    loadMessages();
  }, [roomId]);

  // ================= RECEIVE MESSAGE =================
  useEffect(() => {
    const handler = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive-message", handler);

    // ✅ FIX: proper cleanup function (TS error fix)
    return () => {
      socket.off("receive-message", handler);
    };
  }, []);

  // ================= SEND MESSAGE =================
  const handleSend = async () => {
    if (!message.trim()) return;

    const msgData = {
      senderId: vendorId,
      receiverId: "admin",
      roomId,
      message,
    };

    

    setMessage("");
  };

  return (
    <div className="p-4">
      {/* CHAT BOX */}
      <div className="h-[80vh] overflow-y-auto border p-2">
        {messages.map((msg, i) => (
          <div
            key={msg._id || i}
            className={`p-2 flex ${
              msg.senderId === vendorId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <span
              className={`px-3 py-1 rounded max-w-xs ${
                msg.senderId === vendorId
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.message}
            </span>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="flex gap-2 mt-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border flex-1 p-2 rounded"
          placeholder="Type message..."
        />

        <button
          onClick={handleSend}
          className="bg-purple-500 text-white px-4 rounded"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default VendorChat;