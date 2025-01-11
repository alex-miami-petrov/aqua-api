import { Router } from 'express';
import usersRouter from './users.js';
import authRouter from './auth.js';
import waterRouter from './water.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
// router.use('/water', waterRouter);
router.use('/qqq', (req, res) => res.json({ message: '1' }));

export default router;
