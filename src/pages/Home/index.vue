<template>
  <div>
    <HomeBar></HomeBar>
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
    return {};
  },
  mounted(){
    this.getFloorList()
    
  },
  methods:{
    getFloorList(){
      this.$store.dispatch('getFloorList')
    },
    
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