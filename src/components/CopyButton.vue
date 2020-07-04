<template>
  <span class="copy-button">
    <Button title="Copy" @click.prevent="copy">
      <Icon name="copy" />
    </Button>
    <Button v-if="copied" class="zoom">
      <Icon name="copy" />
    </Button>
    <textarea ref="textarea" readonly tabindex="-1"></textarea>
  </span>
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
      }, 400)
    }
  }
}
</script>

<style scoped>
.copy-button {
  position: relative;
}
textarea {
  position: absolute;
  left: -10000px;
}
.zoom {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  animation: zoom 300ms
}
@keyframes zoom {
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>
