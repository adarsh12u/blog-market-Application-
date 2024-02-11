import express from 'express'
import { create, deletepost, getitem, getposts, updatepost } from '../controller/post.js';
const router = express.Router();


router.post('/create/:userid',create);
router.get('/getitem/:id',getitem)
router.get('/getpost',getposts)
router.delete('/deletepost/:postId/:userId',deletepost)
router.put('/updatepost/:postId',updatepost)

export default router