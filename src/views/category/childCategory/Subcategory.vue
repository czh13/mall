<template>
  <div id='subcategory'>
    <div v-for="(item, index) in subcategoryList" :key="index" class="subList">
      <a :href="item.link"><img :src="item.image" alt=""></a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'name',
    data() {
      return {

      }
    },
    props: {
      subcategoryList: {
        typeof: Array,
        default () {
          return []
        }
      }
    }
  }

</script>

<style scoped>
  #subcategory {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
  }

  .subList {
    font-size: 14px;
    text-align: center;
    width: 33%;
    margin: 10px 0;
  }

  .subList img {
    width: 65px;
    margin-bottom: 5px;
  }

</style>
