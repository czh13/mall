//封装插件
import Toast from './Toast.vue'
const obj = {}

obj.install = function (Vue) { //install方法会默认传Vue函数
  // console.log(Vue)
    //创建组件构造器
    const ToastConstructor = Vue.extend(Toast);

    //new方式，根据组件构造器，创建一个组件对象
    const toast = new ToastConstructor()

    //将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    //toast.$el对应div
    document.body.appendChild(toast.$el)

     Vue.prototype.$toast = toast
  };

export default obj
