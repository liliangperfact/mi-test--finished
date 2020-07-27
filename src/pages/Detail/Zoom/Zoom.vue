<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" ref="eventTarget" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['imgList'],
    data(){
      return {
        defaultindex:0
      }
    },
    computed:{
      defaultImg(){
        if(this.imgList){
          return this.imgList[this.defaultindex] || {}
        }else{
          return []
        }
          
      }
    },
    mounted(){
      this.$bus.$on('changeDefaultIndex',this.changeDefaultIndex)
    },
    methods:{
      changeDefaultIndex(index){
        this.defaultindex = index
      },
      move(event){
        let target = event.target//鼠标所在元素事件（事件源：外层盒子）
        let mouseX = event.offsetX//鼠标距离外层盒子left值
        // console.log(event.offsetX)
        let mouseY = event.offsetY//鼠标距离外层盒子top值
        let bigImg =  this.$refs.bigImg//大盒子
        let mask = this.$refs.mask//蒙版
        let maskX = mouseX - mask.offsetWidth/2//蒙版的left值等于鼠标的left值减去蒙版的宽的一半
        let maskY = mouseY - mask.offsetHeight/2//蒙版的left值等于鼠标的top值减去蒙版的高的一半
         

        if(maskX<0){//如果蒙版的left值小于零
          maskX = 0//那就让他等于零
        }else if(maskX > target.clientWidth - mask.offsetWidth ){//如果蒙版的left大于外层盒子宽减去蒙版的宽
          maskX = target.clientWidth - mask.offsetWidth//那就让它等于蒙版的left大于外层盒子宽减去蒙版的宽
        }
        console.log(target.clientWidth)//400
        console.log(mask.offsetWidth)//200
        if(maskY<0){//如果蒙版的top值小于零
          maskY = 0//那就让他等于零
        }else if(maskY > target.clientHeight - mask.offsetHeight ){//如果蒙版的top大于外层宽减去蒙版的高
          maskY = target.clientHeight - mask.offsetHeight//那就让它等于蒙版的top大于外层宽减去蒙版的高
        }

        mask.style.left = maskX + 'px'//更新蒙版的left值
        mask.style.top = maskY + 'px'//更新蒙版的top值

        bigImg.style.left = -2 * maskX + 'px' //大图容器的left值会等于小图的left值的负两倍，高同理
        bigImg.style.top = -2 * maskY + 'px'//大图容器的left值会等于小图的left值的负两倍，高同理
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>