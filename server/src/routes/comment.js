import express from 'express'
import {comment, deleteComment, updateCommentLike,} from '../controllers/comment'
import {authMiddleware} from "../middleware/index"

const router = express.Router();


router.post('/:id',authMiddleware, comment)

router.patch('/like/:commentId/:postId',authMiddleware, updateCommentLike)

router.delete('/:commentId/:postId',authMiddleware, deleteComment)

export default router