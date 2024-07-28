import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import "immer";

import { Character, Info } from "../../types/types";

// API with RTK Query
export const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { info: Info; results: Character[] },
      { name: string; page: string }
    >({
      // query: ({ name, page }) => `character/?page=${page}&name=${name}`,
      query: ({ name, page }) => ({
        url: `character/`,
        params: {
          page: page,
          name: name,
        },
      }),
    }),
    getCharacterById: builder.query<Character, string>({
      query: (id) => `character/${id}`,
    }),
  }),
});

// export const useGetCharactersQuery = characterApi.endpoints.getCharacters.useQuery;
// export const useGetCharacterByIdQuery = characterApi.endpoints.getCharacterById.useQuery;

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = characterApi;
