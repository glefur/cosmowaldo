<template>
  <div class="main-container">
    <PasswordModal @authenticated="authenticated" v-if="showPasswordModal" />
    <div v-if="!showPasswordModal">
      <div class="admin-panel mt-3">
        <h1 class="text-center">Admin</h1>
        <BRow>
          <BCol class="d-flex flex-column" cols="4">
            <BRow class="mb-3">
              <DashboardCard title="Game Control">
                <p>Current status: <BBadge :variant="status ? 'success' : 'danger'">{{ status ? 'Running' : 'Not running' }}</BBadge></p>
                <p class="text-center"><BButton variant="success" @click="start">Start</BButton> <BButton variant="danger" @click="stop">Stop</BButton></p>
              </DashboardCard>
            </BRow>
            <BRow class="flex-grow-1">
              <DashboardCard title="Players" class="h-100">
                <BTableSimple striped hover>
                  <BThead>
                    <BTr>
                      <BTh>Name</BTh>
                      <BTh>Score</BTh>
                    </BTr>
                  </BThead>
                  <BTbody>
                    <BTr v-for="(player, index) in playerStore.players" :key="index">
                      <BTd>{{ player.name }}</BTd>
                      <BTd>
                        <BFormInput
                          type="number"
                          v-model="player.score"
                          @blur="updatePlayerScore(player)"
                        />
                      </BTd>
                    </BTr>
                  </BTbody>
                  <!--thead>
                    <tr>
                      <th>Name</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(player, index) in playerStore.players" :key="index">
                      <td>{{ player.name }}</td>
                      <td>
                        <BFormInput
                          type="number"
                          v-model="player.score"
                          @blur="updatePlayerScore(player)"
                        />
                      </td>
                    </tr>
                  </tbody-->
                </BTableSimple>
              </DashboardCard>
            </BRow>
          </BCol>
          <BCol class="d-flex flex-column" cols="8">
            <DashboardCard title="Game Set" class="flex-grow-1 h-100">
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
            </DashboardCard>
          </BCol>
        </BRow>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGameSetStore } from '@/stores/gamesets';
import { usePlayersStore } from '@/stores/players';
import GameAPI from '@/api/game.api';
import PlayerAPI from '@/api/player.api';
import PasswordModal from '@/components/PasswordModal.vue';
import DashboardCard from '@/components/DashboardCard.vue';

const gameSetStore = useGameSetStore();
const playerStore = usePlayersStore();

const status = ref(null);
const selectedGameSet = ref(null);
const selectedStep = ref(null);
const stepsActivated = ref([]);
const showPasswordModal = ref(!localStorage.getItem('adminToken'));

const start = async () => {
  try {
    await GameAPI.start();
    status.value = await GameAPI.status();
  } catch (error) {
    handleAuthError(error);
  }
};

const stop = async () => {
  try {
    await GameAPI.stop();
    status.value = await GameAPI.status();
    if (!status.value) {
      selectedGameSet.value = null;
      selectedStep.value = null;
      stepsActivated.value = [];
    }
  } catch (error) {
    handleAuthError(error);
  }
};

const selectGameSet = async (gameset) => {
  try {
    await GameAPI.setActiveSet(gameset.name);
    selectedGameSet.value = await GameAPI.activeSet();
    stepsActivated.value = Array(gameset.steps.length).fill(false);
  } catch (error) {
    handleAuthError(error);
  }
};

const activateStep = async (index) => {
  try {
    if (stepsActivated.value[index]) {
      await GameAPI.setActiveStep(index);
      selectedStep.value = await GameAPI.activeStep();
    }
  } catch (error) {
    handleAuthError(error);
  }
};

const updatePlayerScore = async (player) => {
  try {
    await PlayerAPI.updateScore(player.name, player.score);
  } catch (error) {
    console.error(error);
  }
};

const authenticated = () => {
  showPasswordModal.value = false;
};

const refreshView = async () => {
  if (!showPasswordModal.value) {
    try {
      status.value = await GameAPI.status();
      await gameSetStore.fetchGameSets();
      await playerStore.fetchPlayers();
    } catch (error) {
      handleAuthError(error);
      status.value = false;
    }
  }
};

const handleAuthError = (error) => {
  if (error.response && error.response.status === 401) {
    showPasswordModal.value = true;
    localStorage.removeItem('adminToken');
  } else {
    console.error(error);
  }
};

const showPasswordModalEventListener = () => {
  showPasswordModal.value = true;
};

let intervalId = null;

onMounted(async () => {
  document.addEventListener('showPasswordModal', showPasswordModalEventListener);
  await refreshView();
  intervalId = setInterval(refreshView, 5000);
});

onUnmounted(() => {
  document.removeEventListener('showPasswordModal', showPasswordModalEventListener);
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
.main-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: #eee;
}

.admin-panel {
  width: 90%;
  margin: auto;
}
</style>
