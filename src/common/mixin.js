import {debounce} from './utils'
export const itemImgMixin = {
  //混入可以是data,methods
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListen = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListen)
    // console.log('11')
  },
  
}

import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin={
  data() {
    return {
      isShowBackTop: false
    }
  },
  components:{
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
  },
}
