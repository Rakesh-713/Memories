import { createSlice } from "@reduxjs/toolkit";
import { StatusCode } from "../utils/StatusCode";
import {
  getPost,
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
  likePosts,
  getPostsBySearch,
  commentPost,
} from "./postsActions";

let initialState = {
  posts: [],
  post: null,
  currentPage: 1,
  numberOfPages: 1,
  status: StatusCode.IDLE,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        // debugger;
        state.status = StatusCode.IDLE;
        state.posts = [...action.payload.data];
        console.log(state.posts, "posts");
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      })
      .addCase(getPost.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        // debugger;
        state.status = StatusCode.IDLE;
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      })
      .addCase(getPostsBySearch.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        // debugger;
        state.status = StatusCode.IDLE;
        state.posts = [...action.payload];
      })
      .addCase(getPostsBySearch.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      })
      .addCase(createPosts.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(createPosts.fulfilled, (state, action) => {
        state.status = StatusCode.IDLE;
        console.log(action.payload, "payloadddd");
        state.posts = action.payload;
      })
      .addCase(createPosts.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      })
      .addCase(updatePosts.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(updatePosts.fulfilled, (state, action) => {
        state.status = StatusCode.IDLE;

        state.posts = initialState.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        // state.posts = action.payload;
      })
      .addCase(updatePosts.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      })
      .addCase(deletePosts.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.status = StatusCode.IDLE;

        state.posts = initialState.posts.filter(
          (post) => post._id !== action.payload
        );
        // state.posts = action.payload;
      })
      .addCase(deletePosts.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      })
      .addCase(likePosts.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(likePosts.fulfilled, (state, action) => {
        state.status = StatusCode.IDLE;

        state.posts = initialState.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        // state.posts = action.payload;
      })
      .addCase(likePosts.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      })
      .addCase(commentPost.pending, (state, action) => {
        state.status = StatusCode.LOADING;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.status = StatusCode.IDLE;

        state.posts = initialState.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        // state.posts = action.payload;
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.status = StatusCode.ERROR;
      });
  },
});

export default postsSlice.reducer;
