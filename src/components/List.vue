<template>
  <ul class="quote-list">
    <li v-for="quote in quotes" :key="quote.id" class="item">
      <div>
        <blockquote class="quote" v-html="highlight(quote.text)" />
        <cite class="author" v-html="highlight(quote.author)" />
        <small>Added {{ formatDate(quote.created_at.toDate()) }}</small>
      </div>
      <CopyButton :quote="quote" />
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'List',

  props: {
    quotes: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    ...mapState(['filter'])
  },

  methods: {
    highlight(content) {
      if (this.filter) {
        const re = new RegExp(this.filter, 'ig')
        return content.replace(re, match => {
          return `<span class="highlight">${match}</span>`
        })
      } else {
        return content
      }
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
.quote-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
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
  box-shadow: 0 1px 2px rgba(var(--black-rgb), 0.25), 0 3px 5px rgba(var(--black-rgb), 0.1);
}
.quote {
  margin: 0;
  font-size: 1.25rem;
}
.author {
  display: block;
  font-style: normal;
}
/deep/ .highlight {
  position: relative;
}
/deep/ .highlight::before {
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
