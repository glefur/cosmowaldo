import fs from 'fs';
import path from 'path';
import { GameSet, Step } from '../model/gameset.model.js';

const loadGameSetFromFile = (filePath) => {
  const data = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const parsedData = JSON.parse(data);

  const gameSet = new GameSet();
  gameSet.name = parsedData.name;
  for (const stepData of parsedData.steps) {
    const step = new Step(stepData.mapPath, stepData.avatarMatrix);
    gameSet.addStep(step);
  }

  return gameSet;
};

// Fonction pour charger tous les GameSets à partir du répertoire ../../data/
const loadAllGameSets = (directoryPath) => {
  const absolutePath = path.resolve(directoryPath);
  const files = fs.readdirSync(absolutePath);

  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(absolutePath, file);
      const gameSet = loadGameSetFromFile(filePath);
      gamesets.availableSets.push(gameSet);
    }
  });
};


let game = {
    status: false,
    activeSet: null,
    activeStep: null
};

let gamesets = {
  availableSets: []
}

const start = () => {
    game.status = true;
};

const stop = () => {
    game.status = false;
    game.activeSet = null;
    game.activeStep = null;
};

const running = () => game.status;

const availableSets = () => gamesets.availableSets;

const activeSet = () => game.activeSet;

const setActiveSet = (gameSet) => game.activeSet = gameSet;

const activeStep = () => game.activeStep;

const setActiveStep = (step) => game.activeStep = step;

// Etrange le chemin est relatif au server.js, pas a ce service
loadAllGameSets('./data');

export default {
    start,
    stop,
    running,
    availableSets,
    activeSet,
    activeStep,
    setActiveSet,
    setActiveStep
}