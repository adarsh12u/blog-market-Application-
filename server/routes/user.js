import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
} from '../controller/user.js';

const router = express.Router();

router.put('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);
router.post('/signout', signout);
router.get('/getusers', getUsers);
router.get('/:userId', getUser);
router.delete('/:userId', deleteUser);

export default router;