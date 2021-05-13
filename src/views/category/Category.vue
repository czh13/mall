<template>
  <div class="Categorty">
    <nav-bar class="sort">
      <div slot="center">分类</div>
    </nav-bar>
    <slide-bar :categoryList="categoryList" @slideBarItemClick='slideBarItemClick'></slide-bar>
    <scroll class="content">
      <SubCateGory :subcategoryList='subcategoryList'></SubCateGory>
      <tab-control :titles='categoryTitle' ref="tabCons" @tabClick='tabclick'></tab-control>
      <good-list :goods='categoryDetailList'></good-list>
    </scroll>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import SlideBar from './childCategory/SliderBar.vue'
  import Scroll from '../../components/common/scroll/Scroll.vue'
  import SubCateGory from './childCategory/Subcategory.vue'
  import TabControl from '../../components/content/tabControl/TabControl.vue'
  import GoodList from '../../components/content/goods/GoodsList.vue'

  import {
    getCategory,
    getSubcategory,
    getcategoryDetail
  } from '../../network/category.js'
  export default {
    name: "Category",
    components: {
      NavBar,
      SlideBar,
      Scroll,
      SubCateGory,
      TabControl,
      GoodList
    },
    data() {
      return {
        categoryList: [],
        currenIndex: 0,
        // 分类内容数据
        subcategoryList: [],
        categoryTitle: ["流行", "新款", "精选"],
        categoryDetailList: [],
      }
    },
    created() {
      this.getCategory()

    },
    methods: {
      // 左侧的分类
      getCategory() {
        getCategory().then(res => {
          // console.log(res)
          this.categoryList = res.data.category.list

          // 默认显示第一组
          this.$nextTick(() => {
            this.getSubcategory(this.categoryList[0].maitKey)
            this.getcategoryDetail(this.categoryList[0].miniWallkey, 'pop')
          });
        })
      },
      // 右侧的主内容
      getSubcategory(key) {
        getSubcategory(key).then(res => {
          // console.log(res.data.list)
          this.subcategoryList = res.data.list
        })
      },
      // 右侧最下面的detail，需要传一个对应的id和tabcontrol类型
      getcategoryDetail(miniWallkey, type) {
        getcategoryDetail(miniWallkey, type).then(res => {
          // console.log(res)
          this.categoryDetailList = res
        })
      },
      // 当点击左侧类目时调用,右侧显示相应内容
      slideBarItemClick({
        maitKey,
        index
      }) {
        // 子组件发送事件来，同时也会将点击button的index传来，如果点击后，仍然是同一个btn(通过index判断)
        // 如果相同就false，不在请求重复数据，如果不相同就将index赋值给currentIndex
        if (this.currenIndex === index) return false
        this.currentIndex = index;

        // 切换分类初始化tabcontrol的下标
        this.$refs.tabCons.currentIndex = 0

        // 左侧不同的类别有对应的id，只用调用赋值相应的id就有相应的内容
        // 但是id在分类数据里，所以需要categoryList里获取
        this.getSubcategory(maitKey)
        this.getcategoryDetail(this.categoryList[this.currentIndex].miniWallkey, 'pop')
      },
      tabclick(index) {
        // tabcontrol组件里发射了事件出来,不同的index，请求的type类型不同
        const typeList = ['pop', 'new', 'sell']
        this.getcategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index])
      }
    }
  }

</script>

<style scoped>
  .sort {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    position: fixed;
    top: 44px;
    bottom: 49px;
    left: 100px;
    overflow: hidden;
  }

</style>
