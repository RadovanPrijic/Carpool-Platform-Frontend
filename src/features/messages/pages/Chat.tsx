import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./Chat.module.css";
import {
  getAllConversationMessages,
  markConversationMessagesAsRead,
  sendMessage,
  updateMessage,
} from "../../../services/message-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../../../hooks/store-hooks";
import { queryClient } from "../../../utils/api-config";
import { MessageCreateDTO } from "../types";
import Modal, { ModalHandle } from "../../../components/Modal";

const ChatPage = () => {
  const params = useParams();
  const userId = useAppSelector((state) => state.auth.userId);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messageEdit, setMessageEdit] = useState<string>("");
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const modalRef = useRef<ModalHandle>(null);
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

  const { mutate: update } = useMutation({
    mutationFn: updateMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation-messages", userId, params.id],
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: markConversationMessagesAsRead, // Service function to mark messages as read
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", userId], // Refetch the messages after marking them as read
      });
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

  useEffect(() => {
    if (
      conversationMessages &&
      conversationMessages.some((m) => !m.readStatus)
    ) {
      // Call the mutation to mark all messages as read
      markAsRead({ userId, otherUserId: params.id! });
    }
  }, [conversationMessages, markAsRead, userId, params.id]);

  const openModal = (messageId: number, currentContent: string) => {
    setEditingMessageId(messageId);
    setMessageEdit(currentContent);
    modalRef.current!.open();
  };

  const closeModal = () => {
    setEditingMessageId(null); // Close the modal and reset the message ID
    setMessageEdit(""); // Reset the input field
    modalRef.current!.close();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageEdit(event.target.value);
  };

  const handleUpdate = () => {
    if (editingMessageId !== null) {
      update({
        id: editingMessageId,
        messageUpdateDTO: { content: messageEdit },
      }); // Update the message by ID
      closeModal(); // Close the modal after updating
    }
  };

  // const handleRemove = (id: number) => {
  //   update({
  //     id,
  //     messageUpdateDTO: {
  //       content: "This message has been deleted by the user.",
  //     },
  //   });
  //   modalRef.current!.close();
  // };

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
                    message.sender.id === userId ? "sent" : "received"
                  }`
                ]
              }
            >
              <p>{message.content}</p>
              <div>
                {message.sender.id === userId && (
                  <>
                    <b onClick={() => openModal(message.id, message.content)}>
                      Edit |
                    </b>
                    <b> Delete</b>
                  </>
                )}

                <div>
                  <Modal
                    title="Message update"
                    ref={modalRef}
                    onCancel={closeModal}
                    onConfirm={() => handleUpdate()}
                  >
                    <label htmlFor="message">Content</label>
                    <textarea
                      id="message"
                      name="message"
                      value={messageEdit}
                      onChange={handleInputChange}
                      required
                    />
                  </Modal>
                </div>
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
