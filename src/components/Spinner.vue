<template>
  <div class="spinner" title="Loading...">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style scoped>
.spinner {
  display: flex;
}
.dot {
  margin: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--black);
  border-radius: 50%;
  animation: dot 1s infinite;
}
.dot:nth-child(2) {
  animation-delay: 250ms;
}
.dot:nth-child(3) {
  animation-delay: 500ms;
}
@keyframes dot {
  /* 2 steps to keep the element centered */
  0%, 100% {
    transform: translateY(0.5rem);
  }
  50% {
    transform: translateY(-0.5rem);
  }
}
</style>