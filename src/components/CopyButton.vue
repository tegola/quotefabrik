<template>
  <span>
    <button type="button" class="button" @click.prevent="copy">
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
      }, 1000)
    }
  }
}
</script>

<style scoped>
textarea {
  position: absolute;
  left: -10000px;
}
</style>
