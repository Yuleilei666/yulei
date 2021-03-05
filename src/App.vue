<template>
  <div id="app">
    <GetImage></GetImage>
  </div>
</template>

<script>
import GetImage from './components/GetImage.vue';
export default {
  name: 'app',
  components: {
    GetImage
  }
};
</script>

<style>
#app {
  width: 1200px;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
