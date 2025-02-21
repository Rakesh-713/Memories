import express from "express";
import {
  createPosts,
  getPost,
  getPosts,
  getPostsBySearch,
  updatePosts,
  deletePosts,
  likePosts,
  commentPost,
} from "../controllers/posts.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.get("/search/search", getPostsBySearch);

router.post("/posts", authMiddleware, createPosts);

router.patch("/:id", authMiddleware, updatePosts);

router.delete("/delete/:id", authMiddleware, deletePosts);

router.patch("/:id/like", authMiddleware, likePosts);

router.post("/:id/commentPost", authMiddleware, commentPost);

export default router;
