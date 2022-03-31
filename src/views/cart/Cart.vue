<template>
  <div>
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list :cart-list="cartList"></cart-list>
    <cart-bottom-bar> </cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
import CartList from "./childComps/CartList.vue";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
  },
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  /* background-color: var(--color-tint); */
  color: #fff;
}
</style>
