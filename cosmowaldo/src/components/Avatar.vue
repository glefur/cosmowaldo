<template>
  <div 
    class="avatar" 
    :style="avatarStyle" 
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave" 
    @click="handleClick"
    :class="{ active: isActive }">
    <div v-show="showCross" class="cross-icon" :class="{ 'fade-out': !showCrossVisible }">
      <i-fa-times style="color: #ff0000" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue';
import { calculateAvatarPosition } from '../utils/position.js';

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
  },
  size: {
    type: Number,
    default: 50
  },
  sceneWidth: {
    type: Number,
    required: true
  },
  sceneHeight: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['mousemove', 'mouseleave', 'click']);

const showCross = ref(false);
const showCrossVisible = ref(false);

const avatarStyle = computed(() => {
  const { top, left, size } = calculateAvatarPosition(props.coordinates, props.sceneWidth, props.sceneHeight, props.size, props.isActive, props.mode);

  return {
    backgroundImage: `url(http://localhost:3000${props.avatarPath})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: top,
    left: left,
    width: size,
    height: size,
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
      showCrossVisible.value = true;
      setTimeout(() => {
        showCrossVisible.value = false;
      }, 1000); // Fade out after 1 second
      setTimeout(() => {
        showCross.value = false;
      }, 3000); // Remove from DOM after 3 seconds
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
  transition: transform 0.2s, z-index 0.2s, top 0.2s, left 0.2s; /* Ajouter une transition pour l'agrandissement et le changement de z-index */
}

.avatar.active {
  transform: scale(1.5); /* Agrandir de 50% */
  z-index: 10; /* Mettre au-dessus des autres */
}

.cross-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  opacity: 1;
  transition: opacity 2s ease-out; /* Transition plus longue pour un fade out progressif */
}

.cross-icon.fade-out {
  opacity: 0;
}
</style>
