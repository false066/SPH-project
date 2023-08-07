<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keywords">{{ searchParams.keywords }}<i @click="removeKeywords">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i
                @click="removeTradeMark">×</i>
            </li>
            <li class="with-x" v-for="(item, index) in searchParams.props" :key="index">{{ item.split(":")[1] }}<i
                @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="#">综合<span v-show="isOne" class="iconfont"
                      :class="{ 'icon-jiantou_xiangshang': isAsc, 'icon-jiantou_xiangxia': isDesc }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a href="#">价格<span v-show="isTwo" class="iconfont"
                      :class="{ 'icon-jiantou_xiangshang': isAsc, 'icon-jiantou_xiangxia': isDesc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                   <router-link :to="`/detail/${item.id}`"><img :src="item.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ item.price.toFixed(2) }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="item.title">{{ item.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{ item.id }}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
          :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" @getPageNo="getPageNo" :continues="5"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'Search',
  data() {
    return {
      // 带给服务器参数
      searchParams: {
        // 一级分类id
        category1Id: "",
        // 二级分类id
        category2Id: "",
        // 三级分类id
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keywords: "",
        // 排序:初始状态应该是综合|降序
        order: "1:desc",
        // 分页器用的：代表当前是第几页
        pageNo: 1,
        // 代表每一页展示数据个数
        pageSize: 10,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: ""
      }
    }
  },
  components: {
    SearchSelector
  },
  //当组件挂载之前执行一次【先于mounted之前】
  beforeMount() {
    // 复杂写法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.category2Id = this.$route.query.category2Id
    // this.searchParams.category3Id = this.$route.query.category3Id
    // this.searchParams.categoryName = this.$route.query.categoryName
    // this.searchParams.keywords = this.$route.params.keywords
    // Object.assign ES6新增语法，合并对象
    // 在发请求之前，把接口需要传递的参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // console.log(this.searchParams);
  },
  // 组件挂载完毕执行一次，【仅仅执行一次】
  mounted() {
    // 在发送请求之前带给服务器参数【searchParams参数发生变化时有数值带给服务器】
    this.getData()
  },
  computed: {
    // mapGetters里面的写法：传递的数组，因为getters计算是没有划分模块【home，search】
    ...mapGetters(['goodsList']),
    ...mapState({
            // 右侧需要的是一个函数,当使用这个计算属性的时候,右侧的函数会立即执行一次
            // 注入一个参数state,其实即为大仓库中的数据
            total: (state) => {
                return state.search.searchList.total
            }
        }),
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
  },
  methods: {
    // 向服务器发请求获取search模块数据（根据参数不同返回不同的数组进行展示）
    // 把这次请求封装成一个函数：当你需要在调用的时候调用即可
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
      // console.log(this.searchParams);
    },
    // 删除分类名字
    removeCategoryName() {
      // 把服务器的参数置空了，还需要向服务器发送请求
      // 带给服务器的参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
      // 但是你把相应的字段变为undifined，当前这个字段不会带给服务器
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      // 地址栏也需要修改：进行路由跳转
      //严谨：本意是删除query，如果路径当中出现params，路由跳转应该带着
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 删除关键字
    removeKeywords() {
      this.searchParams.keywords = undefined
      this.getData()
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit("clear")
      // 进行路由跳转
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 删除品牌
    removeTradeMark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 删除属性值
    removeProps(index) {
      // 删除选中的面包屑
      this.searchParams.props.splice(index, 1)
      // 再次发送请求
      this.getData()
    },
    // 自定义事件的回调
    tradeMarkInfo(trademark) {
      // 1.整理品牌字段的参数"ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getData()
    },
    //属性自定义事件回调
    attrInfo(attr, attrValue) {
      // console.log("1111111",attrValue);
      const props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重
      // if语句如果只有一行代码可以省略大花括号
      if (this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props)
      this.getData()
    },
    // 排序操作
    changeOrder(flag){
      // flag形参：它是一个标记，代表用户点击的是综合（1）价格（2）[用户点击的时候传递过来的]
      // let originOrder = this.searchParams.order;
      // 这里获取的是最开始的状态
      let originFlag = this.searchParams.order.split(':')[0]
      let originSort = this.searchParams.order.split(':')[1]
      // 准备一个新的order属性值
      let newOrder = ''
      // 点击的是综合
      if(flag === originFlag){
        newOrder = `${originFlag}:${originSort === "desc"? "asc ": "desc"}`
      }else{
        // 点击的是价格
        newOrder = `${flag}:${'desc'}`
      }
      this.searchParams.order = newOrder
      this.getData()
    },
    // 自定义事件的回调函数---获取当前第几页
    getPageNo(pageNo) {
      //父组件整理参数
      this.searchParams.pageNo = pageNo;
       this.getData();
    },
  },
  // 数据监听：监听组件实例上的属性的属性值变化
  watch: {
    // 监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      // 再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 再次发起Ajax请求
      this.getData()
      //每一次请求完毕，应该把相应的1、2、3级分类的id置空，让他们接收下一次相应的1、2、3id
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

      }
    }
  }
}
</style>