<template>
  <form @submit.prevent="add">
    <div class="form-field">
      <label class="form-field__label" for="text">Quote</label>
      <textarea v-model="text" id="text"></textarea>
    </div>
    <div class="form-field">
      <label class="form-field__label" for="author">Author</label>
      <input type="text" v-model="author" id="author" placeholder="(optional)">
    </div>
    <button type="submit">Save</button>
    <p v-if="saving">Saving...</p>
  </form>
</template>

<script>
import { db } from '@/firebase'

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
    user() {
      return this.$root.user
    }
  },

  methods: {
    async add() {
      this.saving = true
      try {
        await db.collection('quotes').add({
          user_id: this.user.uid,
          text: this.text,
          author: this.author,
          created_at: new Date()
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
