import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface authStoreState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: authStoreState = {
  isAuthenticated: false,
  token: null,
};

const authStoreSlice = createSlice({
  name: "authStore",
  initialState,
  reducers: {
    signIn(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      AsyncStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      AsyncStorage.removeItem("token");
    },
  },
});

export const authStoreActions = authStoreSlice.actions;
export default authStoreSlice.reducer;
