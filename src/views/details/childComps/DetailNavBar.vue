<template>
    <div>
        <nav-bar>

            <div slot="left" class="back" @click="backClick">
                <img src="@/assets/img/common/back.svg" alt="">
            </div>

            <div slot="center" class="title">
                <div v-for="(item, index) in titles" 
                class="title-item" :class="{active: curentIndex == index }"
                :key="index"
                @click="titleClick(index)"
                >{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
export default {
  components: { NavBar },
    name: 'DetailNavbar',

    data() {
        return {
            titles: ['商品', '参数','评论','推荐'],
            curentIndex: 0,
        };
    },

    mounted() {
        
    },

    methods: {
        titleClick(index) {
            this.curentIndex = index
        },
        backClick() {
            this.$router.back();
        }
    },
};
</script>

<style scoped>
.title {
    display: flex;
    font-size: 18px;
}
.title-item {
    /* font-size: 23px; */
    flex: 1;
}
.back img {
    margin-top: 10px;
}
.active {
    color: var(--color-high-text);
}
</style>