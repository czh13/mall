<template>
  <div id="detail">
    <child-detail class="child_detail" @itemclick='itemclick' ref="detailbar"></child-detail>
    <scroll class="content" ref="scroll" @scroll='itemscroll' :probeType='3'>
      <swiper-detail :itemImg="itemImg"></swiper-detail>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info  :detailInfo='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info ref="param" :paramInfo='paramInfo'></detail-param-info>
      <detail-comment-info ref="comment" :comment='comment'></detail-comment-info>
      <good-list ref="recommend" :goods='recommend'></good-list>
      <!-- 使用的之前封装的goodlist,需要将新的数据传给goodlist，让其通过goodlistitem遍历我们传递的数据 -->
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-info @addToCart='addToCart'></detail-bottom-info>
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
  import DetailBottomInfo from './childDetail/DetailBottomInfo.vue'
  import GoodList from '../../components/content/goods/GoodsList.vue'
  import Scroll from '../../components/common/scroll/Scroll.vue'

  import {debounce} from '../../common/utils.js'
  import {itemImgMixin} from '../../common/mixin.js'
  import {backTopMixin} from '../../common/mixin.js'

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
        recommend:[],
        itemImgListen:null,
        getTopY:[],
        currentIndex:0
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
      DetailBottomInfo,
      GoodList,
      Scroll
    },
    mixins:[itemImgMixin,backTopMixin],
    created() {
      //保存存入的id
      this.iid = this.$route.params.id
      //请求网络数据
      getDetail(this.iid).then((res) => {
        console.log(res)
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

        //也不能在请求完数据的时候立即获取offsettop,因为获取数据之后还要进行渲染


        // this.$nextTick(function () {
          //该函数是等到我们将子组件里的dom和数据渲染完在执行
          // 但是也不能在这里获取offsettop,虽然数据已经加载完成,但是这里可能会出现获取的offsettop数值不正确
          // 因为图片的加载还没有结束
        // });
      })
      getRecommend().then((res)=>{
        // console.log(res)
        this.recommend=res.data.list
      })
    },
    mounted() {
      // 该组件页面也有gooditem，所以也可能需要进行监听图片加载，刷新滚动高度
      // const refresh=debounce(this.$refs.scroll.refresh,50)
      // this.itemImgListen=()=>{
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad',this.itemImgListen)
      // 因为上面代码和home.vue代码重复,所以通过mixin进行混入封装
      // console.log('mount')

      // 不能在mounted里获取offsettop,因为我们在子组件里进行数据的判断object.key(),如果没有数据就不进行元素渲染

      
    },
    updated() {
      //也不能在updated里获取offsettop,因为可能第一次更新时也还没有相关的数据
    },
    destroyed() {
      // 同时也要取消全局监听
      this.$bus.$off('itemImageLoad',this.itemImgListen)
    },
    methods: {
      // ...mapActions(['Tocart']) 这里也可以想getter进行映射
      imageLoad(){
        this.$refs.scroll.refresh()
        
        this.getTopY=[]
        this.getTopY.push(0)
        this.getTopY.push(this.$refs.param.$el.offsetTop)
        this.getTopY.push(this.$refs.comment.$el.offsetTop)
        this.getTopY.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.getTopY)
      },
      itemclick(index){
        this.$refs.scroll.scrollTo(0,-this.getTopY[index],200)
      },
      //实现滚动内容显示对应标题颜色
      itemscroll(position){
        // 回到顶部
        this.isShowBackTop = (-position.y) > 1000

        const positionY=-position.y+5
        let length=this.getTopY.length
        // for-in打印的 i是字符串类型，需要进行转化
        for (let i = 0; i < length; i++) {
          // [0, 2851, 4282, 4478,]
          // if(positionY>this.getTopY[index] && positionY<this.getTopY[index+1]){
          //   // 如果这样直接判断的话是读不到最后的index+1的，因为最后会出现this.getTopY[4]，没有这个东西
          // }
          //所以必须分开判断,4282-4478只用通过应该判断条件
          if(this.cuurentIndx!==i && (i<length-1 && positionY>this.getTopY[i] && positionY<this.getTopY[i+1])
            ||(i===length-1 && positionY>this.getTopY[i])){
              // console.log(i)
              //去除重复执行,通过this.cuurentIndx!==i 判断当前页面是否仍然处于某一个区间的i,如果不是在进行之后的条件判断
              this.currentIndex=i //当进入if判断后进行赋值就不会在重复执行，知道下一次i改变
              this.$refs.detailbar.currentIndex=i
            }
        }
      },
      addToCart(){
        const info ={}
        info.img=this.itemImg[0]
        info.title=this.goods.title
        info.desc =this.goods.desc
        info.price=this.goods.lowNowPrice
        info.iid = this.iid

        // this.$store.commit('Tocart', info);
        this.$store.dispatch('Tocart', info).then(res=>{
          // console.log(res)
          // console.log(this.$toast)
          this.$toast.show(res,2000)
        })


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
    height: calc(100% - 44px - 58px);/* 配合着滚动页面，注意必须空格 */
  }
  
</style>
