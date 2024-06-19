import express from 'express';
import gameService from '../services/game.service.js';

const router = express.Router();

router.post('/start', (req, res) => {
    if (gameService.running()) {
        return res.status(400).send({ message: 'Game is already running.' });
    }
    gameService.start();
    res.status(200).end();
});

router.post('/stop', (req, res) => {
    if (!gameService.running()) {
        return res.status(400).send({ message: 'Game is not running.' });
    }
    gameService.stop();
    res.status(200).end();
});

router.get('/running', (req, res) => {
    res.send({ running: gameService.running() });
});


router.get('/availableSets', (req, res) => {
  res.send(gameService.availableSets());
});

export default router;
