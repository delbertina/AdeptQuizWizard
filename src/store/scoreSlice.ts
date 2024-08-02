import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Score } from "../types/score";

export interface InitialScoreStateType {
  scores: Score[];
  nextIndex: number;
}

const initialState: InitialScoreStateType = {
  scores: [],
  nextIndex: 1,
};

export const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Score>) => {
      if (action.payload.id === 0) {
        // if the id is 0, it's a new score
        action.payload.id = state.nextIndex;
        state.nextIndex++;
      }
      state.scores = [...state.scores, action.payload];
    },
    update: (state, action: PayloadAction<Score>) => {
      state.scores = [
        ...state.scores.filter((score) => score.id !== action.payload.id),
        action.payload,
      ];
    },
    delete: (state, action: PayloadAction<number>) => {
      state.scores = [
        ...state.scores.filter((score) => score.id !== action.payload),
      ];
    },
  },
});

export const { add } = scoreSlice.actions;
export default scoreSlice.reducer;
