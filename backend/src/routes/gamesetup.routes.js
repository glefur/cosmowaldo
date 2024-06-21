import express from 'express';
import { initializeStep } from '../utils/game.utils.js';

const router = express.Router();

router.post('/step', (req, res) => {
  const { mapPath, targetAvatarPath, otherAvatarPaths, minInstances, maxInstances } = req.body;
  if (!mapPath || !targetAvatarPath || !otherAvatarPaths || minInstances == null || maxInstances == null) {
    return res.status(400).send({ error: 'Missing required parameters' });
  }
  const result = initializeStep(mapPath, targetAvatarPath, otherAvatarPaths, minInstances, maxInstances);
  res.status(200).send(result);
});

export default router;
