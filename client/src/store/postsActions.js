import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../service/index.js";

export const getPost = createAsyncThunk("/:id", async (id) => {
  try {
    debugger;
    // const { data } = await axios.get("http://localhost:5000/posts");
    const response = await api.fetchPost(id);
    console.log(response, "getresponse");
    if (response?.data) {
      const { data } = response;
      console.log(data, "fetchdata");

      // const result = data.json();
      // console.log(result, "result");
      return data;
    }
    // return result;
  } catch (error) {
    console.log(error);
  }
});

export const getPosts = createAsyncThunk("/", async (page) => {
  try {
    // const { data } = await axios.get("http://localhost:5000/posts");
    const response = await api.fetchPosts(page);
    console.log(response, "getresponse");
    if (response?.data) {
      const { data } = response;
      console.log(data, "fetchdata");

      // const result = data.json();
      // console.log(result, "result");
      return data;
    }
    // return result;
  } catch (error) {
    console.log(error);
  }
});

export const getPostsBySearch = createAsyncThunk(
  "/search",
  async (searchQuery) => {
    try {
      debugger;
      const response = await api.getPostsBySearch(searchQuery);
      console.log(response.data, "searchQueryyy");
      if (response?.data) {
        const { data } = response.data;
        console.log(data, "fetchdata");

        // const result = data.json();
        // console.log(result, "result");
        return data;
      }
      console.log(response, "respomse");
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const createPosts = createAsyncThunk("/posts", async (post) => {
  try {
    debugger;
    // const { data } = await axios.post("http://localhost:5000/posts", post);
    const response = await api.createPost(post);
    // const { data } = await api.createPost(post);
    if (response?.data) {
      const { data } = response.data;

      // const result = data.json();
      // console.log(result, "result");
      return data;
      // return result;
    }
  } catch (error) {
    console.log(error);
  }
});

export const updatePosts = createAsyncThunk("/id", async ({ id, post }) => {
  try {
    // const { data } = await axios.patch(
    //   `http://localhost:5000/posts/${id}`,
    //   post
    // );
    debugger;
    const response = await api.updatePosts(id, post);
    if (response?.data) {
      const data = response.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
});

export const deletePosts = createAsyncThunk("/delete/id", async (id) => {
  try {
    // await axios.delete(`http://localhost:5000/posts/delete/${id}`);
    debugger;
    await api.deletePosts(id);
    console.log("Delete");
  } catch (error) {
    console.log(error);
  }
});

export const likePosts = createAsyncThunk("/id/like", async (id) => {
  const user = JSON.parse(localStorage.getItem("Profile"));

  try {
    // const { data } = await axios.patch(
    //   `http://localhost:5000/posts/${id}/like`,
    //   user?.token
    // );
    const response = await api.likePosts(id, user?.token);
    // const result = data.json();
    if (response?.data) {
      const { data } = response.data;
      console.log(data, "fetchdata");

      // const result = data.json();
      // console.log(result, "result");
      return data;
    }
  } catch (error) {
    console.log(error);
  }
});

export const commentPost = createAsyncThunk(
  "/id/comment",
  async ({ value, id }) => {
    try {
      debugger;
      const { data } = await api.comment(value, id);
      console.log(data, "data");
      return data.comments;
    } catch (error) {
      console.log(error.message);
    }
  }
);
