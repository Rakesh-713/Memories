import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    posts: postsSlice,
    auth: authSlice,
  },
});

export default store;
