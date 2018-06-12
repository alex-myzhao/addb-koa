<template>
  <div id="app">
    <top-bar v-if="isLogin"/>
    <router-view/>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'

export default {
  name: 'App',
  components: {
    TopBar
  },
  computed: {
    isLogin () {
      return this.$store.state.islogin
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
