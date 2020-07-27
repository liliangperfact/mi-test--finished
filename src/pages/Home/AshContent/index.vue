<template>
  <div>
    <!-- 灰底开始 -->
    <div class="ash_content clearfix">
      <!-- 秒杀 -->
      <div class="mi_seckill w">
        <div class="mi_seckill_title">
          <h2>小米闪购</h2>
           <div class="swiper-button-prev swiper-button-black" style="margin-top: -165px;
          margin-left:1130px"></div>
              <div class="swiper-button-next swiper-button-black" style="margin-top: -165px;
          right: 0;"></div>
        </div>
        <div class="mi_seckill_content clearfix">
          <div class="seckill_time">
            <div class="miaosha">
              <span>10:00 场</span>
              <img src="./images/shandian.png" alt />
            </div>
            <div class="miaosha_time">距离结束还有：</div>
            <CountDown :remainTime="Cut_times"></CountDown>
          </div>
          <div class="seckill_banner" ref="skill_banner">
            <div class="swiper-container" ref="banner" id="banners_id">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(goods,index) in goodsList" :key="goods.id">
                  <div class="seckill_card">
                    <a href="#">
                      <div class="content_img">
                        <img :src="goods.defaultImg" />
                      </div>
                      <div class="content_title">
                        <p>{{goods.title}}</p>
                        <span>"仪"副耳机，顽音系列</span>
                        <div class="price">
                          <label>{{goods.price}}元</label>&nbsp;
                          <del>399元</del>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="swiper-pagination"></div>

             
            </div>
          </div>
        </div>
      </div>
      <!-- 手机 -->
      <div class="mi_phone w">
        <div class="phone_wrapper">
          <a href="#">
            <img src="./images/phone_img.png" alt />
          </a>
        </div>
        <ul class="phone_card">
          <li>
            <a href="#">
              <div class="content_img">
                <img src="./images/phone_card_img.png" />
              </div>
              <div class="content_title">
                <p>小米10</p>
                <span>晓龙865/1亿像素</span>
                <div class="price">
                  <label>3999元起</label>&nbsp;
                  <del>399元</del>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="content_img">
                <img src="./images/mi3.jpg" />
              </div>
              <div class="content_title">
                <p>小米10</p>
                <span>晓龙865/1亿像素</span>
                <div class="price">
                  <label>3999元起</label>&nbsp;
                  <del>399元</del>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="content_img">
                <img src="./images/mi1.jpg" />
              </div>
              <div class="content_title">
                <p>小米10</p>
                <span>晓龙865/1亿像素</span>
                <div class="price">
                  <label>3999元起</label>&nbsp;
                  <del>399元</del>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="content_img">
                <img src="./images/mi2.jpg" />
              </div>
              <div class="content_title">
                <p>小米10</p>
                <span>晓龙865/1亿像素</span>
                <div class="price">
                  <label>3999元起</label>&nbsp;
                  <del>399元</del>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="content_img">
                <img src="./images/jaidian.png" />
              </div>
              <div class="content_title">
                <p>小米10</p>
                <span>晓龙865/1亿像素</span>
                <div class="price">
                  <label>3999元起</label>&nbsp;
                  <del>399元</del>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="content_img">
                <img src="./images/xiyiji.png" />
              </div>
              <div class="content_title">
                <p>小米10</p>
                <span>晓龙865/1亿像素</span>
                <div class="price">
                  <label>3999元起</label>&nbsp;
                  <del>399元</del>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="content_img">
                <img src="./images/mi3.jpg" />
              </div>
              <div class="content_title">
                <p>小米10</p>
                <span>晓龙865/1亿像素</span>
                <div class="price">
                  <label>3999元起</label>&nbsp;
                  <del>399元</del>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <div class="content_img">
                <img src="./images/phone_card_img.png" />
              </div>
              <div class="content_title">
                <p>小米10</p>
                <span>晓龙865/1亿像素</span>
                <div class="price">
                  <label>3999元起</label>&nbsp;
                  <del>399元</del>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import CountDown from "@/components/CountDown"
import "swiper/css/swiper.min.css";
import { mapGetters, mapState } from "vuex";
export default {
  name: "AshContent",
  props: {},
  components: {
     CountDown
  },
  data() {
    return {
      Cut_times:3600*17,
      //goodsList:[],
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:asc",
        pageNo: 3,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  mounted() {
    this.getGoodsListInfo(); //定义函数，发送请求
  },
  methods: {
    getGoodsListInfo() {
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
   
  },
  computed: {
    ...mapState({
      goodsListInfo: (state) => state.search.goodsListInfo,
      //这里的search指的是store下的search.js（search的vuex中拿到goodsListInfo的数据）
    }), //
    ...mapGetters(["goodsList"]), //
  },

  watch: {
    goodsListInfo: {
      handler() {
        //Vue.nextTick或者vm.$nextTick是一样的功能
        //在最近的一次dom更新之后执行nextTick里面传的回调函数
        this.$nextTick(() => {
          var Swiper1 = new Swiper(this.$refs.banner, {
            // direction: "vertical", // 垂直切换选项
            // autoplay:true,//等同于以下设置
            //loop: true, // 循环模式选项
            hideOnClick: true,

            // 如果需要分页器
            // pagination: {
            //   el: ".swiper-pagination",
            // },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar"
            // }
            slidesPerGroup: 4,
            slidesPerView: 4,
          });
          Swiper1.el.onmouseover = function () {
            Swiper1.navigation.$nextEl.removeClass("hide");
            Swiper1.navigation.$prevEl.removeClass("hide");
          };
          Swiper1.el.onmouseout = function () {
            Swiper1.navigation.$nextEl.addClass("hide");
            Swiper1.navigation.$prevEl.addClass("hide");
          };
        });
      },
      immediate: true, //立即执行，在最近dom更新之前就会执行
    },
  },
};
</script>
<style lang="less"	scoped>
.ash_content {
  background-color: #f5f5f5;
  width: 100%;
  margin-top: 20px;

  .mi_seckill {
    margin-bottom: 22px;
    position: relative;
  }
  .mi_seckill_title {
    height: 58px;
    h2 {
      line-height: 58px;
      font-size: 22px;
      font-weight: 200;
    }
    .swiper-button-next,
        .swiper-button-prev {
          box-sizing: border-box;
          width: 36px;
          height: 20px;
          background: #ffffff;

          // top: 0;
          // margin-top: 0;
          &::after {
            font-size: 12px;
          }
        }
        /deep/&.swiper-button-prev {
          margin-top: -200px;
          margin-left: 1100px;
        }
        /deep/&.swiper-button-next{
          margin-top: -200px;
          right: 0;
        }
  }
  .mi_seckill_content {
    .seckill_time {
      height: 340px;
      width: 234px;
      background: #f1eded;
      float: left;
      border-top: 1px solid red;
      /* 秒杀 */
      .miaosha {
        text-align: center;
        margin: 54px 10px 30px 10px;
        span {
          font-size: 21px;
          color: red;
        }
        img {
          display: block;
          width: 60%;
          height: 100%;

          margin: 20px 0 0 70px;
        }
      }

      .miaosha_time {
        margin-top: 20px;
        color: rgba(0, 0, 0, 0.54);
        font-size: 15px;
        text-align: center;
      }
    }
    .seckill_banner {
      float: left;
      height: 340px;
      width: 992px;
      .swiper-container {
        height: 340px;
        width: 992px;
        box-sizing: border-box;
        position: relative;
        //padding-left: 14px;
        /deep/.swiper-slide {
          height: 340px;
          width: 234px;
          margin-left: 14px;
          flex-shrink: 1;
        }
        
      }
      .seckill_card {
        border-top: #0099ff;
        float: left;
        height: 100%;
        width: 234px;

        background-color: #fff;
        text-align: center;
        border-top: 1px solid #0099ff;
        a {
          display: block;
        }
        /* seckill_card */
        .content_img {
          height: 206px;
          img {
            height: 160px;
            width: 160px;
            margin: 33px 0 22px 0;
          }
        }
        .content_title {
          p {
            overflow: hidden;
            /* text-overflow: ellipsis; */
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            color: #212121;
            font-size: 14px;
            margin: 10px 0 10px 0;
          }
          span {
            color: #b0b0b0;
            font-size: 12px;
            margin: 10px 0 10px 0;
          }

          .price {
            font-size: 14px;
            margin-top: 12px;
            margin: 20px 0 10px 0;
            label {
              color: #ff6709;
            }
            del {
              color: #b0b0b0;
            }
          }
        }
      }
    }
  }
  /* 手机开始 */
  .mi_phone {
    //height: 615px;
    .phone_wrapper {
      height: 100%;
      width: 234px;
      float: left;
    }
    .phone_wrapper:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      background-position: 0 -2px;
      transform: translate3d(0, -2px, 0);
    }
    .phone_card {
      ul {
        height: 100%;
        float: right;
        width: 992px;
      }
      li {
        text-align: center;
        float: left;
        width: 234px;
        height: 300px;
        background-color: #fff;
        margin-left: 14px;
        margin-bottom: 14px;
      }
      li:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        background-position: 0 -2px;
        transform: translate3d(0, -2px, 0);
      }
      .content_img {
        height: 206px;
        img {
          height: 160px;
          width: 160px;
          margin: 33px 0 22px 0;
        }
      }
      p {
        overflow: hidden;
        /* text-overflow: ellipsis; */
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        color: #212121;
        font-size: 14px;
        margin: 10px 0 10px 0;
      }
      span {
        color: #b0b0b0;
        font-size: 12px;
        margin: 5px 0 5px 0;
      }

      .price {
        font-size: 14px;
        margin-top: 12px;
        margin: 10px 0 10px 0;
        label {
          color: #ff6709;
        }
        del {
          color: #b0b0b0;
        }
      }
    }
  }
}
</style>