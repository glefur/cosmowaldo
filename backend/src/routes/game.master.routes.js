import express from 'express';
import gameService from '../services/game.service.js';
import userService from '../services/user.service.js';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/start', isAdmin, (req, res) => {
  if (gameService.running()) {
    return res.status(400).send({ message: 'Game is already running.' });
  }
  gameService.start();
  res.status(200).end();
});

router.post('/stop', isAdmin, (req, res) => {
  if (!gameService.running()) {
    return res.status(400).send({ message: 'Game is not running.' });
  }
  gameService.stop();
  userService.clearPlayers();
  res.status(200).end();
});

router.get('/availableSets', isAdmin, (req, res) => {
  res.status(200).send(gameService.availableSets());
});

router.post('/activeSet', isAdmin, (req, res) => {
  if (!gameService.running()) {
    return res.status(400).send({ message: 'Game is not running.' });
  }
  const { gameSetName } = req.body;
  const sets = gameService.availableSets().filter(set => set.name == gameSetName);
  if (sets.length !== 1) {
    return res.status(400).send({ message: `${gameSetName} isn't a valid GameSet name.` });
  } else {
    gameService.setActiveSet(sets[0]);
    res.status(200).end();
  }
});

router.post('/activeStep', isAdmin, (req, res) => {
  if (!gameService.running()) {
    return res.status(400).send({ message: 'Game is not running.' });
  }
  if (!gameService.activeSet()) {
    return res.status(400).send({ message: 'You must activate a GameSet before choosing a step.' });
  }
  const { stepIndex } = req.body;
  const set = gameService.activeSet();
  if (set.steps.length < stepIndex) {
    return res.status(400).send({ message: 'Bad index' });
  } else {
    gameService.setActiveStep(set.steps[stepIndex]);
    res.status(200).end();
  }
});

export default router;
