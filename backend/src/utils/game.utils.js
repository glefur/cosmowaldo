import { Step } from '../model/gameset.model.js';

const getRandomCoordinate = () => Math.random();

const getRandomCoordinates = (count) => {
  const coordinates = [];
  for (let i = 0; i < count; i++) {
    coordinates.push({ x: getRandomCoordinate(), y: getRandomCoordinate() });
  }
  return coordinates;
}

export const initializeStep = (mapPath, targetAvatarPath, otherAvatarPaths) => {
  // Générer une coordonnée aléatoire pour l'avatar à chercher
  const targetAvatarCoordinates = [{ x: getRandomCoordinate(), y: getRandomCoordinate() }];

  // Générer des coordonnées aléatoires pour les autres avatars
  const avatarMatrix = [];
  for (const avatarPath of otherAvatarPaths) {
    const coordinatesCount = Math.floor(Math.random() * 10) + 1; // Nombre aléatoire de coordonnées
    const coordinates = getRandomCoordinates(coordinatesCount);
    avatarMatrix.push({ avatarPath, coordinates });
  }

  // Ajouter l'avatar à chercher avec ses coordonnées
  avatarMatrix.push({ avatarPath: targetAvatarPath, coordinates: targetAvatarCoordinates });

  // Créer et retourner une nouvelle Step
  return new Step(mapPath, avatarMatrix);
}
