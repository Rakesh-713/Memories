import { createSlice } from "@reduxjs/toolkit";
import { StatusCode } from "../utils/StatusCode";
import { signin, signup } from "./authActions";

const initialState = {
  authData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(signin.fulfilled, (state, action) => {
        console.log(action?.payload, "payload");
        localStorage.setItem("Profile", JSON.stringify({ ...action?.payload }));
        state.authData = action?.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      })
      .addCase(signup.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log(action?.payload, "payload");
        localStorage.setItem("Profile", JSON.stringify({ ...action?.payload }));
        state.authData = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      })
      .addCase(StatusCode.LOGOUT, (state, action) => {
        localStorage.clear();
      });
  },
});

export default authSlice.reducer;
