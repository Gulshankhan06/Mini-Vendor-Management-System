import API from "../api/axios";

export const getChats = () => {
  return API.get("/chat");
};

export const getMessages = (roomId: string) => {
  return API.get(`/chat/messages/${roomId}`);
};

export const sendMessage = (data: {
  senderId: string;
  receiverId: string;
  roomId: string;
  message: string;
}) => {
  return API.post("/chat/send", data);
};