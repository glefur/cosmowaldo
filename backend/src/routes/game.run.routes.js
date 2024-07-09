import express from 'express';
import gameService from '../services/game.service.js';
import userService from '../services/user.service.js';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/running', (req, res) => {
  res.status(200).send({ running: gameService.running() });
});

router.get('/activeSet', isAuthenticated, (req, res) => {
  if (!gameService.running()) {
    return res.status(400).send({ message: 'Game is not running.' });
  }
  res.status(200).send(gameService.activeSet());
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

export default router;
