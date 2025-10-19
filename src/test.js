import { Router } from 'express';

const router = Router();

router.get('/test', async (req, res) => {
  res.json({ message: 'Test route is working!' });
});

export default router;