import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DIALOG_NAME } from "../types/dialog";

export interface InitialDialogStateType {
  open: DIALOG_NAME | null;
}

const initialState: InitialDialogStateType = {
  open: null,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  selectors: {
    selectDialog: (state): DIALOG_NAME | null => state.open,
  },
  reducers: {
    setDialog: (state, action: PayloadAction<DIALOG_NAME | null>) => {
      console.log(state.open, action.payload);
      state.open = action.payload;
    },
  },
});

export const { selectDialog } = dialogSlice.selectors;
export const { setDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
