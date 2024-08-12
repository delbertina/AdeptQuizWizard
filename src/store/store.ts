import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quiz from "./quizSlice";
import score from "./scoreSlice";
import dialog from "./dialogSlice";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({ quiz, score, dialog })

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()