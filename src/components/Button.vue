<template>
  <component
    :is="tag"
    :type="type"
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners">
    <Icon
      v-if="icon"
      :name="icon"
      class="button__icon"
    />
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'button',
    },

    type: {
      type: String,
      default: 'button'
    },

    size: {
      type: String,
      default: null
    },

    icon: {
      type: String,
      default: null
    }
  },

  computed: {
    classes() {
      return [
        'button',
        this.size ? `button--${this.size}` : null
      ]
    }
  }
}
</script>

<style scoped>
/* Default */
.button {
  padding: 0.5rem;
  background-color: var(--dark);
  color: white;
  border: 0;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  font-size: 0.9rem;
  line-height: 1.25rem;
  letter-spacing: 0.05em;
  transition: 200ms;
  cursor: pointer;
}
.button:disabled {
  color: rgba(255, 255, 255, 0.5);
}
.button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(var(--dark-rgb), 0.25);
}
.button:active {
  opacity: var(--active-opacity);
}

/* Small */
.button--sm {
  font-size: 0.75rem;
  padding: 0.25em 0.5rem;
  line-height: initial;
}
.button--sm .button__icon {
  width: 16px;
  height: 16px;
}
</style>
