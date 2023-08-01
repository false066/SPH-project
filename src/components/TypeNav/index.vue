<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派 -->
      <div @mouseleave="leaveIndex" @click="goSearch">
        <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
        <!-- 过渡动画  -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 三级联动 --> <!-- 利用goSearch事件委派+编程式导航实现路由的跳转与参数传递-->
            <div class="all-sort-list2">
              <!-- 一级分类 -->
              <div class="item ob" v-for="(item, index) in categoryList" :key="item.categoryId">
                <h3 @mouseenter="changeIndex(index)" :class="{ current: currentIndex === index }">
                  <a :data-categoryName="item.categoryName" :data-category1Id="item.categoryId">{{ item.categoryName
                  }}</a>
                </h3>
                <!-- 二级，三级分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                  <div class="subitem" v-for="(i) in item.categoryChild" :key="i.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="i.categoryName" :data-category2Id="i.categoryId">{{ i.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="j in i.categoryChild" :key="j.categoryId">
                          <a :data-categoryName="j.categoryName" :data-category3Id="j.categoryId">{{ j.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//引入方式：是把lodash全部功能函数引入
// 最好的引入方式：按需引入
import throttle from 'lodash/throttle'
// console.log(_);
export default {
  name: 'TypeNav',
  data() {
    return {
      // 储存用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true, //默认显示
    }
  },
  // 组件挂载完成后，可以向服务器发请求
  mounted() {
    
  },
  created(){
    if(this.$route.path != "/home") {
        this.show = false;
      }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数,当使用这个计算属性的时候,右侧的函数会立即执行一次
      // 注入一个参数state,其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList
      }
    })
  },
  methods: {
    changeIndex: throttle(function (index) {
      // console.log(index);
      // 正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3都会触发鼠标进入事件
      // 非正常情况（用户操作过快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，zhiyoubufenh3出发了
      // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量的业务，有可能出现卡顿现象

      this.currentIndex = index
    }, 50),

    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    goSearch(event) {
      // 最好的解决办法：编程式导航+事件委派
      // 存在一些问题：事件委派是把所有的子节点【h3、dt、dl、em】的事件委派给父亲节点
      // 点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
      // 存在一个问题：即使你能确定点击的是a标签，你怎么能确定点击的是一级、二级、三级标签

      //第一个问题:div父节点子元素太多【h3、h2、em、dt、dd、dl...a】？你怎么知道你点击的一定是a
      //第二个问题:要区分一级分类、二级分类、三级分类的a标签【category1Id|category2Id|category2Id】
      let targetNode = event.target;
      // console.log(targetNode.dataset);
      //获取触发事件节点的自定义属性【a:data-categoryName】
      let { categoryname, category1id, category2id, category3id } =
        targetNode.dataset;
      //判断点击的是a【不管是1|2|3】
      if (categoryname) {
        //点击只要是a,就是往search模块跳转
        var locations = {
          name: "search",
          query: { categoryName: categoryname },
        };
        // 动态添加categoryId
        //一级分类的a
        if (category1id) {
          locations.query.category1Id = category1id;
        } else if (category2id) {
          //二级分类的a
          locations.query.category2Id = category2id;
        } else {
          //三级分类的a
          locations.query.category3Id = category3id;
        }
        //点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
        if (this.$route.params.keywords) {
          locations.params = this.$route.params;
        }
        //目前商品分类这里携带参数只有query参数
        this.$router.push(locations);

      }
    },
    //全部商品分类鼠标进入
    changeShow() {
      //鼠标进入:在search路由下,在修改数据
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },

  }
}
</script>
<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
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
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
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
              // display: block;
              opacity: .9;
            }
          }
        }

        .current {
          background-color: skyblue
        }
      }
    }

    // 过渡动画样式
    // 过度动画开始状态
    .sort-enter {
      height: 0;
      opacity: 0;
    }

    过渡动画结束状态 .sort-enter-to {
      height: 461px;
      opacity: 1;
    }

    // 定义动画时间、速率
    .sort-enter-active {
      transition: all .5s linear;
    }
  }
}
</style>
