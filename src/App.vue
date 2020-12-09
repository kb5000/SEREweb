<template>
  <div id="app">
    <el-container>
      <el-header>
        <navigation />
      </el-header>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
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
  background-image: url("assets/background.png");
  background-size: 100%;
}
</style>
