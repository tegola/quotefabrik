<template>
  <div class="item">
    <div>
      <blockquote class="quote" v-html="highlight(quote.text)" />
      <cite v-if="quote.author" class="author" v-html="highlight(quote.author)" />
      <cite v-else class="author">Anonymous</cite>
      <small>Added {{ formattedDate }}</small>
    </div>
    <CopyButton :quote="quote" />
    <button type="button" class="button" @click="deleteQuote">Delete</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Item',

  props: {
    quote: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState(['filter']),

    formattedDate() {
      return this.quote.created_at.toDate().toLocaleString('en', {
        dateStyle: 'long',
        timeStyle: 'short'
      })
    }
  },

  methods: {
    highlight(content) {
      if (this.filter) {
        const re = new RegExp(this.filter, 'ig')
        const scopeId = this.$options._scopeId

        return content.replace(re, match => {
          return `<span ${scopeId} class="highlight">${match}</span>`
        })
      } else {
        return content
      }
    },

    deleteQuote() {
      if (confirm('Delete the selected quote?')) {
        this.$store.dispatch('deleteQuote', this.quote.id)
      }
    }
  }
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius);
  transition: 200ms;
  cursor: pointer;
}
.item:hover {
  background-color: white;
  box-shadow: var(--box-shadow);
}
.quote {
  margin: 0;
  font-size: 1.25rem;
}
.author {
  display: block;
  font-style: normal;
}
.highlight {
  position: relative;
}
.highlight::before {
  content: '';
  position: absolute;
  top: 0;
  left: -0.3rem;
  right: -0.3rem;
  bottom: -0.1rem;
  background-color: #fe0;
  border-radius: var(--radius);
  z-index: -1;
  animation: highlight 300ms;
}
@keyframes highlight {
  50% {
    transform: scale(1.2);
  }
}
</style>
