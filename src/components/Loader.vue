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
/* Default */
.loader {
  display: inline-flex;
  justify-content: center;
}
.dot {
  margin: 0 0.15rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--color, var(--dark));
  border-radius: 50%;
  animation: dot 1s infinite ease-in-out;
}
.dot:nth-child(2) {
  animation-delay: 250ms;
}
.dot:nth-child(3) {
  animation-delay: 500ms;
}

/* Small */
.loader--sm .dot {
  width: 0.25rem;
  height: 0.25rem;
}

@keyframes dot {
  /* 2 steps to keep the element centered */
  25% {
    transform: translateY(-0.25em)
  }
  75% {
    transform: translateY(0.25em)
  }
}
</style>
