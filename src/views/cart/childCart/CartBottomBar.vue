<template>
  <div id='bottomBar'>
    <div class="select">
      <check-button class="cbutton" 
      :ischecked="bSelect"
      @click.native='bothSelect'
     ></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:${{totalPrice}}
    </div>
    <div class="count" @click='clickToast'>
      去结算:({{totalCount}})
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/common/checkbutton/CheckButton.vue'
export default {
  name: 'name',
  components:{
    CheckButton
  },
  computed:{
    totalPrice(){
      return this.$store.state.cartList.filter(item=>{
        return item.checked   //先判断选中的商品，filter返回true返回新数组
      }).reduce((preValue,item)=>{
        return preValue + item.count * item.price
      },0)
    },
    totalCount(){
      return this.$store.state.cartList.filter(item=>{
        return item.checked
      }).length
    },
    bSelect(){
      // return ! this.$store.state.cartList.filter(item=>{
      //   return !item.checked
      // }).length
      //一开始判断有没有点击购物车，没有就证明数组长度为0，所以按钮返回false
      if(this.$store.state.cartList.length===0){
        return false
      }
      // every数组方法对item.checked进行匹配，如果不匹配的就整体返回false，并且后面不会再执行
      return this.$store.state.cartList.every(item=>item.checked)
    }
  },
  methods: {
    bothSelect(){
      // 当this.bSelect是false就是未全选时,那么当我点击就会执行else语句，反之
      if(this.bSelect){
        this.$store.state.cartList.forEach(item=>item.checked=false)
      }else{
        this.$store.state.cartList.forEach(item=>item.checked=true)
      }
    },
    clickToast(){
      if(!this.bSelect){
        this.$toast.show('请添加商品',1500)
      }
    }
  },
}
</script>

<style scoped>
#bottomBar{
  background-color: #ddd;
  height: 40px;
  position: relative;
  bottom: 40px;
}
.select{
  display: flex;
  position: absolute;
  left: 10px;
  bottom:10px;
}
.cbutton{
  width: 20px;
  height: 20px;
  
}
.select span{
  padding-left: 7px;
  padding-top: 1px;
}
.price{
  width: 100px;
  line-height: 40px;
  margin-left: 105px;
  font-size: 14px;

}
.count{
  width: 100px;
  line-height: 40px;
  background-color: orange;
  position: relative;
  bottom: 40px;
  left: 220px;
  font-size: 14px;
  text-align: center;
}
</style>