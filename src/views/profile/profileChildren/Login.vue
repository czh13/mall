<template>
  <div id='Login'>
    <div class="left">
      <img src="../../../assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="middle">
      <p>登录</p>
      <div class="middle_bottom">
        <img src="../../../assets/img/profile/phone.svg" alt="">
        <p>暂未绑定手机号</p>
      </div>
    </div>
    <div class="right">
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'name'

}
</script>

<style scoped>
#Login{
  height: 90px;
  width: 100%;
  background-color: var(--color-tint);
  padding:0 20px ;
  position: relative;
  display: flex;
  align-items: center;
}
.left{
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left img{
  height: 60px;
  width: 60px;
  display: block;
  position: relative;
}
.middle{
  font-size: 16px;
  color: #fff;
  margin-left: 20px;
  
}
.middle p:first-child{
  margin-left: 5px;
}
.middle p:last-child{
  margin-left: 3px;
}
.middle_bottom{
  font-size: 14px;
  display: flex;
  margin-top: 8px;
  align-items: center;
}

.middle_bottom img{
  width: 18px;
  height: 18px;
}
.right{
  color: #fff;
  font-size: 30px;
  position: absolute;
  right: 10px;
}
</style>