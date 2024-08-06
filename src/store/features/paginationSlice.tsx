import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PaginationState {
  currentPage: string;
  lastPage: number | null;
}

const initialState: PaginationState = {
  currentPage: "1",
  lastPage: null,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
    setLastPage(state, action: PayloadAction<number | null>) {
      state.lastPage = action.payload;
    },
  },
});
export const { setCurrentPage, setLastPage } = paginationSlice.actions;
export default paginationSlice.reducer;
