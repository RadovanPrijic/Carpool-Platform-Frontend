import { ErrorResponse } from "react-router";
import {
  Review,
  ReviewCreateDTO,
  ReviewUpdateDTO,
} from "../features/reviews/types";
import { API_ROUTES } from "../utils/api-config";
import { isErrorResponse, isReview, isReviewList } from "../utils/type-guards";
import { getAuthToken } from "../utils/auth";

export async function getReviewsForUser(
  id: string,
  given: boolean
): Promise<Review[]> {
  try {
    const response = await fetch(
      `${API_ROUTES.REVIEWS}/${given ? "given" : "received"}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result: Review[] | ErrorResponse = await response.json();
    console.log(result);

    if (isReviewList(result)) {
      console.log(
        `${given ? "Given" : "Received"} reviews fetched successfully.`
      );
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

export async function getReviewById(id: number): Promise<Review> {
  try {
    const response = await fetch(`${API_ROUTES.REVIEWS}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: Review | ErrorResponse = await response.json();

    if (isReview(result)) {
      console.log("Review fetched successfully.");
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

export async function createReview(
  reviewCreateDTO: ReviewCreateDTO
): Promise<Review> {
  try {
    const response = await fetch(`${API_ROUTES.REVIEWS}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewCreateDTO),
    });

    const result: Review | ErrorResponse = await response.json();

    if (isReview(result)) {
      console.log("Your review has been successfully created.");
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

interface UpdateReviewArgs {
  id: number;
  reviewUpdateDTO: ReviewUpdateDTO;
}

export async function updateReview({
  id,
  reviewUpdateDTO,
}: UpdateReviewArgs): Promise<Review> {
  try {
    const response = await fetch(`${API_ROUTES.REVIEWS}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewUpdateDTO),
    });

    const result: Review | ErrorResponse = await response.json();
    console.log(result);

    if (isReview(result)) {
      console.log("Your review has been successfully updated.");
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

export async function deleteReview(id: number): Promise<string> {
  try {
    const response = await fetch(`${API_ROUTES.REVIEWS}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (response.status === 204) {
      return "Your review has been successfully deleted.";
    }

    const result: ErrorResponse = await response.json();

    if (isErrorResponse(result)) {
      throw new Error(result.message);
    }

    throw new Error("Unexpected response format.");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("An unexpected error has occured.");
  }
}
