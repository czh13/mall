<template>
  <div>
    <swiper class="swiperdetail">
      <swiper-item  v-for="(item,index) in itemImg" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from '../../../components/common/swiper/index.js'
export default {
  name: 'name',
  components:{
    Swiper, 
    SwiperItem
  },
  props:{
    itemImg:Array,
    default(){
      return []
    }
  }
}
</script>

<style scoped>
.swiperdetail{
  height: 250px;
  overflow: hidden;
}
</style>