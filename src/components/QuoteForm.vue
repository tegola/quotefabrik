<template>
  <form @submit.prevent="add">
    <div class="form-field">
      <label class="form-field__label" for="text">Quote</label>
      <textarea class="form-input" v-model="text" id="text"></textarea>
    </div>

    <div class="form-field">
      <label class="form-field__label" for="author">Author</label>
      <input class="form-input" type="text" v-model="author" id="author" placeholder="(optional)">
    </div>

    <button class="button" type="submit" :disabled="!canSubmit">Save</button>

    <p v-if="saving">Saving...</p>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'QuoteForm',

  data() {
    return {
      saving: false,
      text: '',
      author: '',
    }
  },

  computed: {
    ...mapState(['user']),

    canSubmit() {
      return !!this.text
    }
  },

  created() {
    // Handle bookmarklet input and clean url
    // FIXME: Doesn't work with IE (any version)
    const urlParams = new URLSearchParams(location.search)
    const params = Object.fromEntries(urlParams.entries())

    if (params.t) {
      this.text = params.t
      history.replaceState({}, '', location.href.replace(location.search, ''))
    }
  },

  methods: {
    async add() {
      this.saving = true

      try {
        await this.$store.dispatch('addQuote', {
          text: this.text,
          author: this.author
        })

        this.text = ''
        this.author = ''
      } catch (e) {
        alert('There was an error while trying to save this quote.')
      } finally {
        this.saving = false
      }
    }
  }
}
</script>
