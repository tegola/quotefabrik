<template>
  <div>
    <div v-if="currentQuote">
      <p>Suggestion</p>
      <button class="button" type="button" @click="random">Another</button>
      <button class="button" type="button" @click="hide">Hide</button>
      <Item :quote="currentQuote">
        <template #actions>
          <button class="button" type="button" @click="add">Add</button>
        </template>
      </Item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Suggestion',

  data() {
    return {
      quotes: [],
      currentQuote: null
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

      this.currentQuote = this.quotes[index];
    },

    async add() {
      try {
        await this.$store.dispatch('addQuote', this.currentQuote)

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
