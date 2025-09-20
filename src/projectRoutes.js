import { Router } from 'express';
import { supabase } from './supabaseClient.js';  

const router = Router();

router.get('/projects', async (req, res) => {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/projects", async (req, res) => {
  console.log(req.body);

  const { slug, title, date, description, image, markdown_content, tool_icon1, tool_icon2 } = req.body;
  const { data, error } = await supabase
    .from("projects")
    .insert([{ slug, title, date, description, image, markdown_content, tool_icon1, tool_icon2 }])
    .select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.delete("/projects/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("projects").delete().eq("id", id).select();
  if (error) return res.status(500).json({ error: error.message });
  if (data.length === 0) return res.status(404).json({ error: "Project not found" });
  return res.status(200).json({ message: "Project deleted successfully" });
});

export default router;