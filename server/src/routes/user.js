import { Router } from "express";
import { followUser, getUser, getUserPosts, updateUser } from "../controllers/user";
import { authMiddleware } from "../middleware";
import upload from "../utils/uploader";

const router = Router();

router.get("/:id", getUser )
router.get("/user-posts/:id", getUserPosts)
router.patch("/follow/:userId", authMiddleware, followUser )
router.patch("/update",upload.single("image"), authMiddleware, updateUser)

export default router;