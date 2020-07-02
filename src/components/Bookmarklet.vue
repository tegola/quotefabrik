<template>
  <a :href="href" @click.prevent>Save quote</a>
</template>

<script>
export default {
  name: 'Bookmarklet',

  computed: {
    href() {
      return `javascript:(function(){location='${location.href}?t='+encodeURIComponent(document.getSelection().toString())})()`;
    }
  }
}
</script>
