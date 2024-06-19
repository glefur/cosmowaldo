<template>
  <h1>Admin</h1>
  <h2>Game management</h2>
  <BRow>
    <p>
      Current status:
      <BBadge :variant="status ? 'success' : 'danger'">
        {{ status ? 'Running' : 'Not running' }}
      </BBadge>
    </p>
  </BRow>
  <BRow>
    <BCol><BButton variant="success" @click="start">Start</BButton></BCol>
    <BCol><BButton variant="danger" @click="stop">Stop</BButton></BCol>
  </BRow>
  <h2>Game sets</h2>
  <BRow>
    <BDropdown text="Select Game Set">
      <BDropdownItem
        v-for="(gameset, index) in gameSetStore.gamesets"
        :key="index"
        @click="selectGameSet(gameset)"
      >
        {{ gameset.name }}
      </BDropdownItem>
    </BDropdown>
  </BRow>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGameSetStore } from '@/stores/gamesets';
import GameAPI from '@/api/game.api';

const status = ref(null);
const gameSetStore = useGameSetStore();

const start = async () => {
  await GameAPI.start();
  status.value = await GameAPI.status();   
};

const stop = async () => {
  await GameAPI.stop();
  status.value = await GameAPI.status();   
};

const selectGameSet = (gameset) => {
  console.log('Selected GameSet:', gameset);
};

onMounted(async () => {
  try {
    status.value = await GameAPI.status();
    await gameSetStore.fetchGameSets();
  } catch (error) {
    console.error(error);
    status.value = false; // ou autre valeur par défaut
  }
});
</script>
