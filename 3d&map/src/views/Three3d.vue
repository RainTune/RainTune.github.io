<template>
<div>
  <div class="three3d" ref="three">

  </div>
  <a href="/简历.pdf" class="link">简历地址</a>
  <router-link to="/map" class="link2">炫酷中国地图</router-link>
</div>
</template>

<script>
import {Application} from './my3d';

export default {
  name: 'Three3d',
  mounted(){
    new Application('.three3d')
  },
}
</script>
<style lang="scss" scoped>
.three3d{}
.link{
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translate(-50%, 0);
  font-size: 18px;
}
.link2 {
   position: fixed;
  left: 50%;
  top: 80px;
  transform: translate(-50%, 0);
  font-size: 18px;
}
</style>