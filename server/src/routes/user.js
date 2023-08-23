import { Router } from "express";
import { getUser, getUserPosts } from "../controllers/user";
import { authMiddleware } from "../middleware";

const router = Router();

router.get("/:id", getUser )

router.get("/user-posts/:id", getUserPosts)

export default router;