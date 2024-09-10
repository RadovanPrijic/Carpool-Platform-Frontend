import { ErrorResponse } from "react-router";
import {
  Conversation,
  Message,
  MessageCreateDTO,
  MessageUpdateDTO,
} from "../features/messages/types";
import { API_ROUTES } from "../utils/api-config";
import { getAuthToken } from "../utils/auth";
import {
  isConversationList,
  isErrorResponse,
  isMessage,
  isMessageList,
} from "../utils/type-guards";

export async function getAllConversationsForUser(
  userId: string
): Promise<Conversation[]> {
  try {
    const response = await fetch(`${API_ROUTES.MESSAGES}/inbox/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });

    const result: Conversation[] | ErrorResponse = await response.json();
    console.log(result);

    if (isConversationList(result)) {
      console.log("Conversations fetched successfully.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

export async function getAllConversationMessages(
  userOne: string,
  userTwo: string
): Promise<Message[]> {
  try {
    const response = await fetch(
      `${API_ROUTES.MESSAGES}/?userOne=${userOne}&userTwo=${userTwo}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result: Message[] | ErrorResponse = await response.json();
    console.log(result);

    if (isMessageList(result)) {
      console.log("Conversation messages fetched successfully.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

export async function sendMessage(
  messageCreateDTO: MessageCreateDTO
): Promise<Message> {
  try {
    const response = await fetch(`${API_ROUTES.MESSAGES}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageCreateDTO),
    });

    const result: Message | ErrorResponse = await response.json();

    if (isMessage(result)) {
      console.log("Your message has been successfully sent.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

interface UpdateMessageArgs {
  id: number;
  messageUpdateDTO: MessageUpdateDTO;
}

export async function updateMessage({
  id,
  messageUpdateDTO,
}: UpdateMessageArgs): Promise<Message> {
  try {
    const response = await fetch(`${API_ROUTES.MESSAGES}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageUpdateDTO),
    });

    const result: Message | ErrorResponse = await response.json();
    console.log(result);

    if (isMessage(result)) {
      console.log("Your message has been successfully updated.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}

interface MarkConversationMessagesAsReadArgs {
  userId: string;
  otherUserId: string;
}

export async function markConversationMessagesAsRead({
  userId,
  otherUserId,
}: MarkConversationMessagesAsReadArgs): Promise<Message[]> {
  try {
    const response = await fetch(
      `${API_ROUTES.MESSAGES}/chat?userId=${userId}&otherUserId=${otherUserId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result: Message[] | ErrorResponse = await response.json();
    console.log(result);

    if (isMessageList(result)) {
      console.log("Your messages have been successfully marked as read.");
      return result;
    }

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}
