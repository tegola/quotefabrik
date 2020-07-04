<template>
  <div class="item" tabindex="0">
    <div class="body">
      <blockquote class="quote" v-html="highlight(quote.text)" />
      <cite class="author" v-html="highlight(author)" />
    </div>
    <div class="actions">
      <CopyButton :quote="quote" />
      <slot name="actions">
        <Button
          variant="white"
          icon="trash"
          icon-only
          title="Delete"
          @click="deleteQuote"
        />
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
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius);
  transition: var(--transition-duration);
  cursor: pointer;
  outline: none;
}
.item:hover {
  background-color: white;
  box-shadow: var(--box-shadow);
}

/* Body */
.quote {
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.15rem;
  line-height: 1.5;
}
.author {
  margin-top: 0.5rem;
  display: block;
  font-style: normal;
  color: var(--muted);
}

/* Actions */
.actions {
  display: flex;
  justify-content: flex-end;
}
.actions .button + .button {
  margin-left: 0.25rem;
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

@media screen and (min-width: 768px) {
  .item {
    flex-direction: row;
  }
  .body {
    align-self: center;
  }
  .actions {
    flex-direction: column;
    flex-shrink: 1;
    justify-content: center;
    border-top: 0;
    padding-top: 0;
    border-left: 1px solid var(--separator-color);
    padding-left: 1rem;
    margin-left: 1rem;
  }
  .actions .button + .button {
    margin-left: 0;
    margin-top: 0.25rem;
  }
}
@media (hover: hover) {
  .actions {
    opacity: 0;
    transition: var(--transition-duration);
  }
  .item:hover .actions {
    opacity: 1;
  }
}
</style>
