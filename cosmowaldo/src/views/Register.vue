<template>
  <div class="register-container">
    <BForm 
      @submit.prevent="register"
      class="register-form">
      <h1 class="text-center">Please register</h1>
      <BFormGroup
        id="fieldset-1"
        label="Enter your player name"
        label-for="input-name"
        invalid-feedback="Please give a name"
        :state="name !== null"
        label-class="mb-1"
      >
        <BFormInput id="input-name" v-model="name" :state="name !== null" trim />
      </BFormGroup>
      <BButton type="submit" variant="primary" style="display: block; margin:auto;">Submit</BButton>
    </BForm>
    
    <Teleport to="body">
      <div class="top-0 end-0 p-3" style="position: fixed; z-index: 9999;">
        <BToast v-model="toastVisible" variant="danger">
          <template #title>Error</template>
          {{ toastMessage }}
        </BToast>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PlayerAPI from '@/api/player.api';

const name = ref(null);
const router = useRouter();
const toastVisible = ref(false);
const toastMessage = ref('');

const register = async () => {
  try {
    const response = await PlayerAPI.register(name.value);
    if (response.jwt) {
      localStorage.setItem('player', JSON.stringify(response));
      router.push('/game');
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    toastMessage.value = `An error occurred: ${error.message}`;
    toastVisible.value = true;
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.register-form {
  width: 30%;
}
</style>
