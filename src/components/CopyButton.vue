<template>
  <span>
    <a href type="button" @click.prevent="copy">Copy</a>
    <textarea ref="textarea" readonly tabindex="-1"></textarea>
  </span>
</template>

<script>
export default {
  name: 'CopyButton',

  props: {
    quote: {
      type: Object,
      required: true
    }
  },

  methods: {
    copy() {
      const el = this.$refs.textarea
      const text = [this.quote.text, this.quote.author]
        .filter(i => i)
        .join('\n –');

      el.value = text
      el.select();
      document.execCommand('copy')
      el.value = ''
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
