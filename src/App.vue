<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  watch:{
    $route(to, from) {
      const id = to.meta.id
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
