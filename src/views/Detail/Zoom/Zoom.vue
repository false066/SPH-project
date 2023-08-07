<template>
  <div class="spec-preview" ref="box">
    <!-- <img :src="skuDefaultImg" /> -->
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <!-- <img :src="skuDefaultImg" /> -->
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ['skuDefaultImg', 'skuImageList'],
  data(){
    return{
      currentIndex:0
    }
  },
  computed:{
    imgObj(){
      return this.skuImageList[this.currentIndex] || {}
    }
  },
  methods:{
    handler(event){
      let mask = this.$refs.mask
      let boxWidth = this.$refs.box.offsetWidth - this.$refs.box.clientLeft *2;
      let boxHeight = this.$refs.box.offsetHeight - this.$refs.box.clientTop *2;
      // console.log(boxWidth);
      let big = this.$refs.big
      let left = event.offsetX-mask.offsetWidth/2
      // console.log(event);
      // console.log(mask.offsetWidth);
      let top = event.offsetY-mask.offsetHeight/2
      // console.log(mask.offsetHeight);
      // 约束范围
      if(left <= 0) left = 0;
      if(left >= (boxWidth-mask.offsetWidth)) left = boxWidth-mask.offsetWidth
      if(top <= 0) top = 0;
      if(top >= (boxHeight-mask.offsetHeight)) top = boxHeight-mask.offsetHeight
      // 修改元素的left|top属性值
      mask.style.left = left + 'px';
      mask.style.top = top + 'px'; 
      // 修改放大镜属性值
      big.style.left = -2 * left + 'px';
      big.style.top = -2 * top + 'px'; 
    }
  },
  mounted(){
    this.$bus.$on('getIndex',(index)=>{
      // console.log(index);
      this.currentIndex = index
    })
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