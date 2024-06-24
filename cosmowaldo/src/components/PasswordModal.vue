<template>
  <div>
    <BModal v-model="showModal" title="Enter Admin Password" @ok="handleSubmit" @hidden="resetModal">
      <BFormGroup
        label="Password"
        label-for="password-input"
      >
        <BFormInput
          id="password-input"
          v-model="password"
          type="password"
          required
        />
      </BFormGroup>
    </BModal>
    <Teleport to="body">
      <div class="top-0 end-0 p-3" style="position: fixed; z-index: 9999;">
        <BToast v-model="toastVisible" variant="danger">
          <template #title>Error</template>
          {{ toastMessage }}
        </BToast>
      </div>
      <div class="position-fixed top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" v-if="showOverlay">
        <div class="text-white">Loading...</div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { defineEmits, ref, watch } from 'vue';
import AdminAPI from '@/api/admin.api';

const showModal = ref(true);
const showOverlay = ref(true);
const password = ref('');
const toastVisible = ref(false);
const toastMessage = ref('');

const emit = defineEmits(['authenticated']);

const resetModal = () => {
  password.value = '';
};

const handleSubmit = async () => {
  try {
    const response = await AdminAPI.login(password.value);
    if (response) {
      localStorage.setItem('adminToken', response);
      showModal.value = false;
      showOverlay.value = false;
      emit('authenticated');
    } else {
      throw new Error('Invalid password');
    }
  } catch (error) {
    toastMessage.value = `An error occurred: ${error.message}`;
    toastVisible.value = true;
    showModal.value = true;
  }
};

watch(showModal, (newValue) => {
  if (!newValue && !localStorage.getItem('adminToken')) {
    showModal.value = true;
  }
});

if (localStorage.getItem('adminToken')) {
  showOverlay.value = false;
  emit('authenticated');
}
</script>

<style scoped>
</style>
