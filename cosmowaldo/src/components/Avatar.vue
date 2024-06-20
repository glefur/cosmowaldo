<template>
  <div class="avatar" :style="avatarStyle"></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  avatarPath: {
    type: String,
    required: true
  },
  coordinates: {
    type: Object,
    required: true
  }
});

const avatarStyle = computed(() => ({
  backgroundImage: `url(http://localhost:3000${props.avatarPath})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
  top: `${props.coordinates.y * 100}%`,
  left: `${props.coordinates.x * 100}%`,
  width: '50px', // ajustez selon vos besoins
  height: '50px' // ajustez selon vos besoins
}));
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
