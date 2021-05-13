<template>
  <div id="itemCart">
    <div class="button">
      <check-button :ischecked='info.checked' @click.native='checkClick'></check-button>
    </div>
    <div class="infoImg">
      <img :src="info.img" alt="">
    </div>
    <div class="itemInfo">
      <div class="infoTitle">{{info.title}}</div>
      <div class="infoDesc">{{info.desc}}</div>
      <div class="infoAll">
        <div class="infoPrice">￥{{info.price}}</div>
        <div class="infoCount">x{{info.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from '../../../components/common/checkbutton/CheckButton.vue'
  export default {
    name: 'name',
    props: {
      info: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    components:{
      CheckButton
    },
    methods: {
      checkClick(){
        this.info.checked=!this.info.checked
      }
    },

  }

</script>

<style scoped>
  #itemCart {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    /* background-color: aqua; */
  }
  .button{
    width: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 3px;
  }
  .itemInfo{
    font-size: 17px;
    padding:10px;
    overflow: hidden;
    color: #333;
    position: relative;
  }
  .infoImg img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 6px;
  }
  
  .infoDesc,.infoTitle{
    /* 变成横行排列 */
    white-space: nowrap;
    /*二者一起用，超出的字变成...  */
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .infoDesc{
    font-size: 13px;
    color: #333;
    margin:15px 0;
  }
  .infoAll{
    margin-top: 5px;
    position: relative;
    top: 10px;
  }
  .infoCount{
    display: inline-block;
    /* margin-left: 120px; */
    position: absolute;
    right:0
  }
  .infoPrice{
    color: orange;
    display: inline-block;
  }
</style>
