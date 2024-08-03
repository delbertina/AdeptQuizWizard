import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewQuiz, Quiz } from "../types/quiz";
import { Quizzes } from "../data/quizzes";

export interface InitialQuizStateType {
  quizzes: Quiz[];
  nextIndex: number;
  current: Quiz;
}

const initialState: InitialQuizStateType = {
  quizzes: Quizzes,
  nextIndex: Math.max(...Quizzes.map((quiz) => quiz.id)) + 1,
  current: NewQuiz,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  selectors: {
    selectQuizzes: (state): Quiz[] => state.quizzes,
    selectCurrentQuiz: (state): Quiz => state.current,
  },
  reducers: {
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      if (action.payload.id === 0) {
        // if the id is 0, it's a new quiz
        action.payload.id = state.nextIndex;
        state.nextIndex++;
      }
      state.quizzes = [...state.quizzes, action.payload];
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = [
        ...state.quizzes.filter((quiz) => quiz.id !== action.payload.id),
        action.payload,
      ];
    },
    removeQuiz: (state, action: PayloadAction<number>) => {
      state.quizzes = [
        ...state.quizzes.filter((quiz) => quiz.id !== action.payload),
      ];
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz>) => {
      state.current = action.payload;
    },
  },
});

export const { selectCurrentQuiz, selectQuizzes } = quizSlice.selectors;
export const { addQuiz, updateQuiz, removeQuiz, setCurrentQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
