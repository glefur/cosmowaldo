import { defineStore } from 'pinia';
import PlayerAPI from '@/api/player.api';

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: []
  }),
  actions: {
    async fetchPlayers() { 
      try {
        const players = await PlayerAPI.players();
        this.players = players; 
      } catch (error) {
        console.error(error);
        this.players = [];
      }
    }
  }
});
