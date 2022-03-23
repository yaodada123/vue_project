<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",

  props: {
    probeType : {
      type: Number,
      default: 0,
    }
  },

  data() {
    return {
      scroll: null,
    };
  },

  mounted() {
    // 创建better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
    //   pullUpLoad: this.pullUpLoad,
    });

    // 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position);
    })
  },

  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    }
  },
};
</script>

<style  scoped>
</style>