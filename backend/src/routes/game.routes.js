// routes/game.routes.js
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

router.get('/running', (req, res) => {
  res.status(200).send({ running: gameService.running() });
});

router.get('/availableSets', isAuthenticated, (req, res) => {
  res.status(200).send(gameService.availableSets());
});

router.get('/activeSet', isAuthenticated, (req, res) => {
  if (!gameService.running()) {
    return res.status(400).send({ message: 'Game is not running.' });
  }
  res.status(200).send(gameService.activeSet());
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

router.get('/activeStep', isAuthenticated, (req, res) => {
  if (!gameService.running()) {
    return res.status(404).send({ message: 'Game is not running.' });
  }
  if (!gameService.activeSet()) {
    return res.status(404).send({ message: 'GameSet hasn\'t be selected yet.' });
  }
  if (!gameService.activeStep()) {
    return res.status(404).send({ message: 'Active step hasn\'t be selected yet.' });
  }
  res.status(200).send(gameService.activeStep());
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
