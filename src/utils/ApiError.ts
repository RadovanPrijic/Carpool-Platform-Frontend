export interface ErrorResponse {
  message: string;
}

export function isError(response: any): response is Error {
  return (response as Error).message !== undefined;
}
