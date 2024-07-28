// Use throughout the application instead of the usual `useDispatch` and `useSelector`
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./Store";
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// import { useDispatch } from 'react-redux';
// import type { AppDispatch } from './Store';
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
