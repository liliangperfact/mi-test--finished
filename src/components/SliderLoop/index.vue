<template>
  <div class="swiper-container" ref="banner" id="banners_id">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner, index) in bannerList" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev swiper-button-white"></div>
    <div class="swiper-button-next swiper-button-white"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "SliderLoop",
  props: ["bannerList"],
  watch: {
    bannerList: {
      handler() {
        //Vue.nextTick或者vm.$nextTick是一样的功能
        //在最近的一次dom更新之后执行nextTick里面传的回调函数
        this.$nextTick(() => {
          var Swiper1= new Swiper(this.$refs.banner, {
            // direction: "vertical", // 垂直切换选项
            // autoplay:true,//等同于以下设置
            loop: true, // 循环模式选项
            hideOnClick: true,

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination"
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar"
            // }
          });
          Swiper1.el.onmouseover = function() {
            Swiper1.navigation.$nextEl.removeClass("hide");
            Swiper1.navigation.$prevEl.removeClass("hide");
          };
          Swiper1.el.onmouseout = function() {
            Swiper1.navigation.$nextEl.addClass("hide");
            Swiper1.navigation.$prevEl.addClass("hide");
          };
        });
      },
      immediate: true //立即执行，在最近dom更新之前就会执行
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container .hide {
  opacity: 0;
}
.swiper-button-next,
.swiper-button-prev {
  transition: opacity 0.5s;
}

</style>
