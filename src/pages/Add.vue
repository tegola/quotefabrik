<template>
  <form class="add-form" @submit.prevent="submit">
    <div class="form-field">
      <label class="form-field__label" for="text">Quote</label>
      <textarea
        ref="quoteField"
        class="form-input"
        rows="5"
        v-model="text"
        id="text"
      />
    </div>

    <div class="form-field">
      <label class="form-field__label" for="author">Author</label>
      <input
        class="form-input"
        type="text"
        v-model="author"
        autocorrect="off"
        spellcheck="false"
        id="author"
        placeholder="(optional)">
    </div>

    <Button tag="router-link" to="/" variant="light">Cancel</Button>
    <Button type="submit" :disabled="!canSubmit">
      <Loader v-if="saving" size="sm" />
      <template v-else>Save</template>
    </Button>

    <p class="bookmarklet">
      Tip: Save quote from anywhere. Drag the following element to your bookmarks bar:<br>
      <a :href="bookmarklet" @click.prevent>Save quote</a>
    </p>
  </form>
</template>

<script>
export default {
  name: 'Add',

  data() {
    return {
      saving: false,
      text: '',
      author: '',
    }
  },

  computed: {
    canSubmit() {
      return !!this.text
    },

    bookmarklet() {
      return `javascript:(function(){location='${location.href}?t='+encodeURIComponent(document.getSelection().toString())})()`;
    }
  },

  mounted() {
    this.$refs.quoteField.focus()
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
        this.$router.go('/')
      } catch (e) {
        alert('There was an error while trying to save this quote.')
      } finally {
        this.saving = false
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.t) {
        vm.text = to.query.t
      }
    })
  }
}
</script>

<style>
.add-form {
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  padding: 1rem;
}
.bookmarklet {
  border-top: 1px solid var(--separator-color);
  margin-bottom: 0;
}
</style>
