<template>
  <div class="scene" :style="backgroundStyle" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" style="background-size: 100% 100%">
    <div v-for="(avatar, index) in step.avatarMatrix" :key="index">
      <Avatar
        v-for="(coord, coordIndex) in avatar.coordinates"
        :key="coordIndex"
        :avatarPath="avatar.avatarPath"
        :coordinates="coord"
        :mode="props.mode"
        :isActive="isAvatarActive(index, coordIndex)"
        @mousemove="(event) => handleAvatarMouseMove(event, index, coordIndex)"
        @mouseleave="handleAvatarMouseLeave"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue';
import Avatar from './Avatar.vue';

const props = defineProps({
  step: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    default: 'display'
  }
});

const backgroundStyle = computed(() => ({
  backgroundImage: `url(http://localhost:3000${props.step.mapPath})`,
  backgroundPosition: 'center',
  width: '100%',
  height: '100vh' // Ajustez selon vos besoins
}));

const activeAvatar = ref({ index: null, coordIndex: null });

const isAvatarActive = (index, coordIndex) => {
  return activeAvatar.value.index === index && activeAvatar.value.coordIndex === coordIndex;
};

const handleMouseMove = (event) => {
  if (props.mode === 'game') {
    const { clientX, clientY } = event;
    let closestAvatar = null;
    let closestDistance = Infinity;

    props.step.avatarMatrix.forEach((avatar, index) => {
      avatar.coordinates.forEach((coord, coordIndex) => {
        const avatarX = coord.x * window.innerWidth;
        const avatarY = coord.y * window.innerHeight;
        const distance = Math.hypot(clientX - avatarX, clientY - avatarY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestAvatar = { index, coordIndex };
        }
      });
    });

    activeAvatar.value = closestAvatar;
  }
};

const handleMouseLeave = () => {
  if (props.mode === 'game') {
    activeAvatar.value = { index: null, coordIndex: null };
  }
};

const handleAvatarMouseMove = (event, index, coordIndex) => {
  activeAvatar.value = { index, coordIndex };
};

const handleAvatarMouseLeave = () => {
  activeAvatar.value = { index: null, coordIndex: null };
};
</script>

<style scoped>
.scene {
  position: relative;
  width: 100%;
  height: 100vh; 
  background-position: center;
}
</style>
