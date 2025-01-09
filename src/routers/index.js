import express from 'express';

import authRoutes from './auth.js';
import waterRoutes from './water.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/water', authenticate, waterRoutes);
console.log('router', router);
export default router;
