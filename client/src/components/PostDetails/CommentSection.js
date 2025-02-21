import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../../store/postsActions";

function CommentSection(props) {
  const { post } = props;
  console.log("props", props);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("Profile"));

  const dispatch = useDispatch();

  const handleClick = () => {
    debugger;
    const finalComment = `${user.result.name}: ${comment}`;
    console.log("idddd", post._id);
    dispatch(commentPost({ value: finalComment, id: post._id }));
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ height: "200px", overflowY: "auto", marginRight: "30px" }}
        >
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography gutterBottom variant="subtitle1" key={i}>
              {c}
            </Typography>
          ))}
        </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div style={{ width: "70%" }}>
            <Typography variant="h6" gutterBottom>
              Write a Comment:
            </Typography>
            <TextField
              fullWidth
              rows={4}
              multiline
              label="Comment"
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              style={{ marginTop: "10px" }}
              disabled={!comment}
              color="primary"
              onClick={handleClick}
            >
              Add Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
