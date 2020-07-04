<template>
  <span class="copy-button">
    <button type="button" class="button" title="Copy" @click.prevent="copy">
      <Icon name="copy" />
    </button>
    <button v-if="copied" type="button" class="button zoom">
      <Icon name="copy" />
    </button>
    <textarea ref="textarea" readonly tabindex="-1"></textarea>
  </span>
</template>

<script>
export default {
  name: 'CopyButton',

  props: {
    text: String,
    author: String,
  },

  data() {
    return {
      copied: false
    }
  },

  methods: {
    copy() {
      const el = this.$refs.textarea
      const text = [this.text, `(${this.author})`]
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
