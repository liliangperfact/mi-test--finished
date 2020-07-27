<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in shopCartList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="updateOneIscheck(cart)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
         
          <li class="cart-list-con4">
            <span class="price">￥{{cart.skuPrice}}</span>
          </li>
           <!-- @click="cart.skuNum<=1?1:cart.skuNum--" -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins"  
            @click="updateCartNum(cart,-1)"
            @change="cart.skuNum<=1?1:cart.skuNum--"
            >-</a>
            <input autocomplete="off" type="text" 
            :value="cart.skuNum" minnum="1" class="itxt"
            @change="updateCartNum(cart,$event.target.value*1)">
            <a href="javascript:void(0)" class="plus"
             @click="updateCartNum(cart,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum" >{{(cart.skuNum * cart.skuPrice)}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br>
            <a href="javascript:;" >移到收藏</a>
          </li>
        </ul>

        
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteChecked()">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade">结算</router-link>
          <!-- <a class="sum-btn" href="###" target="_blank" @click="">结算</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import debounce from "lodash/debounce"
  export default {
    name: 'ShopCart',
    mounted(){
      this.getShopCartList()
    },
    methods:{
      getShopCartList(){
        this.$store.dispatch('getShopCartList')
      },
      updateCartNum: debounce(async function(cart,changeNum){
        if(cart.skuNum + changeNum < 1){//7   -8
         //如果原来数量加上改变数量小于1
          changeNum = 1 - cart.skuNum// changeNum = 1 - 7   -6+7 =1
          //让改变数量等于1-原来数量
        }
        try {
          await this.$store.dispatch('addorUpdateShopCart',{skuId:cart.skuId,skuNum:changeNum})
          //传参发送请求,相当于重新在详情页点击了加入购物车
          this.getShopCartList()//发送请求
        } catch (error) {
          alert(error.message)//抛出错误
        }
        
      }, 250, { 'trailing': true }),
      
      //修改单个购物车选中信息updateOneIscheck
      async updateOneIscheck(cart){
        try {
          await this.$store.dispatch('updateIsChecked',{skuId:cart.skuId,isChecked:cart.isChecked === 1?0:1})
          //传参，勾选状态逻辑取反（因为你点击了，所以就是非正即反）
          this.getShopCartList()//更新
        } catch (error) {
         // console.log(1121)
          alert(error.message)
        }
        
      },
      async deleteCart(cart){
        try {
           const result  = await this.$store.dispatch('deleteShopCart',cart.skuId)
           this.getShopCartList()//更新
        } catch (error) {
          alert(error.message)
        }
       
      },
      async deleteChecked(){
        try {
         const result = await this.$store.dispatch('deleteChecked')
          this.getShopCartList()//更新
        } catch (error) {
          alert(error.message)
        }
       
      }
    },
    computed:{
      ...mapState({
        shopCartList:state => state.shopcart.shopCartList
      }),
      checkedNum(){
        return this.shopCartList.reduce((pre,item,index) => {
          if(item.isChecked){
            pre+=item.skuNum
          }
          return pre
        },0)
      },
      allPrice(){
        return this.shopCartList.reduce((pre1,item,index) => {
          if(item.isChecked){
            pre1+=item.skuNum * item.skuPrice
          }
          return pre1
        },0)
      },
      isAllChecked:{
        get(){
          return this.shopCartList.every((item,index) => item.isChecked === 1) && this.shopCartList.length > 0
          //因为是v-module，所以他的状态就要让他们（商品列表）的状态一样，用every就行
        },
        async set(val){
          //点击全选进入
          try {
            const result = await this.$store.dispatch('updateAllIsChecked',val?1:0)
            //和单个原理差不多，点击全选后，值取反，然后发送到vuex的函数，来发送请求
            this.getShopCartList()//更新
          } catch (error) {
            alert(error.message)
          }
          
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1226px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          
          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;
        a{
          float: left;
          margin-left: 5px;
          padding: 5px 10px;
          color: #cccccc;
          background-color: #f5f5f5;
          transition: all .5s;
        }
        a:hover{
          color: #fff;
          background-color: #ff6700;
          //border: 1px #ff6700 solid;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>