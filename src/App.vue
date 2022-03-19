<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar class="mainTabBar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar.vue"

export default {
  name: 'App',
  components: {
    MainTabBar
    
  }
}
</script>

<style>
@import url("./assets/css/base.css");
.mainTabBar {
  z-index: 10;
}
</style>
