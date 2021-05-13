<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imgLoad() {
        //通过取反可以让代码只执行一次
        if(!this.isLoad){ //监听了轮播图图片加载，打印了4次，但是我们其实只需要知道1次，知道图片加载完成
          this.$emit('swiperImgLoad');
          this.isLoad=true
        }
      }
    }
  }
</script>

<style scoped>

</style>
