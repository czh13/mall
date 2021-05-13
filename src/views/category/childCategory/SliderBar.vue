<template>
  <div id='slide-bar'>
    <scroll class="content">
      <div v-for="(item, index) in categoryList" :key="index">
        <button class="sortBtn" :class="currentIndex==index ? 'active':''"
          @click='selectBTN(item,index)'>{{item.title}}</button>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from '../../../components/common/scroll/Scroll'

  export default {
    components: {
      Scroll
    },
    name: 'name',
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      categoryList: {
        typeof: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      selectBTN(item, index) {
        const obj = {
          maitKey: item.maitKey,
          index
        }
        this.currentIndex = index
        this.$emit('slideBarItemClick', obj);
      }
    },

  }

</script>

<style scoped>
  #slide-bar {
    width: 100px;
  }

  .content {
    position: fixed;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    background-color: #f6f6f6;
    width: 100%;
  }

  .sortBtn {
    height: 45px;
    width: 100px;
    text-align: center;
    line-height: 45px;
    background-color: #fff;
    outline: none;
    border: none;
    font-size: 14px;
  }

  .active {
    color: var(--color-tint);
    font-weight: 600;
    border-left: 2px solid var(--color-tint);
  }

</style>
