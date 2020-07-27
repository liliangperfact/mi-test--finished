<template>
  <div>
    <div class="mi_banner">
      <ul class="left_meun"   @click="toSearch">
        <li class="classify" 
        v-for="(c1,index) in categoryList" 
        :key="c1.categoryId">
          <a  class="lista"
              href="javascript:;"
              :data-categoryName="c1.categoryName"
              :data-category1Id="c1.categoryId">
            {{c1.categoryName}}
            <span class="fas fa-angle-right"></span>
          </a>
          <div class="item-list clearfix">
            <div class="subitem">
              <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                <dt>
                  <a 
                    href="javascript:;"
                    :data-categoryName="c2.categoryName"
                    :data-category2Id="c2.categoryId"
                  >{{c2.categoryName}}</a>
                </dt>
                <dd>
                  <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                    <a 
                      href="javascript:;"
                      :data-categoryName="c3.categoryName"
                      :data-category3Id="c3.categoryId"
                    >{{c3.categoryName}}</a>
                  </em>
                </dd>
              </dl>
            </div>
          </div>
        </li>
      </ul>
      <SliderLoop :bannerList="bannerList" id="banner_mi_b"></SliderLoop>
    </div>
  </div>
</template>
<script>

//import '@/pages/Home/Banner/css/index.css'
import { mapState, mapGetters } from "vuex"
export default {
  name: "Banner",
  props: {},
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.getCategoryList();
    //this.$GETCSS('index')
    
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch("getCategoryList");
    },
    toSearch(event) {
      let data = event.target.dataset;
      console.log(data)
      
      let { categoryname, category1id, category2id, category3id } = data;

      if (categoryname) {
        let location = {
          name: "search"
        };
        let query = {};
        query.categoryName = categoryname;

        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        console.log(location);

        //点击三级分类的时候，我们也不能光关注query参数，也要去看看之前有没有params参数
        //如果有，需要把之前的params参数也带上
        let { params } = this.$route;
        if (params) {
          location.params = params;
        }
        //看是否从首页到search页
        if(this.$route.path != '/home'){
          this.$$router.replace(location)
        }else{
          this.$router.push(location);
        }
        
      }
    },
    
    
    
  },
  computed: {
    // ...mapState(['categoryList'])
    //错误的

    ...mapState({
      //获取的数据格式化，逐一分离出来
      categoryList: state => state.home.categoryList
    }),
    ...mapGetters(["bannerList"])
  }
};
</script>
<style lang="less"	scoped>
/* 轮播 */
.mi_banner {
  margin: 0 auto;
  width: 1226px;
  height: 460px;
  background: #000000;
  overflow: hidden;
  position: relative;
  .swiper-container {
    width: 1226px;
    height: 460px;
    //left: 250px !important;
    /deep/.swiper-button-prev {
        //left: 250px !important;
        padding-left: 240px;
    }
    // // --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
    // --swiper-navigation-color: #ffffff;/* 单独设置按钮颜色 */
    // --swiper-navigation-size: 50px;/* 设置按钮大小 */
    // --swiper-button-prev-left:237px
    // .swiper-pagination {
    //   right: 31px;
    //   text-align: right;
    // }
  }
  .left_meun {
    width: 237px;
    height: 460px;
    background-color: rgba(0, 0, 0, 0.3);
    padding-top: 6px;
    left: 50%;
    z-index: 999;
    margin-left: -613px;
    position: absolute;

    .classify {
      .lista {
        height: 30px;
        line-height: 30px;
        display: block;
        color: #ffffff;
        font-size: 14px;
        padding: 0 24px 0 30px;
        .fa-angle-right {
          float: right;
          line-height: 30px;
        }
      }
      .lista:hover {
        background: #ff6700;
      }
      .item-list {
        display: none;
        position: absolute;
        width: 750px;
        min-height: 460px;
        background: #f7f7f7;
        left: 235px;
        border: 1px solid #ddd;
        top: 0;
        z-index: 9999 !important;
        a {
          color: #4f4c4c;
          font-size: 14px;
          padding: 0 5px 0 5px;
        }
        .subitem {
          float: left;
          width: 750px;
          padding: 0 4px 0 8px;

          dl {
            border-top: 1px solid #eee;
            padding: 6px 0;
            overflow: hidden;
            zoom: 1;

            &.fore {
              border-top: 0;
            }

            dt {
              float: left;
              width: 80px;
              line-height: 22px;
              text-align: right;
              padding: 3px 6px 0 0;
              font-weight: 700;
            }

            dd {
              float: left;
              width: 550px;
              padding: 3px 0 0;
              overflow: hidden;

              em {
                float: left;
                height: 14px;
                line-height: 14px;
                padding: 0 8px;
                margin-top: 5px;
                border-left: 1px solid #ccc;
              }
            }
          }
        }
      }
      &:hover {
        .item-list {
          display: block;
        }
      }
      &:last-of-type {
        display: none;
      }
    }
  }
  

  .img-list {
    width: 8582px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -1226px;
    li {
      float: left;
    }
  }
  img {
    height: 460px;
    width: 100%;
  }
  .pointer {
    position: absolute;
    width: 110px;
    left: auto;
    right: 30px;
    bottom: 20px;
    text-align: right;
    a {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid #fff;
      /* 	background-color: rgba(0, 0, 0, 0.1); */
      float: left;
      margin: 5px 4px;
    }
    a:hover,
    .active {
      /* 	background: hsla(0, 0%, 100%, .4);
			background-color: rgba(0, 0, 0, 0.4); */
      background-color: #008000;
    }
  }
  .prev-next {
    div {
      /* 				display: none; */
      width: 41px;
      height: 69px;
      background-color: transparent;
      color: rgba(255, 255, 255, 0.3);
      text-align: center;
      line-height: 64px;
      font-size: 30px;
      /* 开启绝对定位 */
      position: absolute;
      /* 设置垂直居中 */
      top: 0;
      bottom: 0;
      margin: auto 0;
    }
    .next:hover {
      background-position: -42px 0;
    }
    .prev:hover {
      background-position: 0 0;
    }
  }
}
</style>