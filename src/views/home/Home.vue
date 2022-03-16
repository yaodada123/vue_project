<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import {getHomeMultidata} from "../../network/home"

export default {
  components: { NavBar },
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  created() {
      // 1.请求多个数据
      getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(res);
      })
    }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  /* background-color: var(--color-tint); */
  color: #fff;
}
</style>
