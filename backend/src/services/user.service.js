// services/user.service.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { Player } from "../model/player.model.js";
import gameService from './game.service.js';

dotenv.config();

let activePlayers = [];
let adminTokens = [];

const registerPlayer = (name) => {
  if (gameService.running()) {
    const player = new Player(name);
    const token = jwt.sign({ name: player.getName() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    player.setJwt(token);
    
    activePlayers.push(player);
    return player;
  } else {
    throw new Error('Game is not running, cannot register players.');
  }
};

const getPlayers = () => {
  return activePlayers;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

const getPlayerByToken = (token) => {
  const decoded = verifyToken(token);
  if (decoded) {
    return activePlayers.find(player => player.getJwt() === token);
  }
  return null;
};

const clearPlayers = () => {
  activePlayers = [];
};

const createAdmin = (password) => {
  if (password === process.env.ADMIN_PWD) {
    const token = jwt.sign({ admin: `admin${adminTokens.length + 1}` }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    adminTokens.push(token);
    return token;
  } else {
    return null;
  }
};

export default { 
  registerPlayer,
  getPlayers,
  verifyToken,
  getPlayerByToken,
  clearPlayers,
  createAdmin
};
