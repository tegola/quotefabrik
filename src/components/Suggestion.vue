<template>
  <div class="suggestion">
    <div>
      <div class="head">
        <p class="head__label">Suggested</p>
        <div>
          <Button
            v-if="currentQuote"
            size="sm"
            icon="shuffle"
            @click="random">
            Get another
          </Button>
          &nbsp;
          <Button
            size="sm"
            icon="close"
            @click="hide">
            Hide
          </Button>
        </div>
      </div>

      <Loader v-if="loading" size="lg" />

      <Item v-else-if="currentQuote" :quote="currentQuote">
        <template #actions>
          <Button @click="add">
            <Icon name="plus" />
          </Button>
        </template>
      </Item>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Suggestion',

  data() {
    return {
      index: null
    }
  },

  computed: {
    ...mapState({
      loading: 'loadingSuggestions',
      quotes: 'suggestions'
    }),

    currentQuote() {
      return this.quotes[this.index]
    }
  },

  async created() {
    this.random()
  },

  methods: {
    random() {
      this.index = Math.floor(Math.random() * (this.quotes.length - 0)) + 0
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
  margin: 0;
}

/* Loader */
.loader {
  display: flex;
  margin: 2rem auto;
  --color: var(--muted);
}

/* Item */
.item {
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>
