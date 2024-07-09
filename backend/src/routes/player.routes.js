import express from 'express';
import userService from '../services/user.service.js';
import { isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', isAdmin, (req, res) => {
  res.status(200).send(userService.getPlayers());
});

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ message: 'Name is required' });
  }
  try {
    const player = userService.registerPlayer(name);
    res.status(200).send(player);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post('/:name', isAdmin, (req, res) => {
  const { name } = req.params;
  const { score } = req.body;

  if (typeof score !== 'number') {
    return res.status(400).send({ message: 'Score must be a number.' });
  }

  try {
    userService.setScore(name, score);
    res.status(200).end();
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default router;
