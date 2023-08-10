<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <!-- 没有用户名，未登录 -->
                    <p v-if="!userName">
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link class="register" to="/register">免费注册</router-link>
                    </p>
                    <!-- 登陆了 -->
                    <p v-else>
                        <a>{{ userName }}</a>
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/trade">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link to="/home" class="logo">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keywords" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    name: "",
    data() {
        return {
            keywords: ''
        }
    },
    methods: {
        goSearch() {
            // 判断当前路由是否为 /search，若是则不进行重复导航
            // 路由参数传递
            // 1.字符串形式
            // this.$router.push('/search/' + this.keywords + "?k=" + this.keywords.toUpperCase());
            // 2.模板字符串
            // this.$router.push(`/search/${this.keywords}?k=${this.keywords.toUpperCase()}`)
            // 3.对象
            let locations = {
                name: "search",
                params: { keywords: this.keywords || undefined },
            };
            //确定路径当中有query参数
            if (this.$route.query.categoryName) {
                locations.query = this.$route.query;
            }

            this.$router.push(locations);
        },
        /**************************************************/
        // 面试题
        // 1.路由传递参数（对象写法）path是否可以结合params一起使用
        // 答：路由跳转传参的时候，对象的写法可以是name，path形式，但是需要注意的是，path这种传参形式不能与params参数一起使用
        // 2.如何指定params参数可传可不传？
        // 如果路由要求传递params参数，但是你就不传递params参数，URL会有问题
        // 如何指定params参数可以传递或者不传递,在配置路由的时候,在占位的后面加上一个问号[params可以传递或者不传递]
        // 3.params参数可以传递可以不传递,但是如果传递是空串,如何解决?
        // 使用undifined解决:params参数可以传递,不传递(空的字符串)
        // this.$router.push({name:"search"},params:{keywords:''||undifined},query:{k:this.keywords.toUpperCase()})
        // 4.路由组件能不能传递props数据
        // this.$router.push({ 
        //     name: 'search', 
        //     params: { keywords: this.keywords }, 
        //     query: { k: this.keywords.toUpperCase() } 
        // })
        async logout(){
            try {
                // 派发一个action请求
                await this.$store.dispatch('userLogout')
                // 如果成功，跳转到首页
                this.$router.push('/home')
            } catch (error) {
                alert(error.message)
            }
        }

    },
    mounted() {
        // 通过全局事件总线清楚关键字
        this.$bus.$on("clear",() =>{
            this.keywords = ''
        })
    },
    computed:{
        // 用户信息
        userName(){
            return this.$store.state.user.userInfo.name
        }
    }
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>
