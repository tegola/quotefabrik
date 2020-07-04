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
      default: 'button'
    },

    type: {
      type: String,
      default: 'button'
    },

    size: {
      type: String,
      default: null
    },

    variant: {
      type: String,
      default: 'dark'
    },

    icon: {
      type: String,
      default: null
    },

    iconOnly: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      return [
        'button',
        this.size ? `button--${this.size}` : null,
        this.variant ? `button--${this.variant}` : null,
        this.icon && this.iconOnly ? 'button--icon-only' : null
      ]
    }
  }
}
</script>

<style scoped>
/* Default */
.button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: inherit;
  border: 0;
  border-radius: var(--radius-pill);
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 1.25rem;
  letter-spacing: 0.05em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: var(--transition-duration);
}
.button:focus {
  outline: none;
}
.button:focus:not(:active) {
  outline: none;
  box-shadow: 0 0 0 2px rgba(var(--dark-rgb), 0.25);
}
.button:active {
  opacity: 0.75;
}

/* Dark */
.button--dark {
  background-color: var(--dark);
  color: white;
}
.button--dark:disabled {
  color: rgba(255, 255, 255, 0.5);
}

/* Light */
.button--light {
  background-color: var(--light);
  color: var(--dark);
}

/* White */
.button--white {
  background-color: white;
  color: var(--dark);
}

/* Small */
.button--sm {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  line-height: initial;
}
.button--sm .button__icon {
  width: 16px;
  height: 16px;
}

/* Icon only */
.button--icon-only {
  padding: 0.5rem;
}
.button--sm.button--icon-only {
  padding: 0.25rem;
}
</style>
