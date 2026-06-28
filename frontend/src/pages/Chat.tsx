import { useEffect, useState } from "react";
import { socket } from "../socket";
import API from "../api/axios";

interface Message {
  senderId: string;
  senderName: string;
  message: string;
  roomId: string;
}

const AdminChat = () => {
  const [vendors] = useState([
    { id: "vendor1", name: "Vendor 1" },
    { id: "vendor2", name: "Vendor 2" },
  ]);

  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const adminId = "admin1";

  // ================= SOCKET LISTEN =================
  useEffect(() => {
    socket.on("receive-message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  
 // ================= JOIN ROOM =================
useEffect(() => {
  if (!selectedVendor) return;

  const roomId = `admin_${selectedVendor.id}`;

  socket.emit("join-room", roomId);

  API.get(`/chat/${roomId}`).then((res: any) => {
    console.log("Full Response:", res);
    console.log("res.data:", res.data);

    if (Array.isArray(res.data)) {
      setMessages(res.data);
    } else {
      setMessages(res.data.data || []);
    }
  });

}, [selectedVendor]); // <-- YE LINE MISSING THI

// ================= SEND MESSAGE =================
const sendMessage = () => {
  if (!text || !selectedVendor) return;

  const roomId = `admin_${selectedVendor.id}`;

  socket.emit("send-message", {
    senderId: adminId,
    senderName: "Admin",
    receiverId: selectedVendor.id,
    receiverName: selectedVendor.name,
    roomId,
    message: text,
  });

  setText("");
};

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#070B14] flex">
      {/* LEFT SIDE - VENDORS */}
    <div className="w-72 bg-white dark:bg-white/5 border-r border-gray-200 dark:border-white/10 backdrop-blur-xl p-6">
        <h3>Vendors</h3>

        {vendors.map((v) => (
        <div
  key={v.id}
  onClick={() => setSelectedVendor(v)}
  className={`cursor-pointer p-4 rounded-2xl mb-3 transition-all
  ${
    selectedVendor?.id === v.id
      ? "bg-purple-500 text-white"
      : "bg-white dark:bg-white/5 text-gray-800 dark:text-white hover:bg-purple-100 dark:hover:bg-white/10"
  }`}
> 
            {v.name}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - CHAT */}
      <div className="flex-1 flex flex-col p-8 bg-gray-100 dark:bg-[#070B14]">
        {selectedVendor ? (
          <>
            <h3>Chat with {selectedVendor.name}</h3>

     <div className="flex-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 overflow-y-auto shadow-xl">         
       {messages.map((msg, i) => (
  <div
    key={i}
    className={`flex mb-3 ${
      msg.senderId === adminId
        ? "justify-end"
        : "justify-start"
    }`}
  >
    <div
      className={`px-4 py-3 rounded-2xl max-w-[70%] break-words shadow-md ${
        msg.senderId === adminId
          ? "bg-purple-500 text-white"
          : "bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10"
      }`}
    >
      {msg.message}
    </div>
  </div>
))}    
            </div>
<div className="flex items-center gap-3 mt-5">
         <input
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Type a message..."
  className="flex-1 px-5 py-3 rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
/>     
           <button
  onClick={sendMessage}
  className="px-6 py-3 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-semibold transition"
>
  Send
</button>
            </div>
          </>
        ) : (
<div className="flex flex-1 items-center justify-center text-gray-500 dark:text-gray-400 text-xl font-semibold">
  Select a vendor to start chatting
</div>        )}
      </div>
    </div>
  );
};

export default AdminChat;

// ================= STYLES =================
const styles: any = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
  },

  sidebar: {
    width: "25%",
    borderRight: "1px solid #ccc",
    padding: "10px",
  },

  vendor: {
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "5px",
  },

  chatBox: {
    width: "75%",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  },

  messages: {
    flex: 1,
    overflowY: "auto",
    border: "1px solid #eee",
    padding: "10px",
    marginBottom: "10px",
  },

  msg: {
    marginBottom: "8px",
  },

  inputBox: {
    display: "flex",
  },

  input: {
    flex: 1,
    padding: "10px",
  },

  btn: {
    padding: "10px",
  },
};