<template>
  <div class="loader" title="Loading...">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
.loader {
  display: inline-flex;
}
.dot {
  margin: 0.15rem;
  width: 0.25rem;
  height: 0.25rem;
  background-color: var(--color, var(--dark));
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
    transform: translateY(0.25rem);
  }
  50% {
    transform: translateY(-0.25rem);
  }
}
</style>
