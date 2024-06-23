import express from 'express';
import gameService from '../services/game.service.js';

const router = express.Router();

router.post('/start', (req, res) => {
    if (gameService.running()) {
      res.status(400).send({ message: 'Game is already running.' });
      return;
    }
    gameService.start();
    res.status(200).end();
});

router.post('/stop', (req, res) => {
    if (!gameService.running()) {
        res.status(400).send({ message: 'Game is not running.' });
        return;
    }
    gameService.stop();
    res.status(200).end();
});

router.get('/running', (req, res) => {
    res.status(200).send({ running: gameService.running() });
});

router.get('/availableSets', (req, res) => {
  res.status(200).send(gameService.availableSets());
});

router.get('/activeSet', (req, res) => {
  if (!gameService.running()) {
    res.status(400).send({ message: 'Game is not running.' });
    return;
  }
  res.status(200).send(gameService.activeSet());
});

router.post('/activeSet', (req, res) => {
  if (!gameService.running()) {
    res.status(400).send({ message: 'Game is not running.' });
    return;
  }
  const { gameSetName } = req.body;
  const sets = gameService.availableSets().filter(set => set.name == gameSetName);
  if (sets.length !== 1) {
    res.status(400).send({ message: `${gameSetName} isn't a valid GameSet name.` });
  } else {
    gameService.setActiveSet(sets[0]);
    res.status(200).end();
  }
});

router.get('/activeStep', (req, res) => {
  if (!gameService.running()) {
    res.status(400).send({ message: 'Game is not running.' });
  }
  res.status(200).send(gameService.activeStep());
});

router.post('/activeStep', (req, res) => {
  if (!gameService.running()) {
    res.status(400).send({ message: 'Game is not running.' });
  }
  if (!gameService.activeSet()) {
    res.status(400).send({ message: 'You must activate a GameSet before choosing a step.' });
  }
  const { stepIndex } = req.body;
  const set = gameService.activeSet();
  if (set.steps.length < stepIndex) {
    res.status(400).send({ message: 'Bad index' });
  } else {
    gameService.setActiveStep(set.steps[stepIndex]);
    res.status(200).end();
  }
});

export default router;
