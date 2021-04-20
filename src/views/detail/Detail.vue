<template>
  <div id="detail">
    <child-detail class="child_detail"></child-detail>
    <scroll class="content" ref="scroll" >
      <swiper-detail :itemImg="itemImg"></swiper-detail>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :paramInfo='paramInfo'></detail-param-info>
      <detail-comment-info :comment='comment'></detail-comment-info>
      <good-list :goods='recommend'></good-list>
      <!-- 使用的之前封装的goodlist,需要将新的数据传给goodlist，让其通过goodlistitem遍历我们传递的数据 -->
    </scroll>
  </div>
</template>

<script>
  import ChildDetail from './childDetail/childDetail.vue'
  import SwiperDetail from './childDetail/swiperDetail.vue'
  import DetailBaseInfo from './childDetail/DetailBaseInfo.vue'
  import DetailShopInfo from './childDetail/DetailShopInfo.vue'
  import DetailGoodsInfo from './childDetail/DetailGoodsInfo.vue'
  import DetailParamInfo from './childDetail/DetailParamInfo.vue'
  import DetailCommentInfo from './childDetail/DetailCommentInfo.vue'
  import GoodList from '../../components/content/goods/GoodsList.vue'
  import Scroll from '../../components/common/scroll/Scroll.vue'

  import {
    getDetail,
    getRecommend,
    Goods,
    Shop,
    GoodsParam
  } from '../../network/detail.js'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        itemImg: [],
        goods: {},
        shop: {},
        detailInfo:{},
        paramInfo:{},
        comment:{},
        recommend:[]
      }
    },
    components: {
      ChildDetail,
      SwiperDetail,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList,
      Scroll
    },
    created() {
      //保存存入的id
      this.iid = this.$route.params.id
      //请求网络数据
      getDetail(this.iid).then((res) => {
        // console.log(res)
        const data = res.result
        this.itemImg = data.itemInfo.topImages
        //这样我们就获取了来自各个对象里我们想要的部分数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo=data.detailInfo
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
        if(data.rate.list){
          this.comment=data.rate.list[0]
        }
      }).catch((err) => {

      });
      getRecommend().then((res)=>{
        console.log(res)
        this.recommend=res.data.list
      })
    },
    methods: {
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    },

  }

</script>

<style scoped>
  #detail {
    /* 让detail整体页面覆盖tabbar */
    position: relative;
    z-index: 20;
    background-color: #fff;
    height: 100vh;/* 配合着滚动页面 */
  }

  .child_detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);/* 配合着滚动页面，注意必须空格 */
  }
</style>
