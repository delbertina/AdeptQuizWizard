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
      // always treat add as a brand new quiz
      action.payload.id = state.nextIndex;
      state.nextIndex++;
      state.quizzes = [action.payload, ...state.quizzes];
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = [
        action.payload,
        ...state.quizzes.filter((quiz) => quiz.id !== action.payload.id),
      ];
    },
    // removeQuiz: (state, action: PayloadAction<number>) => {
    //   state.quizzes = [
    //     ...state.quizzes.filter((quiz) => quiz.id !== action.payload),
    //   ];
    // },
    setCurrentQuiz: (state, action: PayloadAction<Quiz>) => {
      state.current = action.payload;
    },
  },
});

export const { selectCurrentQuiz, selectQuizzes } = quizSlice.selectors;
export const { addQuiz, updateQuiz, setCurrentQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
