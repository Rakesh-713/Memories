import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../service/index.js";
import axios from "axios";

export const signin = createAsyncThunk("/signin", async (formData) => {
  try {
    const { data } = await api.signIn(formData);
    // const { data } = await axios.post("http://localhost:5000/posts", formData);
    // localStorage.setItem("Profile", JSON.stringify({ ...data }));
    console.log("dataa", data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const signup = createAsyncThunk("/signup", async (formData) => {
  try {
    const { data } = await api.signUp(formData);
    //   const { data } = await axios.post(
    //     "http://localhost:5000/posts",
    //     formData
    //   );
    return data;
  } catch (error) {
    console.log(error);
  }
});
