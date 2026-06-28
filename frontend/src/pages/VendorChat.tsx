import { useEffect, useState } from "react";
import { socket } from "../socket";
import API from "../api/axios";

interface Message {
  senderId: string;
  senderName: string;
  message: string;
}
interface VendorChatProps {
  darkMode: boolean;
}

const VendorChat = ({ darkMode }: VendorChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const vendorId = "vendor1";
  const roomId = `admin_${vendorId}`;

  // ================= SOCKET =================
  useEffect(() => {
  socket.emit("join-room", roomId);

  API.get(`/chat/${roomId}`)
    .then((res: any) => {
      console.log("Vendor Full Response:", res);
      console.log("Vendor Response Data:", res.data);

      if (Array.isArray(res.data)) {
        setMessages(res.data);
      } else {
        setMessages(res.data?.data || []);
      }
    })
    .catch((err) => {
      console.error("Vendor Chat Error:", err);
      setMessages([]);
    });

  socket.on("receive-message", (data: Message) => {
    setMessages((prev) => [...prev, data]);
  });

  return () => {
    socket.off("receive-message");
  };
}, []);
  // ================= SEND MESSAGE =================
  const sendMessage = () => {
    if (!text) return;

    socket.emit("send-message", {
      senderId: vendorId,
      senderName: "Vendor",
      receiverId: "admin1",
      receiverName: "Admin",
      roomId,
      message: text,
    });

    setText("");
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
 <div className="h-screen overflow-hidden bg-gray-100 dark:bg-[#070B14] flex items-center justify-center p-6">

  <div className="w-full max-w-4xl h-[90vh] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl shadow-xl overflow-hidden flex flex-col">


  <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
      Vendor Chat
    </h2>
  </div>
<div className="h-[500px] overflow-y-auto p-6">
  {messages.map((msg, i) => (
    <div
      key={i}
      className={`flex mb-4 ${
        msg.senderId === vendorId
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-3 rounded-2xl max-w-[70%] break-words shadow-md ${
          msg.senderId === vendorId
            ? "bg-purple-500 text-white"
            : "bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white"
        }`}
      >
        {msg.message}
      </div>
    </div>
  ))}
</div>

<div className="flex items-center gap-3 border-t border-gray-200 dark:border-white/10 p-5">
  <input
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Type a message..."
    className="flex-1 px-5 py-3 rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
  />

  <button
    onClick={sendMessage}
    className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-semibold transition"
  >
    Send
  </button>
</div>
  
      </div>
    </div>
    </div>
  );
};

export default VendorChat;
