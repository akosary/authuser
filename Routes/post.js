const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one post
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// Create one post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    user: req.body.user,
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one post
router.patch("/:id", getPost, async (req, res) => {
  if (req.body.title != null) {
    res.post.title = req.body.title;
  }
  if (req.body.content != null) {
    res.post.content = req.body.content;
  }
  if (req.body.user != null) {
    res.post.user = req.body.user;
  }

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  let post;

  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}

router.get("/user/:id", getUserPosts, async (req, res) => {
  res.json(res.posts);
});

async function getUserPosts(req, res, next) {
  let posts;

  try {
    posts = await Post.find({ user: req.params.id });
    if (posts == null) {
      return res.status(404).json({ message: "Cannot find user posts" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.posts = posts;
  next();
}

module.exports = router;
