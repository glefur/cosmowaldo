<template>
  <div>
    <PasswordModal @authenticated="authenticated" v-if="showPasswordModal" />
    <div class="admin-panel mt-3" v-if="!showPasswordModal">
      <h1 class="text-center">Admin</h1>
      <BRow>
        <p class="h4 text-center">
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
      <BRow v-if="status">
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
      </BRow>
      <BRow v-if="selectedGameSet">
        <BCol>
          <BListGroup>
            <BListGroupItem 
              tag="label"
              v-for="(step, index) in selectedGameSet.steps" :key="index">
              <div class="fw-bold">
              <input 
                class="form-check-input me-1" 
                type="checkbox" 
                :id="`switchStep${index}`" 
                v-model="stepsActivated[index]"
                :disabled="index !== 0 && !stepsActivated[index - 1]"
                @change="activateStep(index)">
                  Step {{ index + 1 }}</div>
              <p class="fw-lighter">{{ step.mapPath }}</p>
            </BListGroupItem>
          </BListGroup>
        </BCol>
      </BRow>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGameSetStore } from '@/stores/gamesets';
import GameAPI from '@/api/game.api';
import PasswordModal from '@/components/PasswordModal.vue';

const status = ref(null);
const gameSetStore = useGameSetStore();
const selectedGameSet = ref(null);
const selectedStep = ref(null);
const stepsActivated = ref([]);
const showPasswordModal = ref(!localStorage.getItem('adminToken'));

const start = async () => {
  await GameAPI.start();
  status.value = await GameAPI.status();
};

const stop = async () => {
  await GameAPI.stop();
  status.value = await GameAPI.status();
  if (!status.value) {
    selectGameSet.value = null;
    selectedStep.value = null;
    stepsActivated.value = []; 
  }
};

const selectGameSet = async (gameset) => {
  await GameAPI.setActiveSet(gameset.name);
  selectedGameSet.value = await GameAPI.activeSet();
  stepsActivated.value = Array(gameset.steps.length).fill(false);
};

const activateStep = async (index) => {
  if (stepsActivated.value[index]) {
    await GameAPI.setActiveStep(index);
    selectedStep.value = await GameAPI.activeStep();
  }
};

const authenticated = () => {
  showPasswordModal.value = false;
};

onMounted(async () => {
  if (!showPasswordModal.value) {
    try {
      status.value = await GameAPI.status();
      await gameSetStore.fetchGameSets();
    } catch (error) {
      console.error(error);
      status.value = false; // ou autre valeur par défaut
    }
  }
});
</script>

<style scoped>
.admin-panel {
  width: 60vh;
  margin: auto;
}
</style>
