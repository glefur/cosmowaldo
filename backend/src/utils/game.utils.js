import { Step } from '../model/gameset.model.js';

const getRandomCoordinate = () => Math.random();

const getRandomCoordinates = (minCount, maxCount) => {
  const coordinates = [];
  const count = minCount + Math.floor(Math.random() * (maxCount - minCount + 1)); // Générer un nombre aléatoire entre minCount et maxCount
  for (let i = 0; i < count; i++) {
    coordinates.push({ x: getRandomCoordinate(), y: getRandomCoordinate() });
  }
  return coordinates;
}

export const initializeStep = (mapPath, targetAvatarPath, otherAvatarPaths, minInstances, maxInstances) => {
  // Générer une coordonnée aléatoire pour l'avatar à chercher
  const targetAvatarCoordinates = [{ x: getRandomCoordinate(), y: getRandomCoordinate() }];

  // Générer des coordonnées aléatoires pour les autres avatars
  const avatarMatrix = [];
  for (const avatarPath of otherAvatarPaths) {
    const coordinates = getRandomCoordinates(minInstances, maxInstances); // Générer entre minInstances et maxInstances coordonnées
    avatarMatrix.push({ avatarPath, coordinates });
  }

  // Ajouter l'avatar à chercher avec ses coordonnées
  avatarMatrix.push({ avatarPath: targetAvatarPath, coordinates: targetAvatarCoordinates });

  // Créer et retourner une nouvelle Step
  return new Step(mapPath, avatarMatrix);
}
