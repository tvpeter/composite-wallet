import express from 'express';
import User from '../controllers/User';


const router = express.Router();

router.post('/create', User.createUser);
router.get('/get/:userId', User.readUser);
router.get('/get', User.readAll);
router.patch('/update/:userId', User.updateUser);
router.delete('/delete/:userId', User.deleteUser);

export = router;



