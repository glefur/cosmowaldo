<template>
  <div>
    <div v-if="!gameStatus.running || !activeStep" class="overlay">
      <p v-if="!gameStatus.running">Game is not running.</p>
      <p v-if="gameStatus.running && !activeStep">Active step hasn't been selected yet.</p>
    </div>
    <Scene v-else :step="activeStep" mode="game" class="full-viewport"/>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import GameRunAPI from '@/api/game.run.api';
import Scene from '@/components/Scene.vue';

const gameStatus = ref({ running: false });
const activeStep = ref(null);

const fetchGameStatus = async () => {
  try {
    gameStatus.value.running = await GameRunAPI.status();
    if (gameStatus.value.running) {
      activeStep.value = await GameRunAPI.activeStep();
    } else {
      activeStep.value = null;
    }
  } catch (error) {
    console.error('Failed to fetch game status or active step:', error);
  }
};

let intervalId;

onMounted(async () => {
  await fetchGameStatus();
  intervalId = setInterval(fetchGameStatus, 5000); // Check every 5 seconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.full-viewport {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
}
</style>
