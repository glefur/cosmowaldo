import express from 'express';
import { initializeStep } from '../utils/game.utils.js';

const router = express.Router();

router.post('/step', (req, res) => {
  const { mapPath, targetAvatarPath, otherAvatarPaths } = req.body;
  if (!mapPath || !targetAvatarPath || !otherAvatarPaths) {
    return res.status(400).send({ error: 'Missing required parameters' });
  }
  const result = initializeStep(mapPath, targetAvatarPath, otherAvatarPaths);
  res.status(200).send(result);
});

export default router;
