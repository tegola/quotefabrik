<template>
  <div>
    <ul>
      <li v-for="quote in quotes" :key="quote.id">
        <div>{{ quote.text }}</div>
        <div>{{ quote.author }}</div>
        <small>Added {{ formatDate(quote.created_at.toDate()) }}</small>
        <button @click="copy(quote)">Copy</button>
      </li>
    </ul>

    <textarea ref="copyArea" readonly tabindex="-1"></textarea>
  </div>
</template>

<script>
export default {
  name: 'QuoteList',

  props: {
    quotes: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    copy(quote) {
      const el = this.$refs.copyArea
      const text = [quote.text, quote.author]
        .filter(i => i)
        .join('\n\n–');

      el.value = text
      el.select();
      document.execCommand('copy')
      el.value = ''
    },

    formatDate(date) {
      return date.toLocaleString('en', {
        dateStyle: 'long',
        timeStyle: 'short'
      })
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