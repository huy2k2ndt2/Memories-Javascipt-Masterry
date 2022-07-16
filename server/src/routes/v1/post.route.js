const express = require("express");

const {
  postController: {
    getPosts,
    getPostsBySearch,
    getPostsByCreator,
    getPost,
    createPost,
    updatePost,
    likePost,
    commentPost,
    deletePost,
  },
} = require("../../controllers");

const router = express.Router();
const auth = require("../../middlewares/auth.js");

router.get("/creator", getPostsByCreator);
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", commentPost);

module.exports = router;
