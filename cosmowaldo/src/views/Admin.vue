<template>
  <div>
    <h1>Admin</h1>
    <div>
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
    </div>
    <h2>Game sets</h2>
    <BRow>
      <BCol>
        <BDropdown :text="selectedGameSet ? selectedGameSet.name : 'Select Game Set'">
          <BDropdownItem
            v-for="(gameset, index) in gameSetStore.gamesets"
            :key="index"
            @click="selectGameSet(gameset)"
          >
            {{ gameset.name }}
          </BDropdownItem>
        </BDropdown>
      </BCol>
      <BCol v-if="selectedGameSet">
        <BDropdown text="Select Step">
          <BDropdownItem
            v-for="(step, index) in selectedGameSet.steps"
            :key="index"
            @click="selectStep(step)"
          >
            {{ step.mapPath }}
          </BDropdownItem>
        </BDropdown>
      </BCol>
    </BRow>
    <BRow v-if="selectedStep">
      <Scene :step="selectedStep" mode="game"/>
    </BRow>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGameSetStore } from '@/stores/gamesets';
import GameAPI from '@/api/game.api';
import Scene from '@/components/Scene.vue';

const status = ref(null);
const gameSetStore = useGameSetStore();
const selectedGameSet = ref(null);
const selectedStep = ref(null);

const start = async () => {
  await GameAPI.start();
  status.value = await GameAPI.status();   
};

const stop = async () => {
  await GameAPI.stop();
  status.value = await GameAPI.status();   
};

const selectGameSet = (gameset) => {
  selectedGameSet.value = gameset;
  gameSetStore.selectGameSet(gameset);
};

const selectStep = (step) => {
  selectedStep.value = step;
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
