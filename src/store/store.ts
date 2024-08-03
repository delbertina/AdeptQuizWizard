import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quiz from "./quizSlice";
import score from "./scoreSlice";
import dialog from "./dialogSlice";

export const store = configureStore({
  reducer: combineReducers({ quiz, score, dialog }),
});
