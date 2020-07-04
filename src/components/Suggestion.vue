<template>
  <div>
    <div v-if="current">
      {{ current.text }}<br>
      {{ current.author }}
    </div>
    <button class="button" type="button" @click="random">Another</button>
    <button class="button" type="button" @click="hide">Close</button>
  </div>
</template>

<script>
export default {
  name: 'Suggestion',

  data() {
    return {
      quotes: [],
      current: null
    }
  },

  async mounted() {
    try {
      const response = await fetch('https://type.fit/api/quotes')
      const quotes = await response.json()

      if (quotes && quotes.length) {
        this.quotes = quotes
        this.random()
      }
    } catch (e) {
      // ...
    }
  },

  methods: {
    random() {
      const index = Math.floor(Math.random() * (this.quotes.length - 0)) + 0

      this.current = this.quotes[index];
    },

    hide() {
      this.$store.commit('setSuggestionOpen', false)
    }
  }
}
</script>

<style>

</style>
