<template>
  <div class="scene" :style="backgroundStyle" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
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
    <div v-if="props.mode === 'reveal'" class="overlay">
      <div v-if="targetAvatar" class="spotlight" :style="spotlightStyle"></div>
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

const targetAvatar = computed(() => {
  let target = null;
  props.step.avatarMatrix.forEach((avatar, index) => {
    if (avatar.coordinates.length === 1) {
      target = { index, coord: avatar.coordinates[0] };
    }
  });
  return target;
});

const spotlightStyle = computed(() => {
  if (!targetAvatar.value) return {};
  const size = 200; // Adjust the size of the spotlight
  return {
    top: `calc(${targetAvatar.value.coord.y * 100}% - ${size / 2}px)`,
    left: `calc(${targetAvatar.value.coord.x * 100}% - ${size / 2}px)`,
    width: `${size}px`,
    height: `${size}px`
  };
});

const isAvatarActive = (index, coordIndex) => {
  if (props.mode === 'reveal' && targetAvatar.value) {
    return targetAvatar.value.index === index && coordIndex === 0;
  }
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

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 5;
  pointer-events: none;
}

.spotlight {
  position: absolute;
  border-radius: 50%;
  width: 200px; /* Adjust the size as needed */
  height: 200px; /* Adjust the size as needed */
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 70%, rgba(0, 0, 0, 0.8) 100%);
  pointer-events: none;
  z-index: 10;
}
</style>
