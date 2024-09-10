import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import classes from "./Inbox.module.css";
import { Conversation } from "../types";
import { getAllConversationsForUser } from "../../../services/message-service";
import { queryClient } from "../../../utils/api-config";

const InboxPage = () => {
  const conversations = useLoaderData() as Conversation[];
  const navigate = useNavigate();
  console.log(conversations);

  const openChat = (otherUserId: string) => {
    navigate(`/user/messages/chat/${otherUserId}`);
  };

  return (
    <div className={classes["inbox-container"]}>
      <h1>Inbox</h1>
      <ul className={classes["chat-list"]}>
        {conversations.map((conversation) => (
          <li
            key={conversation.user.id}
            className={classes["chat-item"]}
            onClick={() => openChat(conversation.user.id)}
          >
            <h2 className={classes["chat-user"]}>
              {conversation.user.firstName} {conversation.user.lastName}
            </h2>
            <p className={classes["chat-last-message"]}>
              {conversation.lastMessage.content}
            </p>
            {conversation.unreadMessagesCount > 0 && (
              <span className={classes["chat-unread-count"]}>
                {conversation.unreadMessagesCount} unread
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Error("User ID is required.");
  }
  return queryClient.fetchQuery<Conversation[]>({
    queryKey: ["inbox", params.id],
    queryFn: () => getAllConversationsForUser(params.id!),
  });
}

export default InboxPage;
