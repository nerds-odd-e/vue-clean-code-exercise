<template>
  <div id="app">
    <Header></Header>
    <router-view style="text-align: center;"></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Header,
  }
}
</script>

<style>
  @import "./assets/main.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: x-large;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
