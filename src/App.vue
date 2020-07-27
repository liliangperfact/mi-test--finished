<template>
<div>
  <Header></Header>
  <router-view></router-view>
  <Footer v-if="!$route.meta.isHide"></Footer>
</div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {reqCategoryList} from '@/api'
export default {
  name:"App",
  props:{
    
  },
  components:{
    Header,
    Footer
  },
  data(){
    return {
   
    }
  },
  mounted(){
    this.getBannerList();
   // this.getKeywordslist()
  },
  methods:{
    getBannerList() {
      this.$store.dispatch("getBannerList");
    },
    // getKeywordslist(){
    //   this.$store.dispatch('getKeywordslist')
    // }
  }
}
</script>
<style lang="less"	scoped>
  
</style>