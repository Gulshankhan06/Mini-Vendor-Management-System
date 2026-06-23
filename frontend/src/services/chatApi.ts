import API from "../api/axios";

export const getChats = () => API.get("/chat");

export const getMessages = (roomId: string) =>
  API.get(`/chat/messages/${roomId}`);

export const sendMessage = (data: any) =>
  API.post("/chat/send", data);