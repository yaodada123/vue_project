<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- <tab-control
        :items="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        v-show="isTabFixed"
      ></tab-control> -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="backTopClick"  :pull-up-load="true" @pullingUp = "uploadMore" 
     >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :items="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <ul>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
    </ul> -->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import GoodsList from "../../components/content/goods/GoodsList";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import NavBar from "@/components/common/navbar/NavBar.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import BackTop from "@/components/common/backtop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "@/network/home";

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      /* 获取首页数据*/
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY: 0,
    };
  },
  created() {
    // 生命周期函数，在启动项目时即执行函数获取数据
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // console.log(this.goods['pop'].list);
  },
  methods: {
    tabClick(index) {
      if (index == 0) this.currentType = "pop";
      else if (index == 1) this.currentType = "new";
      else this.currentType = "sell";
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
      //  返回顶部按钮事件
      this.$refs.scroll.scrollTo(0, 0);
    },

    backTopClick(position) {
      // 判断滚动位置事件
      // console.log(position);
      // 判断backTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // console.log(this.isShowBackTop);
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    uploadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
      // console.log('-----');
    },

    /**
     * 网络请求函数，对函数做一层封装，避免created()生命周期函数臃肿
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(res);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  }
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
