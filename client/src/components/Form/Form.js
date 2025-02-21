import { Button, Paper, TextField, Typography } from "@mui/material";
import { createTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPosts, getPosts, updatePosts } from "../../store/postsActions";

const Form = ({ currentId, setCurrentId }) => {
  const theme = createTheme();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("Profile"));

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    name: "",
  });
  // const posts = useSelector(
  //   (state) =>
  //     // currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  //     state.posts.posts
  // );

  const post = useSelector(
    (state) =>
      currentId
        ? state.posts.posts.find((post) => post._id === currentId)
        : null
    // state.posts.posts
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  // useEffect(() => {
  //   if (currentId) {
  //     dispatch(getPosts());
  //     const post = posts.find((post) => post._id === currentId);
  //     setPostData(post);
  //   }
  // }, [currentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    console.log(postData, "postData");
    if (currentId == 0) {
      let postName = user?.result?.name;
      postData.name = postName ? postName : "";
      await dispatch(createPosts({ post: postData }));
      await dispatch(getPosts());
      clear();
    } else {
      await dispatch(updatePosts({ id: currentId, post: postData }));
      await dispatch(getPosts());
      console.log(currentId);
      console.log(postData, "PostData");
      clear();
    }
  };
  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper
        sx={{
          "& .MuiTextField-root": {
            margin: theme.spacing(1),
          },
          padding: "16px",
        }}
      >
        <Typography variant="h6" align="center">
          Please sign in to create Memories and like other's Memories
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper
      sx={{
        "& .MuiTextField-root": {
          margin: theme.spacing(1),
        },
        padding: "8px",
      }}
      elevation={6}
    >
      <form
        autoComplete="off"
        // noValidate
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          type="text"
          required
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          type="text"
          fullWidth
          multiline
          rows={3}
          required
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma seperated)"
          fullWidth
          type="text"
          required
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(",") });
          }}
        />
        <div style={{ width: "97%", margin: "10px 0" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64) => {
              setPostData({ ...postData, selectedFile: base64 });
            }}
          />
        </div>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          style={{ marginBottom: "10px" }}
          size="large"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="error"
          size="small"
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
