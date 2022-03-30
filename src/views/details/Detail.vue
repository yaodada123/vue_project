<template>
  <div id="detail">
    <!-- 导航条 -->
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>

    <scroll class="content" ref="scroll"  :probeType="3" @scroll="scroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>

      <!-- 商品基本信息页 -->
      <detail-base-info :goods="goods"></detail-base-info>

      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>

      <!-- 商品详情页 -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
        ref="goods"
      ></detail-goods-info>

      <!-- 商品参数信息 -->
      <detail-param-info
        :paramInfo="goodsparam"
        ref="param"
      ></detail-param-info>

      <!-- 商品评论信息 -->
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>

      <!-- 商品推荐信息 -->
      <goods-list :goods="goodsList" ref="goodsList"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";

import {
  getDetails,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";

import Scroll from "../../components/common/scroll/Scroll.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import GoodsListItem from "../../components/content/goods/GoodsListItem.vue";

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
      commentInfo: {}, // 存取评论的一条信息
      goodsList: [],
      titleTopY: [],
      probeType: 3,
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
    DetailCommentInfo,
    GoodsList,
    GoodsListItem,
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
      // 网络请求 请求商品推荐数据
      getRecommend().then((res) => {
        // console.log(res);
        this.goodsList = res.data.list;
        // console.log(this.goodsList);
      });

      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 获取商品详情数据
      this.detailInfo = data.detailInfo;
      // 获取商品参数信息
      this.goodsparam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 获取商品评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
  },
  // activated() {
  //     getDetails(this.iid).then(res => {
  //         console.log(res);
  //     })
  // },

  mounted() {},

  updated() {
    // console.log(this.titleTopY);
  },

  methods: {
    imageLoad() {
      // console.log(123);
      this.$refs.scroll.refresh();


      // 获取offsetTop值便于点击跳转
      this.titleTopY.push(0);
      this.titleTopY.push(this.$refs.param.$el.offsetTop);
      this.titleTopY.push(this.$refs.comment.$el.offsetTop);
      this.titleTopY.push(this.$refs.goodsList.$el.offsetTop);
    },
    titleClick(index) {
      // console.log(index);
      // console.log(this.$refs.goods.$el.offsetTop);
      this.$refs.scroll.scrollTo(0, -this.titleTopY[index], 100);
    },
    scroll(position) {
      // console.log(position.y);
      // console.log(this.titleTopY);
      if(-position.y >= this.titleTopY[3])
        this.index = 3;
      else if(-position.y >= this.titleTopY[2])
        this.index = 2;
      else if(-position.y >= this.titleTopY[1])
        this.index = 1;
      else 
        this.index = 0;
      this.$refs.nav.curentIndex = this.index
      // console.log(this.index);
    },
  },
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