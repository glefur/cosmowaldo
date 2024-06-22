<template>
  <div 
    class="avatar" 
    :style="avatarStyle" 
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave" 
    :class="{ active: isActive }">
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  avatarPath: {
    type: String,
    required: true
  },
  coordinates: {
    type: Object,
    required: true
  },
  mode: {
    type: String,
    default: 'display'
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['mousemove', 'mouseleave']);

const avatarStyle = computed(() => {
  let size = 50;
  if (props.isActive && props.mode === 'game') {
    size *= 1.2; // Agrandir de 20% si actif et en mode jeu
  }
  return {
    backgroundImage: `url(http://localhost:3000${props.avatarPath})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: `${props.coordinates.y * 100}%`,
    left: `${props.coordinates.x * 100}%`,
    width: `${size}px`,
    height: `${size}px`,
    zIndex: props.isActive ? 10 : 1 // Mettre au-dessus des autres si actif
  };
});

const handleMouseMove = (event) => {
  if (props.mode === 'game') {
    emit('mousemove', event);
  }
};

const handleMouseLeave = () => {
  if (props.mode === 'game') {
    emit('mouseleave');
  }
};
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s, z-index 0.2s; /* Ajouter une transition pour l'agrandissement et le changement de z-index */
}

.avatar.active {
  transform: scale(1.2); /* Agrandir de 20% */
  z-index: 10; /* Mettre au-dessus des autres */
}
</style>
