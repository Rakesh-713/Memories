import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const fetchPost = async (id) => {
  debugger;
  const res = await API.get(`/posts/${id}`);
  console.log(res);
  return res;
};

export const fetchPosts = async (page) => {
  const res = await API.get(`/posts?page=${page}`);
  console.log(res);
  return res;
};

export const createPost = async (post) => {
  debugger;
  const res = await API.post("/posts/posts", post);
  console.log(res);
  return res;
};

export const getPostsBySearch = async (searchQuery) => {
  try {
    debugger;
    const res = await API.get(
      `/posts/search/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`
    );
    console.log("res", res);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePosts = async (id, post) => {
  debugger;
  // const data = id;
  // const post = data.post;
  // const res = setTimeout(() => {
  //   API.patch(`/posts/${id}`, post);
  // }, 2000);
  try {
    debugger;
    const res = await API.patch(`/posts/${id}`, post);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error; // Throw the error to be handled by the caller
  }
};

// export const updatePosts = async (id, post) => {
//   try {
//     const res = await axios.patch(`http://localhost:5000/posts/${id}`, post);
//     console.log(res);
//     return res;
//   } catch (error) {
//     throw error;
//   }
// };

export const likePosts = (id) => {
  const res = API.patch(`/posts/${id}/like`);
  console.log(res);
  return res;
};

export const deletePosts = (id) => {
  const { res } = API.delete(`/posts/delete/${id}`);
  console.log(res);
  return res;
};

export const comment = async ({ value, id }) => {
  debugger;
  const res = await API.post(`/posts/${id}/commentPost`, value);
  console.log(res, "res");
  return res;
};

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
