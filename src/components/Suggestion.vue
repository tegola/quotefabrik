<template>
  <div>
    <div v-if="current">
      <div>
        {{ current.text }}<br>
        {{ current.author }}
      </div>

      <button class="button" type="button" @click="random">Another</button>
      <button class="button" type="button" @click="add">Add</button>
      <button class="button" type="button" @click="hide">Close</button>
    </div>
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

      if (!quotes || !quotes.length) {
        throw new Error('No quotes found.');
      }

      this.quotes = quotes
      this.random()
    } catch (e) {
      this.hide()
    }
  },

  methods: {
    random() {
      const index = Math.floor(Math.random() * (this.quotes.length - 0)) + 0

      this.current = this.quotes[index];
    },

    async add() {
      try {
        await this.$store.dispatch('addQuote', {
          text: this.current.text,
          author: this.current.author
        })

        this.random()
      } catch (e) {
        alert('There was an error while trying to save this quote.')
      }
    },

    hide() {
      this.$store.commit('setSuggestionOpen', false)
    }
  }
}
</script>

<style>

</style>
