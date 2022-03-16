<template>
  <div>
    <nav-bar class="cart-nav">
      <div slot="center">购物车</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
export default {
  components: { NavBar },
  name: "Cart",
};
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  /* background-color: var(--color-tint); */
  color: #fff;
}
</style>
