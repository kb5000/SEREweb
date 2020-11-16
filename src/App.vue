<template>
  <div id="app">
    <navigation />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import navigation from './components/navigation'

export default {
  name: 'App',
  components: {
    navigation
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
}
</style>
