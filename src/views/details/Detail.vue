<template>
  <div id="detail">
    <!-- 导航条 -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>

    <scroll class="content">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>

      <!-- 商品基本信息页 -->
      <detail-base-info :goods="goods"></detail-base-info>

      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>

      <!-- 商品详情页 -->
      <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>

      <!-- 商品参数信息 -->
      <detail-param-info :paramInfo="goodsparam"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";

import { getDetails, Goods, Shop, GoodsParam } from "../../network/detail";

import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from './childComps/DetailParamInfo.vue';

export default {
  name: "Detail",

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsparam: {},
    };
  },

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;
    // console.log(this.iid);

    // 根据iid发送网络请求获取详细数据
    getDetails(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // console.log(data);
      // 获取轮播图片
      this.topImages = data.itemInfo.topImages;
      // 获取商品基本信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 获取商品详情数据
      this.detailInfo = data.detailInfo;
      // 获取商品参数信息
      this.goodsparam = new GoodsParam(data.itemParams.info, data.itemParams.rule )
    });
  },
  // activated() {
  //     getDetails(this.iid).then(res => {
  //         console.log(res);
  //     })
  // },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 12;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>