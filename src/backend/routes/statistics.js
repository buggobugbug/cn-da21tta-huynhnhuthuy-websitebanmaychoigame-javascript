import express from 'express';
import { getStatistics } from '../controllers/statisticsController.js';

const router = express.Router();

// Route lấy thống kê
router.get('/statistics', getStatistics);

export default router;
