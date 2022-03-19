<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :goodsitem="item"
      :key="index"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "../goods/GoodsListItem.vue";
export default {
  components: { GoodsListItem },
  name: "Goodslist",

  data() {
    return {};
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>