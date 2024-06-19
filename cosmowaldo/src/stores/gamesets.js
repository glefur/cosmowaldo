import { defineStore } from 'pinia';
import GameAPI from '@/api/game.api';

export const useGameSetStore = defineStore('gameset', {
  state: () => ({
    gamesets: [],
  }),
  actions: {
    async fetchGameSets() {
      try {
        this.gamesets = await GameAPI.availableSets();
      } catch (error) {
        console.error(error);
        this.gamesets = [];
      }
    },
  },
});
