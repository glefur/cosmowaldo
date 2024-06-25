<template>
  <BCard
    :style="cardStyle"
    no-body
    class="dashboard-card"
  >
    <BCardHeader class="dashboard-card-header">{{ title }}</BCardHeader>
    <BCardBody>
      <slot></slot>
    </BCardBody>
  </BCard>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  cardStyle: {
    type: Object,
    default: () => ({ border: '0px', borderRadius: '0%' })
  }
});
</script>

<style scoped>
.dashboard-card-header {
  position: relative;
  font-weight: bold;
  background-color: #fff;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee; /* Ajoute une ligne de démarcation */
}

.dashboard-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Légère ombre sous la carte */
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
