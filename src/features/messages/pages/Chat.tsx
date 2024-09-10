import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./Chat.module.css";
import {
  getAllConversationMessages,
  sendMessage,
} from "../../../services/message-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../../hooks/store-hooks";
import { queryClient } from "../../../utils/api-config";
import { MessageCreateDTO } from "../types";

const ChatPage = () => {
  const params = useParams();
  const userId = useAppSelector((state) => state.auth.userId);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const {
    data: conversationMessages,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["conversation-messages", userId, params.id],
    queryFn: () => getAllConversationMessages(userId, params.id!),
  });

  const { mutate } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation-messages", userId, params.id],
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);

  const dispatchMessage = () => {
    if (!newMessage.trim()) return;
    const messageCreateDTO: MessageCreateDTO = {
      content: newMessage,
      senderId: userId,
      receiverId: params.id!,
    };
    mutate(messageCreateDTO);
    setNewMessage("");
  };

  let content;

  if (isLoading) {
    content = <p>Loading rides ...</p>;
  }

  if (error) {
    content = <p>Error! {error.message}</p>;
  }

  if (conversationMessages) {
    content = (
      <div className={classes["chat-container"]}>
        <div className={classes["chat-history"]}>
          {conversationMessages.map((message) => (
            <div
              key={message.id}
              className={
                classes[
                  `message ${
                    message.sender.id === "currentUserId" ? "sent" : "received"
                  }`
                ]
              }
            >
              <p>{message.content}</p>
              <div>
                <b>Edit |</b>
                <b> Delete</b>
              </div>
              <span className={classes["timestamp"]}>
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))}
          <div ref={chatEndRef}></div>{" "}
          {/* Scroll to this div when new messages are added */}
        </div>
        <div className={classes["chat-input-container"]}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={classes["chat-input"]}
            placeholder="Type your message..."
          />
          <button onClick={dispatchMessage} className={classes["send-button"]}>
            Send
          </button>
        </div>
      </div>
    );
  }

  return (
    <section>
      <header>
        <h2>Messages</h2>
      </header>
      {content}
    </section>
  );
};

export default ChatPage;
