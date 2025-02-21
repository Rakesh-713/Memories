import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts, "posts");
  if (posts?.length < 0) return "No Posts";
  return (
    <Grid
      style={{
        display: "flex",
        alignItems: "center",
      }}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
          <Post
            style={{ textAlign: "center" }}
            post={post}
            setCurrentId={setCurrentId}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
