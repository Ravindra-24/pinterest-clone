import Router from "express";
import { authMiddleware } from "../middleware/index";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  updatePostLikes,
  getSlideShowImages,
  searchPost,
} from "../controllers/post.js";
import { body } from "express-validator";
import upload from "../utils/uploader.js";

const router = Router();

router.get("/", getPosts);

router.get("/search", searchPost)

router.get("/slide-show-images", getSlideShowImages);

router.get("/:id", getPost);

router.post(
  "/",
  upload.single("image"),
  body("title").notEmpty().withMessage("title is required"),
  authMiddleware,
  createPost
);

router.post("/:id", authMiddleware, deletePost);

router.patch("/update/:id", authMiddleware, updatePost);

router.patch("/like/:postId", authMiddleware, updatePostLikes);


export default router;
