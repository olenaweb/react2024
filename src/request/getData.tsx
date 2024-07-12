import { Response, SuccessResponse, ErrorResponse } from "../types/types";

interface FetchError extends Error {
  message: string;
}

export async function getData(searchValue: string, choosenPage: string): Promise<Response> {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${choosenPage}&name=${searchValue}`);
    const data = await response.json();
    console.log('"data="', data);
    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }
    return data as SuccessResponse;
  } catch (error) {
    if (error instanceof Error) {
      const fetchError: FetchError = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
      return { error: fetchError.message } as ErrorResponse;
    } else {
      return { error: "An unknown error occurred" } as ErrorResponse;
    }
  }
}
