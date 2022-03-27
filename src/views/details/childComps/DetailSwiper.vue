<template>
    <div >
        <swiper class="detail-swiper">
            <swiper-item v-for="(item, index) in topImages" :key="index">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import Swiper from '@/components/common/swiper/Swiper.vue';
import SwiperItem from '@/components/common/swiper/SwiperItem.vue';
export default {
  components: { Swiper, SwiperItem },
    name: 'DetailSwiper',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },

    props: {
        topImages : {
            type: Array,
            default: [],
        }
    },
};
</script>

<style  scoped>
.detail-swiper {
    height: 300px;
    overflow: hidden;
}
</style>