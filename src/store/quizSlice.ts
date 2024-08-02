import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "../types/quiz";

export interface InitialQuizStateType {
  quizzes: Quiz[];
  nextIndex: number;
}

const initialState: InitialQuizStateType = {
  quizzes: [],
  nextIndex: 1,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Quiz>) => {
      if (action.payload.id === 0) {
        // if the id is 0, it's a new quiz
        action.payload.id = state.nextIndex;
        state.nextIndex++;
      }
      state.quizzes = [...state.quizzes, action.payload];
    },
    update: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = [
        ...state.quizzes.filter((quiz) => quiz.id !== action.payload.id),
        action.payload,
      ];
    },
    delete: (state, action: PayloadAction<number>) => {
      state.quizzes = [
        ...state.quizzes.filter((quiz) => quiz.id !== action.payload),
      ];
    },
  },
});

export const { add } = quizSlice.actions;
export default quizSlice.reducer;
