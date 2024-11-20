import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  balance: 0, // Dastlabki balans qiymati
};

export const acountSlice = createSlice({
  // Kichik harf bilan boshlang
  name: "acount", // Slice nomi
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload; // deposit amali
    },
  },
});

export const { deposit } = acountSlice.actions; // Deposit action
export default acountSlice.reducer; // Reducerni eksport qilish
