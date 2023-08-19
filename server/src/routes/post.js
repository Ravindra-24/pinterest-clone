import Router from "express";
import { authMiddleware } from "../middleware/index";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  updatePostLikes,
} from "../controllers/post.js";
import {body} from "express-validator";
import  upload  from "../utils/uploader.js";

const router = Router();

router.get("/", getPosts);

router.get("/:id", getPost);

//protected
router.post("/", upload.single("image"),body('title').notEmpty().withMessage('title is required'),authMiddleware, createPost);

//only the user who created the post can delete it and modrator
router.post("/:id",authMiddleware, deletePost);

router.patch("/update/:id",authMiddleware, updatePost)

router.patch("/like/:postId",authMiddleware, updatePostLikes);

export default router;
