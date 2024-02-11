import express from 'express'
import { createComment, deleteComment, getPostComments, getcomments, likeComment } from '../controller/comment.js';
const router = express.Router();


router.post('/create',createComment);
router.get('/getcomment/:postId' , getPostComments)
router.post('/likes',likeComment)
router.delete('/deletecomment/:isAdmin/:commentId/:userId',deleteComment)
router.get('/getallcomments/:isAdmin',getcomments)
export default router