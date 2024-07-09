import { defineStore } from 'pinia';
import GameMasterAPI from '@/api/game.master.api';

export const useGameSetStore = defineStore('gameset', {
  state: () => ({
    gamesets: [],
    selectedGameSet: null,
  }),
  actions: {
    async fetchGameSets() {
      try {
        this.gamesets = await GameMasterAPI.availableSets();
      } catch (error) {
        console.error(error);
        this.gamesets = [];
      }
    },
    selectGameSet(gameset) {
      this.selectedGameSet = gameset;
    },
  },
});
