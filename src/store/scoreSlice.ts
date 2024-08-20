import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Score } from "../types/score";
import { Scores } from "../data/scores";

export interface InitialScoreStateType {
  scores: Score[];
  nextIndex: number;
}

const initialState: InitialScoreStateType = {
  scores: Scores,
  nextIndex: 1,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState: initialState,
  selectors: {
    selectScores: (state): Score[] => state.scores,
  },
  reducers: {
    addScore: (state, action: PayloadAction<Score>) => {
      // always treat add as a brand new score
      action.payload.id = state.nextIndex;
      state.nextIndex++;
      state.scores = [...state.scores, action.payload];
    },
    // updateScore: (state, action: PayloadAction<Score>) => {
    //   state.scores = [
    //     ...state.scores.filter((score) => score.id !== action.payload.id),
    //     action.payload,
    //   ];
    // },
    // removeScore: (state, action: PayloadAction<number>) => {
    //   state.scores = [
    //     ...state.scores.filter((score) => score.id !== action.payload),
    //   ];
    // },
  },
});

export const { selectScores } = scoreSlice.selectors;
export const { addScore } = scoreSlice.actions;
export default scoreSlice.reducer;
