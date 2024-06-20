<template>
  <div class="scene" :style="backgroundStyle" style="background-size: 100% 100%">
    <div v-for="(avatar, index) in step.avatarMatrix" :key="index">
      <Avatar
        v-for="(coord, coordIndex) in avatar.coordinates"
        :key="coordIndex"
        :avatarPath="avatar.avatarPath"
        :coordinates="coord"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Avatar from './Avatar.vue';

const props = defineProps({
  step: {
    type: Object,
    required: true
  }
});

const backgroundStyle = computed(() => ({
  backgroundImage: `url(http://localhost:3000${props.step.mapPath})`,
  backgroundPosition: 'center',
  width: '100%',
  height: '100vh' // Ajustez selon vos besoins
}));
</script>

<style scoped>
.scene {
  position: relative;
  width: 100%;
  height: 100vh; 
  background-position: center;
}
</style>
