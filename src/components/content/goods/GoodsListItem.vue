<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed:{
      // 需要进行判断，因为数据来源不同的两个地址，所以需要进行选择
      showImage(){
        return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img 
        //有先后顺序的，下面这个不行
        // return this.goodsItem.show.img || this.goodsItem.image
      }
    },
    methods: {
      // 因为该组件被使用于不同的场景下，使用数据每次也会不同，我们对图片进行了监听但每次是通过
      //  home.vue来接收事件。但是这里是detail.vue组件，另一个主页面
      imageLoad() {
        this.$bus.$emit('itemImageLoad')

        // 第一种判断路径
        // if(this.$route.path.indexof('/home'===0)){
        //     this.$bus.$emit('itemImageLoad')
        // }else if(this.$route.path.indexof('./detail')){
        //     this.$bus.$emit('detailImageLoad')
        // }
        
        // 第二种就是到home.vue里，在我们离开home主页后取消之前图片监听
      },
      itemClick() {
        //跳转到详情页
        this.$router.push('/detail/'+this.goodsItem.iid)
        // this.$router.push({
        //   path:'/detail',
        //   query:{
        //       name:'zhihao',age:18
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
