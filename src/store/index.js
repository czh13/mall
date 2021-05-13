import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

//使用插件
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    //mutations唯一的目的减少修改state里的状态
    // mutations中的每一个方法尽可能完成的事件单一一些，所以将下面的代码分装到actions中(重构)

    addCount(state, payload) {
      payload.count++
    },
    cartPush(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }

  },
  actions: {
    Tocart(context, payload) {
      //actions可以返回一个promise
      return new Promise((resolve, reject) => {
        // let oldInfo={}
        // for (const item of state.cartList) {
        //   //判断如果数组中的元素iid与payload添加传过来的iid一致，那就证明数组里已经有商品数据了
        //   if(item.iid===payload.iid){
        //     oldInfo=item //将item复制给oldInfo
        //   }
        // }
        let oldInfo = context.state.cartList.find((item) => {
          return item.iid === payload.iid
        })

        if (oldInfo) {
          //如果传过来的对象不是空对象，那说明执行了上面的赋值操作，所以只用count+1
          // payload.count+=1
          context.commit('addCount', oldInfo)
          resolve('商品数量+1')
        } else {
          //如果是空对象，那就创建应该count属性赋值为1，将传过来的对象加入到carList
          payload.count = 1
          // state.cartList.push(payload)
          context.commit('cartPush', payload)
          resolve('加入购物车')
        }
      })
    }
  },
  getters
})

export default store
