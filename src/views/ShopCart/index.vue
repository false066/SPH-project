<template>
  <div>
    <div class="cart">
      <h4>全部商品</h4>
      <div class="cart-main" v-if="cartInfoList.length">
        <div class="cart-th">
          <div class="cart-th1">全部</div>
          <div class="cart-th2">商品</div>
          <div class="cart-th3">单价（元）</div>
          <div class="cart-th4">数量</div>
          <div class="cart-th5">小计（元）</div>
          <div class="cart-th6">操作</div>
        </div>
        <div class="cart-body">
          <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
            <li class="cart-list-con1">
              <input type="checkbox" name="chk_list" :checked="item.isChecked == 1"
                @change="updateCheckedById(item, $event)">
            </li>
            <li class="cart-list-con2">
              <img :src="item.imgUrl">
              <div class="item-msg">{{ item.skuName }}</div>
            </li>
            <li class="cart-list-con4">
              <span class="price">{{ item.cartPrice.toFixed(2) }}</span>
            </li>
            <li class="cart-list-con5">
              <a href="javascript:void(0)" class="mins" @click="handler('mins', -1, item)">-</a>
              <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt"
                @change="handler('change', $event.target.value * 1, item)">
              <a href="javascript:void(0)" class="plus" @click="handler('plus', 1, item)">+</a>
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{ (item.cartPrice * item.skuNum).toFixed(2) }}</span>
            </li>
            <li class="cart-list-con7">
              <a class="sindelet" @click="deleteCartById(item)">删除</a>
              <br>
              <a>移到收藏</a>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <el-empty description="空空如也..." />
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input class="chooseAll" type="checkbox" :checked="isAllCheck && cartInfoList.length > 0"
            @change="updateAllCheck($event)">
          <span>全选</span>
        </div>
        <div class="option">
          <a @click="deleteAllCheckedCart">删除选中的商品</a>
          <a href="#none">移到我的关注</a>
          <a href="#none">清除下柜商品</a>
        </div>
        <div class="money-box">
          <div class="chosed">已选择
            <span>{{ cartInfoList.length }}</span>件商品
          </div>
          <div class="sumprice">
            <em>总价（不含运费） ：</em>
            <i class="summoney">{{ totalPrice.toFixed(2) }}</i>
          </div>
          <div class="sumbtn">
            <a class="sum-btn" href="###">结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(['cartList']),
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算商品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        if (item.isChecked === 1) {
          sum += item.skuNum * item.cartPrice
        }

        // console.log(item);
      });
      return sum;
    },
    // 判断底部复选框是否全部勾选
    isAllCheck() {
      // every用法：数组遍历里面的原理，只要全部元素isChecked属性都为1==》真 true
      // 只要有一个不是1 ======》假 false
      return this.cartInfoList.every(item => item.isChecked == 1)
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('getCartList')
    },
    // type:为了区分这三个元素
    // disNum形参：+变化量 +1，-变化量 -1  input最终的个数（并不是变化量）
    // cart形参：所点击的那一个产品【身上有id】
    // async handler(type, disNum, cart) {
    //   // console.log(type,disNum,cart);
    //   // 向服务器发请求，修改数量
    //   switch (type) {
    //     case "plus":
    //       disNum = 1
    //       break;
    //     case "mins":
    //       disNum = cart.skuNum > 1 ? -1 : 0
    //       break;
    //     case "change":
    //       // 如果用户输入的最终量，非法的（带有汉字），带给服务器数字
    //       // if(isNaN(disNum) || disNum < 1  ){
    //       //   disNum = 0
    //       // }else{
    //       //   // 属于正常情况(小数：取整)：带个服务器的变化量：用户输入进来的-产品的起始个数
    //       //   disNum = parseInt(disNum) - cart.skuNum
    //       // }
    //       disNum = (isNaN(disNum) || disNum < 1)  ? 0 : (parseInt(disNum) - cart.skuNum)
    //   }
    //   try {
    //     // 代表修改成功
    //     await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum:  disNum })
    //     // 再一次向服务器获取数据
    //     this.getData()
    //   } catch (error) {
    //     alert(error.message)
    //   }
    // },
    // 节流
    handler: throttle(async function (type, disNum, cart) {
      // console.log(type,disNum,cart);
      // 向服务器发请求，修改数量
      switch (type) {
        case "plus":
          disNum = 1
          break;
        case "mins":
          disNum = cart.skuNum > 1 ? -1 : 0
          break;
        case "change":
          // 如果用户输入的最终量，非法的（带有汉字），带给服务器数字
          // if(isNaN(disNum) || disNum < 1  ){
          //   disNum = 0
          // }else{
          //   // 属于正常情况(小数：取整)：带个服务器的变化量：用户输入进来的-产品的起始个数
          //   disNum = parseInt(disNum) - cart.skuNum
          // }
          disNum = (isNaN(disNum) || disNum < 1) ? 0 : (parseInt(disNum) - cart.skuNum)
      }
      try {
        // 代表修改成功
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 再一次向服务器获取数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 1000),
    async deleteCartById(cart) {
      // console.log(cart);
      let skuId = cart.skuId
      try {
        //删除商品成功
        await this.$store.dispatch("deleteCartById", skuId);
        //再次获取购物车最新的数据
        this.getData();
      } catch (error) {
        alert("删除失败");
      }
    },
    // 删除全选中的商品
    // 这个回调函数咱们没有办法收集到有用的数据
    async deleteAllCheckedCart() {
      try {
        // 派发一个action
        await this.$store.dispatch('deleteAllCheckedCart')
        // 再次发送请求获取购物车数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改某个产品的选中状态
    async updateCheckedById(cart, event) {
      // 带给服务器的参数isChecked不是布尔值，是0|1
      // console.log(event.target.checked);
      // console.log(event);
      // console.log(this.isAllCheck);
      try {
        let isChecked = event.target.checked ? '1' : '0'
        console.log(isChecked);
        await this.$store.dispatch('UpdateCheckedById', { skuId: cart.skuId, isChecked: isChecked })
        this.getData()

      } catch (error) {
        alert('修改失败')
      }
    },
    // 全选业务
    async updateAllCheck(event) {
      //获取全选的复选框勾选的状态,接口需要的1|0
      let isChecked = event.target.checked ? "1" : "0";
      try {
        //await等待成功:购物车全部商品勾选状态成功以后
        await this.$store.dispatch("allUpdateChecked", isChecked);
        this.getData();
      } catch (error) {
        alert("修改失败")
      }
    }
  },

}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
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

      a {
        float: left;
        padding: 0 10px;
        color: #666;
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