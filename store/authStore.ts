import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface authStoreState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
}

const initialState: authStoreState = {
  isAuthenticated: false,
  token: null,
  userId: null,
};

const authStoreSlice = createSlice({
  name: "authStore",
  initialState,
  reducers: {
    signIn(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      AsyncStorage.setItem("token", action.payload.token);
      AsyncStorage.setItem("userId", action.payload.userId);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("userId");
    },
  },
});

export const authStoreActions = authStoreSlice.actions;
export default authStoreSlice.reducer;
