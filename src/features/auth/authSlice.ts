import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PublicUser, Session } from "../../types/api";

interface AuthState {
  accessToken: string | null;
  user: PublicUser | null;
  initialized: boolean;
}

const initialState: AuthState = { accessToken: null, user: null, initialized: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionReceived(state, action: PayloadAction<Session>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.initialized = true;
    },
    sessionCleared(state) {
      state.accessToken = null;
      state.user = null;
      state.initialized = true;
    },
    sessionInitialized(state) {
      state.initialized = true;
    },
  },
});

export const { sessionReceived, sessionCleared, sessionInitialized } = authSlice.actions;
export default authSlice.reducer;
