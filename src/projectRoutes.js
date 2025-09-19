import { Router } from 'express';
import { supabase } from './supabaseClient.js';  

const router = Router();

router.get('/projects', async (req, res) => {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;