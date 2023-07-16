import Router from 'express'
import { getPosts, getPost, createPost, deletePost } from '../controllers/post.js'

const router = Router()

router.get('/', getPosts)
router.get('/:id', getPost)

//protected
router.post('/', createPost)

 //only the user who created the post can delete it and modrator
 router.post('/:id', deletePost)

export default router