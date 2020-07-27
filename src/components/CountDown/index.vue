<template>
  <div>
    <!-- <span>{{hour? hourString+':'+minuteString+':'+secondString : minuteString+':'+secondString}}</span> -->
    <div class="miaosha_time_countdown clearfix">
      <span>{{hour}}</span>
      <label>:</label>
      <span>{{minuteString}}</span>
      <label>:</label>
      <span>{{secondString}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hour: "",
      minute: "",
      second: "",
      promiseTimer: "",
    };
  },
  props: {
    remainTime: {
      // 倒计时间总秒数
      default: "",
    },
  },
  mounted() {
    if (this.remainTime > 0) {
      this.hour = Math.floor((this.remainTime / 3600) % 24);
      this.minute = Math.floor((this.remainTime / 60) % 60);
      this.second = Math.floor(this.remainTime % 60);
      this.countDowm();
    }
  },
  methods: {
    countDowm() {
      var self = this;
      clearInterval(this.promiseTimer);
      this.promiseTimer = setInterval(function () {
        if (self.hour === 0) {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59;
            self.minute -= 1;
          } else if (self.minute === 0 && self.second === 0) {
            self.second = 0;
            self.$emit("countDowmEnd", true);
            clearInterval(self.promiseTimer);
          } else {
            self.second -= 1;
          }
        } else {
          if (self.minute !== 0 && self.second === 0) {
            self.second = 59;
            self.minute -= 1;
          } else if (self.minute === 0 && self.second === 0) {
            self.hour -= 1;
            self.minute = 59;
            self.second = 59;
          } else {
            self.second -= 1;
          }
        }
      }, 1000);
    },
    formatNum(num) {
      return num < 10 ? "0" + num :num;
    },
  },
  computed: {
    hourString() {
      return this.formatNum(this.hour);
    },
    minuteString() {
      return this.formatNum(this.minute);
    },
    secondString() {
      return this.formatNum(this.second);
    },
  },
};
</script>
<style lang="less"	scoped>
.miaosha_time_countdown {
  text-align: center;
  margin: 25px 25px 8px 25px;
  font-size: 18px;
  span {
    float: left;
    margin: 5px;
    background: #605751;
    color: white;
    width: 46px;
    height: 46px;
    line-height: 46px;
    font-size: 25px;
  }
  label {
    float: left;
    font-size: 24px;
    color: #605751;
    font-weight: 700;
    margin-top: 10px;
  }
}
</style>