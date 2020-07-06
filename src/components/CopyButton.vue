<template>
  <Button
    variant="white"
    icon="copy"
    icon-only
    :class="copied ? 'zoom' : null"
    @click.prevent="copy">
    Copy
    <textarea ref="textarea" readonly tabindex="-1"></textarea>
  </Button>
</template>

<script>
export default {
  name: 'CopyButton',

  props: {
    quote: Object
  },

  data() {
    return {
      copied: false
    }
  },

  methods: {
    copy() {
      const el = this.$refs.textarea
      const text = [this.quote.text, `(${this.quote.author})`]
        .filter(i => i) // remove empty
        .join('\n');

      el.value = text
      el.select();
      document.execCommand('copy')
      el.value = ''

      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 800)
    }
  }
}
</script>

<style scoped>
textarea {
  position: absolute;
  left: -10000px;
}
.zoom {
  pointer-events: none;
  animation: zoom 800ms
}
@keyframes zoom {
  10% {
    transform: scale(0.8);
    opacity: 1;
  }
  70% {
    transform: scale(3);
    opacity: 0;
  }
  71% {
    transform: scale(1);
  }
  72% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
