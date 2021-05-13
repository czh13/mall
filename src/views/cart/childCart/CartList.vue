<template>
  <div id="cart">
    <!-- <scroll class="content"> -->
      <item-cart v-for="(item, index) in cartList" :key="index" :info='item'></item-cart>
    <!-- </scroll> -->
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Scroll from '../../../components/common/scroll/Scroll.vue'
  import ItemCart from './itemCart.vue'

  export default {
    name: 'name',
    components: {
      Scroll,
      ItemCart
    },
    computed: {
      ...mapGetters(['cartList'])
    }

  }

</script>

<style scoped>
/* #cart{
  height: calc(100% - 44px - 49px);
} */
/* .content{
  position: absolute;
  height: 100vh;
  overflow: hidden;
  
} */
</style>
