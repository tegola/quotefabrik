<template>
  <div class="suggestion">
    <div>
      <div class="head">
        <h3 class="head__label">Suggestion</h3>
        <div>
          <a v-if="currentQuote" class="head__link" type="button" @click="random">
            <Icon name="shuffle" />Get another
          </a>
          <a class="head__link" type="button" @click="hide">
            <Icon name="close" />Hide
          </a>
        </div>
      </div>

      <Loader v-if="loading" />

      <Item v-else-if="currentQuote" :quote="currentQuote">
        <template #actions>
          <button class="button" type="button" @click="add">
            <Icon name="plus" />
          </button>
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
      loading: false,
      quotes: [],
      currentQuote: null
    }
  },

  async mounted() {
    this.loading = true

    try {
      const response = await fetch('https://type.fit/api/quotes')
      const quotes = await response.json()

      if (!quotes || !quotes.length) {
        throw new Error('No quotes found.');
      }

      this.quotes = quotes
      this.loading = false
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

<style scoped>
.suggestion {
  background-color: rgba(var(--dark-rgb), 0.05);
  margin: 1rem 0.25rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
}

/* Head */
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0 0.5rem;
  color: var(--muted);
  border-bottom: 1px solid rgba(var(--dark-rgb), 0.05);
}
.head__label {
  font-size: 0.9rem;
  margin: 0;
}

/* Loader */
.loader {
  display: flex;
  margin: 2rem auto;
  --color: var(--muted);
}
.loader /deep/ .dot {
  width: 0.5rem;
  height: 0.5rem;
}

/* Item */
.item {
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>
