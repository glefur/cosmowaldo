class Player {
  
  constructor(name) {
    this.name = name;
    this.jwt = null;
    this.score = 0;
  }

  getName() {
    return this.name;
  }

  getScore() {
    return this.score;
  }

  increaseScore(points) {
    this.score += points;
  }

  setJwt(token) {
    this.jwt = token;
  }

  getJwt() {
    return this.jwt;
  }
}

export { Player};