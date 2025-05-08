<template>
  <div class="error-modal">
    <div class="modal-content">
      <p>{{ message }}</p>
      <button @click="close">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);
const close = () => emit('close');

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    emit('close');
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>
<style lang="scss" scoped>
@import '../assets/variables';
.error-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}

.modal-content {
  background-color: white;

  padding: 40px 30px;
  border-radius: 8px;
  text-align: center;
}
.modal-content p {
  color: $font-primary;
  font-family: $font-family;
}
button {
  padding: 10px 20px;
  margin-top: 40px;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
