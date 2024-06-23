import express from 'express';
import playerService from '../services/player.service.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send(playerService.getPlayers());
});

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'Name is required' });
  }
  try {
    const player = playerService.registerPlayer(name);
    res.status(200).send(player);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;
