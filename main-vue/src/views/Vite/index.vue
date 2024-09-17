<template>
  <!--单例模式，name相同则复用一个无界实例，改变url则子应用重新渲染实例到对应路由 -->
  <WujieVue width="100%" height="100%" name="vite" :url="viteUrl"></WujieVue>
</template>

<script>
import hostMap from '../../wujie-config/hostMap'
export default {
  name: "vite",
  computed: {
    viteUrl() {
      const path = (this.$route.params.path || '');
      console.log("path:", path)
      return hostMap("//localhost:5173/") + path;
    },
  },
}
</script>
<style lang="scss" scoped>
.vite {}
</style>