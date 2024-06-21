<template>
  <div>
    <h1>Scene Builder</h1>
    <div class="builder-form">
      <BForm @submit.prevent="submitForm">
       <BFormGroup
          id="map-path-group"
          label="Map:"
          label-for="mapPath"
          class="field-group"
        >
          <BFormInput
            id="mapPath"
            v-model="mapPath"
            type="text"
            placeholder="Enter map url"
            required
          />
        </BFormGroup>
        <BFormGroup
          id="desired-avatar-group"
          label="Desired avatar:"
          label-for="targetAvatarPath"
          class="field-group"
        >
          <BFormInput
            id="mapPath"
            v-model="targetAvatarPath"
            type="text"
            placeholder="Enter avatar url"
            required
          />
        </BFormGroup>
        <div class="flex-container">
          <BFormGroup
            id="min-instances-group"
            label="Minimal Number of Instances:"
            label-for="minInstances"
            class="flex-item"
          >
            <BFormSpinbutton 
              id="minInstances" 
              v-model="minInstances"
              required/>
          </BFormGroup>
          <BFormGroup
            id="max-instances-group"
            label="Maximum Number of Instances:"
            label-for="maxInstances"
            class="flex-item"
          >
            <BFormSpinbutton 
              id="maxInstances" 
              v-model="maxInstances"
              required/>
          </BFormGroup>
        </div>
        <div>
          <div class="header-container">
            <span class="h3">Additional Avatars</span>
            <BButton variant="primary" @click="addAvatar" class="right-button" size="sm">Add Avatar</BButton>
          </div>
          <div v-for="(avatar, index) in otherAvatarPaths" :key="index">
            <BInputGroup>
              <BFormInput
                v-model="otherAvatarPaths[index]"
                type="text"
                placeholder="Avatar URL"
                  required
                />
              <template #append>
                <BButton variant="danger" @click="removeAvatar(index)">Remove</BButton>
              </template>
            </BInputGroup>
          </div>
        </div>
        <BButton variant="primary" type="submit" class="center-button">Submit</BButton>
      </BForm>
    </div>
    <div v-if="step">
      <h2>Generated Step</h2>
      <Scene :step="step" style="margin-bottom: 60px;"/>
      <BButton variant="success" @click="copyToClipboard" class="center-button">Copy JSON to Clipboard</BButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SetupAPI from '@/api/setup.api.js';
import Scene from '@/components/Scene.vue';

const mapPath = ref('');
const targetAvatarPath = ref('');
const otherAvatarPaths = ref(['']);
const minInstances = ref(50);
const maxInstances = ref(200);
const step = ref(null);

const addAvatar = () => {
  otherAvatarPaths.value.push('');
};

const removeAvatar = (index) => {
  otherAvatarPaths.value.splice(index, 1);
};

const submitForm = async () => {
  try {
    step.value = await SetupAPI.initializeStep({
      mapPath: mapPath.value,
      targetAvatarPath: targetAvatarPath.value,
      otherAvatarPaths: otherAvatarPaths.value,
      minInstances: minInstances.value,
      maxInstances: maxInstances.value
    });
  } catch (error) {
    console.error(error);
  }
};

const copyToClipboard = () => {
  if (step.value) {
    const jsonStr = JSON.stringify(step.value, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      alert('JSON copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy JSON to clipboard: ', err);
    });
  }
};
</script>

<style scoped>
.builder-form {
  width: 50%;
  margin: auto;
}

.field-group {
  margin-bottom: 25px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.flex-item {
  flex: 1;
  margin-right: 10px; /* Ajoute un espace entre les deux champs */
}

.flex-item:last-child {
  margin-right: 0; /* Supprime la marge du dernier élément */
}


.center-button {
  display: block;
  margin: auto;
  margin-top: 10px;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  margin-top: 25px;
  margin-bottom: 15px;
}

.right-button {
  margin-left: auto; 
}
</style>
