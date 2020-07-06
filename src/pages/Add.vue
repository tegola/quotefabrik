<template>
  <div>
    <form class="form" @submit.prevent="submit">
      <div class="header">
        <h2 class="title">Add new quote</h2>
      </div>
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

      <div class="footer">
        <Button tag="router-link" to="/" variant="light">Cancel</Button>
        <Button type="submit" :disabled="!canSubmit">
          <Loader v-if="saving" size="sm" />
          <template v-else>Save</template>
        </Button>
      </div>
    </form>

    <p class="tip">
      Save quotes from anywhere.<br>
      Drag the following element to your bookmarks bar:<br>
      <a :href="bookmarklet" class="bookmarklet">Save quote</a>
    </p>
  </div>
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
        this.$router.push('/')
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

<style scoped>
.form {
  background-color: white;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  padding: 1rem;
}
.header {
  text-align: center;
  border-bottom: 1px solid var(--separator-color);
  padding: 0 0 1rem;
  margin-bottom: 1rem;
}
.title {
  margin: 0;
}
.footer {
  display: flex;
  justify-content: space-between;
}
.tip {
  text-align: center;
  color: var(--muted);
  line-height: 1.5;
  margin-top: 2rem;
}
.bookmarklet {
  display: inline-block;
  margin-top: 0.25rem;
  border-radius: var(--radius-pill);
  background-color: var(--muted);
  color: white;
  text-decoration: none;
  padding: 0.25rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}
</style>
