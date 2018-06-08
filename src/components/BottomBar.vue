<template>
<div id="bottom-bar">
  <span>Version {{ version }}</span>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    version () {
      return this.$store.state.version
    }
  }
}
</script>

<style>
#bottom-bar {
  background-color: #EEF1F6;
  height: 20px;
}
</style>
