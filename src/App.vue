<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <GamePlay />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import GamePlay from './components/GamePlay.vue'

export default {
  name: 'App',
  components: {
    HelloWorld, GamePlay
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>
