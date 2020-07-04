<template>
  <form @submit.prevent="submit" @reset="hide">
    <div class="form-field">
      <label class="form-field__label" for="text">Quote</label>
      <textarea class="form-input" v-model="text" id="text" rows="5"></textarea>
    </div>

    <div class="form-field">
      <label class="form-field__label" for="author">Author</label>
      <input class="form-input" type="text" v-model="author" id="author" placeholder="(optional)">
    </div>

    <button class="button" type="reset">Cancel</button>
    <button class="button" type="submit" :disabled="!canSubmit">Save</button>

    <p v-if="saving">Saving...</p>

    <p class="bookmarklet">
      Tip: Save quote from anywhere. Drag the following element to your bookmarks bar:<br>
      <a :href="bookmarklet" @click.prevent>Save quote</a>
    </p>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AddForm',

  data() {
    return {
      saving: false,
      text: '',
      author: '',
    }
  },

  computed: {
    ...mapState(['user', 'bookmarkletText']),

    canSubmit() {
      return !!this.text
    },

    bookmarklet() {
      return `javascript:(function(){location='${location.href}?t='+encodeURIComponent(document.getSelection().toString())})()`;
    }
  },

  mounted() {
    if (this.bookmarkletText) {
      this.text = this.bookmarkletText
      this.$store.commit('setBookmarkletText', '')
    }
  },

  methods: {
    async submit() {
      this.saving = true

      try {
        await this.$store.dispatch('addQuote', {
          text: this.text,
          author: this.author
        })

        this.text = ''
        this.author = ''
        this.hide()
      } catch (e) {
        alert('There was an error while trying to save this quote.')
      } finally {
        this.saving = false
      }
    },

    hide() {
      this.$store.commit('setFormOpen', false)
    }
  }
}
</script>

<style scoped>
.bookmarklet {
  text-align: center;
  font-size: 0.9rem;
  color: var(--gray);
}
</style>
