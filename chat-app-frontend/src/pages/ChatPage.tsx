import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Lottie from "react-lottie";
import typingAnimation from "../assets/typing.json";
import { FaPaperPlane, FaSmile } from "react-icons/fa";

const socket = io("http://localhost:3001");

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  roomId: string;
  createdAt: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [roomId, setRoomId] = useState<string | undefined>(undefined);
  const [typing, setTyping] = useState(false);
  const [typingUserName, setTypingUserName] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { id: receiverId, name: receiverName } = useParams<{ id: string; name: string }>();
  const token = localStorage.getItem("token");
  let userId: string | null = null;
  let userName: string | null = null;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    userId = decodedToken.userId;
    userName = decodedToken.userName;
  }

  const fetchMessages = async () => {
    if (receiverId && userId) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/messages/${userId}/${receiverId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  useEffect(() => {
    if (receiverId && userId) {
      const newRoomId = [userId, receiverId].sort().join("_");
      setRoomId(newRoomId);

      socket.emit("joinRoom", newRoomId);
      fetchMessages();
    }
  }, [receiverId, userId, token]);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage: Message) => {
      if (newMessage.roomId === roomId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToBottom();
      }
    });

    socket.on("typing", (typingUserId: string | null) => {
      if (typingUserId && typingUserId !== userId) {
        setTyping(true);
        setTypingUserName(receiverName || "User");
      } else {
        setTyping(false);
        setTypingUserName(null);
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
    };
  }, [roomId, receiverName, userId]);

  const sendMessage = () => {
    if (userId && receiverId && roomId && message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: message.trim(),
        senderId: userId,
        receiverId,
        roomId,
        createdAt: new Date().toISOString(),
      };

      socket.emit("sendMessage", newMessage);
      setMessage("");
      scrollToBottom();
    }
  };

  const handleTyping = (isTyping: boolean) => {
    socket.emit(isTyping ? "startTyping" : "stopTyping", roomId, userId);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: typingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#03045e] to-[#023e8a]">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] flex flex-col relative mt-[80px]">
          {/* Chat Header */}
          <div className="bg-[#03045e] p-4 rounded-t-lg">
            <h2 className="text-xl font-bold text-white">Chat with {receiverName}</h2>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.senderId === userId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="font-semibold">
                    {msg.senderId === userId ? "You" : receiverName}
                  </div>
                  <div>{msg.content}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start items-center">
                <Lottie options={defaultOptions} height={40} width={80} />
                <span className="text-sm text-gray-500 ml-2">
                  {typingUserName} is typing...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 right-0 z-10">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          {/* Message Input */}
          <div className="flex items-center p-2 bg-white/10 backdrop-blur-md rounded-lg mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => handleTyping(true)}
              onBlur={() => handleTyping(false)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="w-full p-2 bg-transparent text-white placeholder-white/70 focus:outline-none"
              placeholder={typing ? `${typingUserName} is typing...` : "Type a message..."}
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-white hover:text-blue-300 transition-colors"
            >
              <FaSmile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="p-2 text-white hover:text-blue-300 transition-colors"
            >
              <FaPaperPlane size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;