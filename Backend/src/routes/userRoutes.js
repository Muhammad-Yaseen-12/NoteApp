import express from 'express';

import getUsers from '../controllers/getUsers.js';
import logOutUser from '../controllers/logOutUser.js';
import tokenVerification from '../middlewares/tokenVerification.js';

// Router Method
const router = express.Router();

router.get('/users', tokenVerification, getUsers)
router.get('/logout', tokenVerification, logOutUser)

export default router;