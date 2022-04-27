<template>
  <div id="home">
    <HomeBar id="homebar" v-if="isshow"></HomeBar>
    <Banner></Banner>
    <Card1></Card1>
    <AshContent></AshContent>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :floor="floor"></Floor>
  </div>
</template>
<script>
import Banner from "./Banner";
import Card1 from "./Card1";
import HomeBar from "@/components/HomeBar";
import AshContent from "./AshContent";
import Floor from './Floor'
import { mapState } from 'vuex'
export default {
  name: "Home",
  props: {},
  components: {
    Banner,
    Card1,
    HomeBar,
    AshContent,
    Floor
  },
  data() {
    return {
      target:'',
      isshow:false
    };
  },
  mounted(){
    this.getFloorList();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods:{
    getFloorList() {
      this.$store.dispatch('getFloorList')
    },
    handleScroll() {
      let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
      let homeBar = document.getElementById("homebar");
      if(scrollHeight >= 200 && scrollHeight !== 0){
        this.isshow = true;
      }else{
        this.isshow = false;
      }
      
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed:{
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
};
</script>
<style lang="less"	scoped>
</style>