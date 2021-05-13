<template>
  <div id="cart">
    <nav-bar class="carttitle">
      <div slot='center'>购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <item-cart></item-cart>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import ItemCart from './childCart/CartList.vue'
  import Scroll from '../../components/common/scroll/Scroll.vue'
  import CartBottomBar from './childCart/CartBottomBar.vue'
  import {
    mapGetters
  } from 'vuex' //mapGetters辅助函数

  export default {
    name: "Cart",
    components: {
      NavBar,
      ItemCart,
      Scroll,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength', 'cartList'])

      // cartLength(){
      //   return this.$store.state.cartList.length
      // }
    },
    activated() {
      this.$refs.scroll.refresh()
      // console.log('sss')
    },
  }

</script>

<style scoped>
  #cart{
    height: 100vh;
  }
  .carttitle {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content{
    overflow: hidden;
    height: calc(100% - 44px - 49px);
  }
</style>
