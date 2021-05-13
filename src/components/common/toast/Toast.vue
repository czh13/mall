<template>
  <div class="toast" v-show='isShow'>
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'name',
  data() {
    return {
      message:'',
      isShow:false
    }
  },
  methods: {
    show(message,duration){
      this.message=message
      this.isShow=true

      setTimeout(()=>{
        this.message=''
        this.isShow=false
      },duration)
    }
  },
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: rgba(0, 0, 0, .75);
  transform: translate(-50%,-50%);
  color: #fff;
  padding: 10px;
  z-index: 50;
}
</style>