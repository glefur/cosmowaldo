<template>
  <div 
    class="avatar" 
    :style="avatarStyle" 
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave" 
    @click="handleClick"
    :class="{ active: isActive }">
    <div v-if="showCross" class="cross-icon" :class="{ 'fade-out': !showCross }">
      <i-fa-times style="color: #ff0000" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue';

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
  },
  isTarget: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['mousemove', 'mouseleave', 'click']);

const showCross = ref(false);

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
    top: `calc(${props.coordinates.y * 100}% - ${size / 2}px)`,
    left: `calc(${props.coordinates.x * 100}% - ${size / 2}px)`,
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

const handleClick = () => {
  if (props.mode === 'game') {
    if (props.isTarget) {
      emit('click', true); // Player clicked on the correct avatar
    } else {
      showCross.value = true;
      setTimeout(() => {
        showCross.value = false;
      }, 1000); // Show the cross for 1 second before starting the fade out
      setTimeout(() => {
        // Remove the cross after the fade-out transition
        showCross.value = false;
      }, 3000); // Show and fade out the cross for a total of 3 seconds
      emit('click', false); // Player clicked on the wrong avatar
    }
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

.cross-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  opacity: 1;
  transition: opacity 5s ease-out; /* Transition plus longue pour un fade out progressif */
}

.cross-icon.fade-out {
  opacity: 0;
}
</style>
