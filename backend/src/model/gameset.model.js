class Step {
  constructor(mapPath, avatarMatrix) {
    this.mapPath = mapPath; // Chemin vers l'image de la carte
    this.avatarMatrix = avatarMatrix; // Matrice des avatars et leurs positions
  }

  // Méthode pour obtenir le chemin de la carte
  getMapPath() {
    return this.mapPath;
  }

  // Méthode pour obtenir la matrice des avatars
  getAvatarMatrix() {
    return this.avatarMatrix;
  }

  // Méthode pour ajouter des coordonnées à un avatar spécifique
  addAvatarCoordinates(avatarPath, coordinates) {
    // Trouver l'avatar dans la matrice
    const avatar = this.avatarMatrix.find(a => a.avatarPath === avatarPath);

    if (avatar) {
      // Si l'avatar existe, ajouter les nouvelles coordonnées
      avatar.coordinates.push(coordinates);
    } else {
      // Sinon, créer un nouvel avatar avec les coordonnées
      this.avatarMatrix.push({ avatarPath, coordinates: [coordinates] });
    }
  }
}

class GameSet {
  constructor() {
    this.name = null;
    this.steps = []; // Liste des étapes
  }

  // Méthode pour ajouter une étape
  addStep(step) {
    this.steps.push(step);
  }

  // Méthode pour obtenir une étape spécifique
  getStep(index) {
    return this.steps[index];
  }

  // Méthode pour obtenir toutes les étapes
  getAllSteps() {
    return this.steps;
  }
}


export { GameSet, Step };
