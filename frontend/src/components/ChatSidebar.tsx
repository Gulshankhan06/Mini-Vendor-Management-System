import React from "react";

interface Props {
  chats: any[];
  activeChat: any;
  setActiveChat: (chat: any) => void;
  darkMode: boolean;
}

function ChatSidebar({
  chats,
  activeChat,
  setActiveChat,
  darkMode,
}: Props) {
  return (
    <div
      className={`h-full overflow-y-auto ${
        darkMode
          ? "bg-[#0F172A] border-r border-white/10"
          : "bg-white border-r"
      }`}
    >
      <div className="p-5">
        <h2
          className={`font-bold text-xl ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Chats
        </h2>
      </div>

      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setActiveChat(chat)}
          className={`cursor-pointer px-5 py-4 border-b transition ${
            activeChat?.roomId === chat.roomId
              ? "bg-purple-500 text-white"
              : darkMode
              ? "border-white/5 text-gray-300 hover:bg-white/5"
              : "hover:bg-gray-100"
          }`}
        >
          <h3 className="font-semibold">
            {chat.vendorName}
          </h3>

          <p className="text-sm truncate">
            {chat.lastMessage}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ChatSidebar;