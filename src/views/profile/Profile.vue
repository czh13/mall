<template>
  <div id="profile">
    <nav-bar class="my">
      <div slot="center">个人中心</div>
    </nav-bar>
    <login></login>
    <money></money>
    <div class="line"></div>
    <profile-list></profile-list>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import Login from './profileChildren/Login.vue'
  import Money from './profileChildren/Money.vue'
  import ProfileList from './profileChildren/ProfileList.vue'

  export default {
    name: "Profile",
    components: {
      NavBar,
      Login,
      Money,
      ProfileList
    }
  }
</script>

<style scoped>
  .my{
    background-color: var(--color-tint);
    color: #fff;
  }
  .line{
    height: 10px;
    width: 100%;
    background-color: #eee;
  }
</style>
