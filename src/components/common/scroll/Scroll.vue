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

  data() {
    return {
      scroll: null,
    };
  },

  mounted() {
    // 创建better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
    //   probeType: this.probeType,
    //   pullUpLoad: this.pullUpLoad,
    });
  },

  methods: {},
};
</script>

<style  scoped>
</style>