<template>
  <div class="item" tabindex="0">
    <div>
      <blockquote class="quote" v-html="highlight(quote.text)" />
      <cite class="author" v-html="highlight(author)" />
    </div>
    <div class="actions">
      <CopyButton :text="quote.text" :author="author" />
      <slot name="actions">
        <button type="button" class="button" @click="deleteQuote">Delete</button>
      </slot>
    </div>
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

    author() {
      return this.quote.author || 'anonymous'
    }
  },

  methods: {
    highlight(content) {
      if (this.filter) {
        const re = new RegExp(this.filter.replace(' ', '|'), 'ig')
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
  outline: none;
}
.item:hover {
  background-color: white;
  box-shadow: var(--box-shadow);
}

/* Content */
.quote {
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.25rem;
  line-height: 1.35;
}
.author {
  margin-top: 0.5rem;
  display: block;
  font-style: normal;
  color: var(--muted);
}

/* Actions */
.actions {
  flex-shrink: 1;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Highlight */
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
