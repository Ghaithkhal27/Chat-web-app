import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Navbar from "../components/Navbar";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Lottie from "react-lottie";
import typingAnimation from "../assets/typing.json";
import { FaPaperPlane, FaSmile } from "react-icons/fa";

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  roomId: string;
  createdAt: string;
}

const socket = io("http://localhost:3001");

const ChatPage: React.FC = () => {
  const { id: receiverId } = useParams<{ id: string }>();
  const location = useLocation();
  const { receiverName, profilePicture } = location.state || { receiverName: 'Unknown' };
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [roomId, setRoomId] = useState<string>();
  const [typing, setTyping] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const token = localStorage.getItem("token");
  const userId = token ? (jwtDecode(token) as { userId: string }).userId : null;

  const fetchMessages = useCallback(async () => {
    if (!receiverId || !userId) return;
    
    try {
      const response = await axios.get(
        `http://localhost:3001/api/messages/${userId}/${receiverId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [receiverId, userId, token]);

  const checkScrollPosition = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setIsAtBottom(scrollHeight - (scrollTop + clientHeight) < 50);
    }
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container && isAtBottom) scrollToBottom("auto");
  }, [messages, isAtBottom, scrollToBottom]);

  useEffect(() => {
    const container = chatContainerRef.current;
    container?.addEventListener('scroll', checkScrollPosition);
    return () => container?.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);

  useEffect(() => {
    if (!receiverId || !userId) return;

    const newRoomId = [userId, receiverId].sort().join("_");
    setRoomId(newRoomId);
    socket.emit("joinRoom", newRoomId);
    fetchMessages();
  }, [receiverId, userId, fetchMessages]);

  useEffect(() => {
    const handleReceiveMessage = (newMessage: Message) => {
      if (newMessage.roomId === roomId) {
        setMessages(prev => [...prev, newMessage]);
      }
    };

    const handleTyping = (typingUserId: string | null) => {
      if (typingUserId && typingUserId !== userId) {
        setTyping(true);
      } else {
        setTyping(false);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("typing", handleTyping);
    };
  }, [roomId, userId, receiverName]);

  const sendMessage = () => {
    if (!message.trim() || !userId || !receiverId || !roomId) return;

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
  };

  const handleTyping = (isTyping: boolean) => {
    socket.emit(isTyping ? "startTyping" : "stopTyping", roomId, userId);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prev => prev + emojiData.emoji);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: typingAnimation,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#03045e] to-[#023e8a]">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl w-full max-w-4xl h-[80vh] flex flex-col relative mt-20 overflow-hidden">
          <div className="bg-[#03045e] p-4 rounded-t-xl shadow-md flex items-center">
            {profilePicture && (
              <img
                src={profilePicture}
                alt={receiverName}
                className="w-10 h-10 rounded-full mr-3 border-2 border-white/50"
              />
            )}
            <h2 className="text-xl font-bold text-white">
              Chat with {receiverName}
            </h2>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar"
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-xs lg:max-w-md relative ${
                    msg.senderId === userId
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-800 shadow-lg"
                  } transition-transform duration-200 hover:scale-105`}
                >
                  <div className="text-base break-words">{msg.content}</div>
                  <div className="text-[10px] mt-1 opacity-70 italic">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className={`absolute top-3 w-2 h-2 rotate-45 ${
                    msg.senderId === userId 
                      ? "bg-blue-500 -right-1" 
                      : "bg-gray-100 -left-1"
                  }`} />
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start items-center animate-pulse">
                <Lottie 
                  options={defaultOptions} 
                  height={24} 
                  width={48}
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <span className="text-sm text-white/80 ml-2">
                  {receiverName} is typing...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showEmojiPicker && (
            <div className="absolute bottom-24 right-4 z-10 animate-slide-up">
              <EmojiPicker 
                onEmojiClick={onEmojiClick}
                skinTonesDisabled
                searchDisabled
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}

          <div className="flex items-center p-2 bg-white/20 backdrop-blur-md rounded-xl mt-4 shadow-lg border border-white/10">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-white hover:text-blue-400 transition-colors"
            >
              <FaSmile size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onFocus={() => handleTyping(true)}
              onBlur={() => handleTyping(false)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              className="w-full p-2 bg-transparent text-white placeholder-white/70 focus:outline-none rounded-lg transition-all"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="p-2 text-white hover:text-blue-400 transition-colors"
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