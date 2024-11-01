import { configureStore } from "@reduxjs/toolkit";
import authStoreReducer from "./authStore";

const store = configureStore({
  reducer: { authStore: authStoreReducer },
});

export default store;
