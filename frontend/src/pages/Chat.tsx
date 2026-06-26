import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";

import api from "../api/axios";
import { getMessages, sendMessage } from "../services/chatApi";
import { socket } from "../socket";

interface Props {
  darkMode: boolean;
}

function Chat({ darkMode }: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const adminId = "admin";

  // ⚡ example: single vendor chat room (replace dynamically later if needed)
  const vendorId = localStorage.getItem("chatVendorId") || "demoVendor";
  const roomId = `admin_${vendorId}`;

  // ================= LOAD MESSAGES =================
  useEffect(()=>{

    const load = async()=>{

        const res = await getMessages(roomId);

        setMessages(res.data);

    }

    load();

},[roomId]);

  // ================= JOIN ROOM =================
  useEffect(() => {
    socket.emit("join-room", roomId);
  }, [roomId]);

  // ================= RECEIVE MESSAGE =================
  useEffect(() => {
    const handler = (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive-message", handler);

    return () => {
      socket.off("receive-message", handler);
    };
  }, []);

  // ================= SEND MESSAGE =================
  const handleSend = async () => {
    if (!message.trim()) return;

    const msgData = {
      senderId: adminId,
      receiverId: vendorId,
      roomId,
      message,
    };

  
   

    setMessage("");
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        darkMode ? "bg-[#070B14] text-white" : "bg-gray-50"
      }`}
    >
      {/* HEADER */}
      <div className="h-14 flex items-center px-4 font-bold border-b">
        Chat Window
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={msg._id || i}
            className={`mb-2 flex ${
              msg.senderId === adminId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs ${
                msg.senderId === adminId
                  ? "bg-purple-500 text-white"
                  : darkMode
                  ? "bg-white/10 text-white"
                  : "bg-white border"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div
        className={`p-3 border-t flex gap-2 ${
          darkMode ? "bg-[#0F172A] border-white/10" : "bg-white"
        }`}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-xl px-3 h-10 outline-none"
          placeholder="Type message..."
        />

        <button
          onClick={handleSend}
          className="w-10 h-10 bg-purple-500 text-white rounded-xl flex items-center justify-center"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

export default Chat;