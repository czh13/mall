<template>
  <div>
    <nav-bar>
      <div slot="left" class="img" @click="back">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot='center' class="title">
        <div v-for="(item, index) in itemTitle" :key="index" class="itemtitle" 
        :class="{active:index==currentIndex}"
        @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '../../../components/common/navbar/NavBar.vue'
export default {
  name: 'name',
  components:{
    NavBar
  },
  data() {
    return {
      itemTitle:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex=index
    },
    back(){
      this.$router.back()
      // this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 12px;
}
.itemtitle{
  flex: 1;
}
.img{
  margin-top:7px;
}
.active{
  color: var(--color-high-text);
}
</style>