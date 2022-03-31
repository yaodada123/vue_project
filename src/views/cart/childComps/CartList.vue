<template>
  <div>
    <scroll class="cart-list">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";
export default {
  name: "Cartlist",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
  components: {
    CartListItem,
    Scroll,
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
  .cart-list {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 93px;
  }
</style>