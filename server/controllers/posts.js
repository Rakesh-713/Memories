import mongoose from "mongoose";
import PostMessage from "../models/PostMessage.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //gets the posts from startOfIndex
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  console.log(req.query, "getPostsBySearch");
  try {
    const titleExp = new RegExp(searchQuery, "i"); //'i' is to ignore capital or small letters
    const filter = {
      $or: [
        { title: titleExp },
        tags ? { tags: { $in: tags.split(",") } } : {},
      ],
    };
    const posts = await PostMessage.find(filter);
    console.log(posts, "posts");
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  console.log(id, "idddd");
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const { post } = req.body;
  console.log(post, "possst");

  const newPost = new PostMessage({
    // title: post.title,
    // message: post.message,
    // tags: post.tags,
    // selectedFile: post.selectedFile.base64,
    // name: post.name,
    ...post,
    name: post.name,
    selectedFile: post.selectedFile.base64,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  console.log(newPost, "newPost");

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePosts = async (req, res) => {
  const { id } = req.params;
  const { creator, title, message, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Post with that id:${id}`);

  const updatedPost = {
    creator,
    title,
    message,
    tags,
    selectedFile: selectedFile.base64,
    _id: id,
  };
  console.log(updatedPost);
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePosts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Post with that is:${id}`);

  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "Post deleted Successfully" });
};

export const likePosts = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) res.status(404).json({ message: "Unauthenticated" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Post with that id:${id}`);

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index == -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const likes = post.likes + 1;
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likes: likes },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  console.log(id, "iddd");
  console.log(req.body, "bodyyyy");
  const { value } = req.body;
  try {
    const post = await PostMessage.findById(id);
    console.log(post, "post");
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    console.log(error.message);
  }
};
