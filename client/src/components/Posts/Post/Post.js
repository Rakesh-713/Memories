import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import {
  deletePosts,
  getPost,
  getPosts,
  likePosts,
} from "../../../store/postsActions";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("Profile"));
  console.log(post, "post");
  console.log(post.selectedFile.split(",")[1], "image");
  // const { res } = JSON.parse(post);
  // const res = post.selectedFile;
  // console.log("res", res.replace(/^data:image\/[a-zA-Z]+;base64/, ""));

  const handleLiked = async () => {
    await dispatch(likePosts(post._id));
    await dispatch(getPosts());
  };

  const handleDelete = async () => {
    await dispatch(deletePosts(post._id));
    await dispatch(getPosts());
  };
  const openPost = async () => {
    debugger;
    await dispatch(getPost(post._id));
    navigate(`/posts/${post._id}`);
  };

  // useEffect(() => {
  //   if (post.selectedFile == undefined) {
  //     console.log("error");
  //   } else {
  //     console.log("ok");
  //   }
  // }, [post]);

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 0
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
        // border: "solid #fff",
      }}
      raised
      elevation={6}
    >
      <ButtonBase
        onClick={openPost}
        styles={{
          display: "block",
          textAlign: "initial",
        }}
      >
        <CardMedia
          style={{
            height: "0",
            paddingTop: "56.25%",
            backgroundColor: "rgba(0,0,0,0.5)",
            backgroundBlendMode: "darken",
            // borderRadius: "15px",
          }}
          component="img"
          // image={post.selectedFile.split(",")[1].toString()}
          alt="image"
          image={post.selectedFile}
          // src={post.selectedFile.toString()}
          title={post.title}
        />
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "white",
          }}
        >
          <Typography variant="body1">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "5px",
              color: "white",
            }}
          >
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
      </ButtonBase>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography
        style={{ padding: "0 10px" }}
        variant="body2"
        gutterBottom
        component="h2"
      >
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          justifyContent="center"
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <Button size="small" color="primary" onClick={handleLiked}>
          {/* <ThumbUpAltIcon />
          &nbsp;
          {post.likes} 
        </Button> */}
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLiked}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
