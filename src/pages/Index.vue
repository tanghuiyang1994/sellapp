<template>
  <div class="layout">
    <!-- 顶部 -->
    <div class="header">
      <div :style="{backgroundImage:`url(${avatar})`}" class="bg"></div>
      <div class="mask">
        <div class="masktop">
          <img :src="avatar" class="headimg" />
          <div class="title">
            <div class="titel-name">
              <img src="../assets/images/brand@2x.png" />
              <span>{{name}}</span>
            </div>
            <div class="titel1-time">
              <span>{{description}}</span> /
              <span>{{deliveryTime}}分钟送达</span>
            </div>
            <div class="title-msg">
              <img src="../assets/images/decrease_1@2x.png" />
              <span>{{getsupports}}</span>
              <div class="five">5个 ></div>
            </div>
          </div>
        </div>
        <!-- 公告 -->
        <div class="notice">
          <img src="../assets/images/bulletin@2x.png" />
          <span>{{bulletin}}</span>
          <i>></i>
        </div>
      </div>
      <!-- 导航 -->
      <div>
        <Menu mode="horizontal" :active-name="selected" class="nav">
          <MenuItem name="1" to="/">商品</MenuItem>
          <MenuItem name="2" to="evaluate">评价</MenuItem>
          <MenuItem name="3" to="merchant">商家</MenuItem>
        </Menu>
      </div>
    </div>
    <!-- 页面主体 -->
    <div class="content" style="paddingBottom:50px;">
      <!-- 内容 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 页脚 -->
    <transition name="fade">
      <div class="send" v-show="allmoney>=20?true:false" v-if="carshow?false:true">已满足起送价</div>
    </transition>
    <transition name="slide-fade">
      <div v-show="(this.$store.getters.shopcardata.length!=0&&carshow)?true:false">
        <Shopcar />
      </div>
    </transition>

    <div class="footer">
      <div
        class="shopbox"
        :style="shopcarlist.length?'backgroundColor:#FFD161':''"
        @click="clickcar"
      >
        <Badge :count="getallnum" class="numicon">
          <a href="#" class="demo-badge"></a>
        </Badge>
        <Icon type="md-cart" class="shopcar" :style="shopcarlist.length?'color:#141C27':''" />
      </div>
      <div class="moeny">
        <span class="allmoney" :style="{color:allmoney?'#fff':'#808589'}">￥{{allmoney?allmoney:0}}</span>
        <span class="addfee">另需配送费￥4元</span>
        <div
          class="fee"
          :style="{backgroundColor:allmoney?'#FFD161':'#2b343b'}"
        >{{allmoney?'去结算':'￥20起送'}}</div>
      </div>
    </div>
    <!-- 弹出蒙层 -->
    <!-- <transition name="fade">
  <div class="maskbox" v-show="carshow">
      </div>
    </transition>-->
  </div>
</template>

<script>
import { getseller } from "../apis/api";
import Shopcar from "./Shopcar";
export default {
  data() {
    return {
      selected: "1",
      avatar: "", //商家图片
      name: "", //商家名称
      deliveryTime: "", //配送时间
      description: "", //配送方式
      supports: [], //优惠活动
      bulletin: "", //公告
      carshow: false
    };
  },
  computed: {
    getsupports() {
      //优惠活动
      let str = "";
      for (let item of this.supports) {
        str += item.description + ",";
      }
      return str;
    },
    shopcarlist() {
      //console.log(this.$store.getters.shopcardata);
      if (this.$store.getters.shopcardata.length == 0) {
        this.carshow = false;
      }
      return this.$store.getters.shopcardata;
    },
    getallnum() {
      //计算选中商品的总数量
      if (this.$store.getters.shopcardata.length != 0) {
        let allnum = 0;
        for (let i = 0; i < this.$store.getters.shopcardata.length; i++) {
          allnum += this.$store.getters.shopcardata[i].count;
        }
        return allnum;
      }
    },
    allmoney() {
      //计算总价
      if (this.$store.getters.shopcardata.length != 0) {
        let allmoney = 0;
        for (let i = 0; i < this.$store.getters.shopcardata.length; i++) {
          let moeny =
            this.$store.getters.shopcardata[i].price *
            this.$store.getters.shopcardata[i].count;
          allmoney += moeny;
        }
        return allmoney;
      }
    }
  },
  created() {
    switch (location.hash) {
      case "#/evaluate":
        this.selected = "2";
        break;
      case "#/merchant":
        this.selected = "3";
        break;
      case "#/":
        this.selected = "1";
        break;
    }
    getseller()
      .then(res => {
        let { data, errno } = res.data;
        if (errno === 0) {
          //console.log(data);
          this.avatar = data.avatar;
          this.name = data.name;
          this.deliveryTime = data.deliveryTime;
          this.description = data.description;
          this.supports = data.supports;
          this.bulletin = data.bulletin;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    clickcar() {
      if (this.$store.getters.shopcardata.length != 0) {
        this.carshow = !this.carshow;
      }
    }
  },
  components: {
    Shopcar
  }
};
</script>

<style lang="less" scoped>
// .fade-enter-active,
// .fade-leave-active {
//   transition: all 1s ease;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0.5;
// }
.send {
  width: 100%;
  position: fixed;
  bottom: 50px;
  line-height: 26px;
  height: 26px;
  text-align: center;
  background-color: #fff1d0;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(250px);
  opacity: 0;
}
@fontS: 14px;
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .bg {
    /* 高斯模糊背景图 */
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 150px;
    filter: blur(4px);
    position: absolute;
    z-index: -1;
  }
  /* 头部 */
  .header {
    display: flex;
    flex-direction: column;
    width: 100%;

    color: #ffffff;
    /* 蒙层上的内容 */
    .mask {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;

      /* 蒙层上面的图片文字 */
      .masktop {
        padding: 20px;
        flex: 1;
        display: flex;
        .headimg {
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }
        .title {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .titel-name {
            display: flex;
            img {
              width: 30px;
              height: 20px;
              margin-right: 10px;
              margin-top: 4px;
            }
            span {
              font-size: 18px;
              font-weight: bold;
            }
          }
          .title-msg {
            display: flex;
            line-height: 20px;
            display: flex;
            img {
              margin-top: 2px;
              width: 14px;
              height: 14px;
            }
            span {
              font-size: 12px;
              width: 150px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .five {
              display: inline-block;
              position: absolute;
              right: 20px;
              margin-top: -4px;
              background-color: rgba(0, 0, 0, 0.4);
              font-size: 12px;
              padding: 4px 6px;
              border-radius: 20px;
            }
          }
        }
      }
      /* 公告栏 */
      .notice {
        width: 100%;
        display: flex;
        line-height: 16px;
        font-size: 12px;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 6px 12px;
        img {
          display: inline-block;
          width: 25px;
          height: 15px;
          background-image: url("../assets/images/bulletin@2x.png");
          background-size: 100%;
        }
        span {
          margin-left: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      height: 40px;
      line-height: 40px;
    }
  }
  /* 选中商品的总数量的样式 */
  .numicon {
    position: absolute;
    right: 4px;
    top: 4px;
  }
  /* 内容 */
  .content {
    flex: 1;
    overflow: hidden;
  }
  /* 弹出的购物车 */
  /* 页脚 */
  .footer {
    position: fixed;
    z-index: 903;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #141c27;
    .shopbox {
      background-color: #2b343d;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border-radius: 60px;
      border: 6px solid #141c27;
      position: fixed;

      left: 10px;
      bottom: 5px;
      .shopcar {
        color: #808589;
        font-size: 30px;
      }
    }
    .moeny {
      display: flex;
      justify-content: space-between;
      color: #808589;
      .allmoney {
        margin-left: 80px;
        font-size: 18px;
        font-weight: bold;
        border-right: 1px solid #2b343b;
        padding-right: 20px;
      }
      .addfee {
        font-size: 12px;
      }
      .fee {
        width: 100px;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
.height100 {
  height: 100%;
}
</style>