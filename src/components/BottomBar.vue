<template>
<div id="bottom-bar">
  <span>Version {{ version }}</span>
</div>
</template>

<script>
import ClientConfig from '@/client-config'

export default {
  data () {
    return {}
  },
  computed: {
    version () {
      return ClientConfig.VERSION
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
