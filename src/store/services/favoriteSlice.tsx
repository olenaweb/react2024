import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteItem } from "types/types";

const LS_Favorite = "olena_favorite";

export interface FavoriteState {
  favorites: FavoriteItem[];
}

const initialState: FavoriteState = {
  favorites: JSON.parse(localStorage.getItem(LS_Favorite) ?? "[]"),
};

export const favoriteSlice = createSlice({
  name: "favoriteSlice",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteItem>) {
      const isThere = state.favorites.some((item) => item.id === action.payload.id);
      if (!isThere) {
        state.favorites.push(action.payload);
        localStorage.setItem(LS_Favorite, JSON.stringify(state.favorites));
      }
    },

    removeFavorite(state, action: PayloadAction<FavoriteItem>) {
      state.favorites = state.favorites.filter((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }
      });
      localStorage.setItem(LS_Favorite, JSON.stringify(state.favorites));
    },
  },
});

// export const githubActions = favoriteSlice.actions
export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
