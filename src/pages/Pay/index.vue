<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">
            请您在提交订单
            <em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：
            <em>{{$route.query.orderNo}}</em>
          </span>
          <span class="fr">
            <em class="lead">应付金额：</em>
            <em class="orange money">￥{{orderInfo.totalFee}}</em>
          </span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持
            <span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，
          <span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li>
              <img src="./images/pay2.jpg" />
            </li>
            <li>
              <img src="./images/pay3.jpg" />
            </li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li>
                <img src="./images/pay10.jpg" />
              </li>
              <li>
                <img src="./images/pay11.jpg" />
              </li>
              <li>
                <img src="./images/pay12.jpg" />
              </li>
              <li>
                <img src="./images/pay13.jpg" />
              </li>
              <li>
                <img src="./images/pay14.jpg" />
              </li>
              <li>
                <img src="./images/pay15.jpg" />
              </li>
              <li>
                <img src="./images/pay16.jpg" />
              </li>
              <li>
                <img src="./images/pay17.jpg" />
              </li>
              <li>
                <img src="./images/pay18.jpg" />
              </li>
              <li>
                <img src="./images/pay19.jpg" />
              </li>
              <li>
                <img src="./images/pay20.jpg" />
              </li>
              <li>
                <img src="./images/pay21.jpg" />
              </li>
              <li>
                <img src="./images/pay22.jpg" />
              </li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span>
              <a href="weixinpay.html" target="_blank">微信支付</a>
            </span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      orderInfo: {},
      status: 0,
    };
  },
  mounted() {
    this.getorderInfo(); //定义函数
  },
  methods: {
    async getorderInfo() {
      //携带订单号去原型中的API向api发送请求
      const result = await this.$API.reqOrderInfo(this.$route.query.orderNo);
      if (result.code === 200) {
        //如果成功
        this.orderInfo = result.data; //返回的结果赋值给订单信息，就能拿到订单的信息了
      }
    },
    async pay() {
      //支付开始
      //codeUrl:"weixin://wxpay/bizpayurl?pr=KVSbTNI"
      // With async/await
      try {
        //二维码解析成图片，参数不要写错
        const imgUrl = await QRCode.toDataURL(this.orderInfo.codeUrl);
        this.$alert(
          //弹窗开始
          `<img src="${imgUrl}" style="width:200px"/>`, //显示图片
          "请使用微信扫码支付", //标题
          {
            dangerouslyUseHTMLString: true, //html自定义
            showClose: false, //关闭按钮///关
            showCancelButton: true, //取消按钮///开
            confirmButtonText: "我已成功支付", //确定按钮///我已成功支付
            cancelButtonText: "支付中遇到了问题", //取消按钮///支付中遇到了问题
            center: true, //居中布局////开
            beforeClose: (action, instance, done) => {
              //点击按钮之前的回调函数
              if (action === "confirm") {
                //如果点击的是确定
                if (status !== 200) {
                  //如果返回200
                  clearInterval(this.timer); //清除定时器
                  this.timer = null; //编号清除
                  alert("支付成功"); //弹窗
                  this.$router.push("/paysuccess"); //跳转支付成功页
                  done()
                } else {
                  //如果返回的不是200，说明用户在瞎几把操作，则提示
                  this.$message.warning("请确保支付成功");
                }
              } else if (action === "cancel") {
                //点击取消
                clearInterval(this.timer); //清除定时器
                this.timer = null; //编号清除
                this.$router.push("/warning"); ////跳转问题页
                done(); //关闭弹窗
              }
            },
          }
        )
          .then(() => {}) //代表你点了确认按钮后的逻辑    都会强制关闭消息盒子
          .catch(() => {}); //代表你点了取消按钮后的逻辑   都会强制关闭消息盒子
      } catch (error) {
        //....
        this.$message.error(error.message);
      }

      if (!this.timer) {
        //查找全局定时器，如果没有，则创建
        this.timer = setInterval(async () => {
          //发送订单ID去全局的原型对象中去向api发送请求，查询状态
          const result = await this.$API.reqPayStatus(this.orderInfo.orderId);
          if (result.code === 200) {
            //如果返回200
            this.status = 200; //保存状态码，为了判断用户是否支付成功
            clearInterval(this.timer); //清除定时器
            this.timer = null; //编号清除
            alert("支付成功"); //弹窗
            this.$router.push("/paysuccess"); //跳转支付成功页
            this.$msgbox.close(); //手动关闭
          }
        }, 3000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>