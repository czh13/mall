<template>
  <div class="checkButton" :class="{checked:ischecked}">
    <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'name',
  props:{
    ischecked:{
      type:Boolean,
      default:true
    }
  }
}
</script>

<style scoped>
.checkButton{
  border-radius: 50%;
  border: 1px solid #ccc;
}
.checked{
  border: orange;
  background-color: orange;
}

</style>