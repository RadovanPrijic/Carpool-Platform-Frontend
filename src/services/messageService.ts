import { ErrorResponse } from "react-router";
import {
  Message,
  MessageCreateDTO,
  MessageUpdateDTO,
} from "../features/messages/types";
import { API_ROUTES, CreatedAtResponse } from "../utils/apiConfig";
import { getAuthToken } from "../utils/auth";
import {
  isCreatedAtResponse,
  isErrorResponse,
  isMessage,
  isMessageList,
} from "../utils/typeGuards";

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
          Authorization: `Bearer ${getAuthToken}`,
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
        Authorization: `Bearer ${getAuthToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageCreateDTO),
    });

    const result: CreatedAtResponse<Message> | ErrorResponse =
      await response.json();

    if (isCreatedAtResponse<Message>(result, isMessage)) {
      console.log("Your message has been successfully sent.");
      console.log(result.createdResource);
      return result.createdResource;
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

export async function updateMessage(
  id: number,
  messageUpdateDTO: MessageUpdateDTO
): Promise<Message> {
  try {
    const response = await fetch(`${API_ROUTES.MESSAGES}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAuthToken}`,
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
