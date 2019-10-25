<template>
  <div class="merchant">
    <div class="content">
      <!-- 商家名称栏 -->
      <div class="merchanttitle">
        <!-- 上面名称 -->
        <div class="top">
          <div class="name">
            <div class="title">{{name}}</div>

            <div class="month">
              <Rate disabled v-model="valueDisabled" />
              <span>(661)&emsp;月售{{sellCount}}</span>
            </div>
          </div>
          <!-- 收藏 -->
          <div class="collect">
            <Icon
              type="md-heart"
              :style="{color:collect?'#F01414':'#8799B7'}"
              class="icon"
              @click="collectColor"
            />
            <div>已收藏</div>
          </div>
        </div>
        <!-- 下面起送价 -->
        <div class="bottom">
          <div class="givebox">
            <div class="givetitle">起送价</div>
            <div>
              <span>{{minPrice}}</span>元
            </div>
          </div>
          <div class="givebox">
            <div class="givetitle">商家配送</div>
            <div>
              <span>{{deliveryPrice}}</span>元
            </div>
          </div>
          <div class="givebox">
            <div class="givetitle">平均配送时间</div>
            <div>
              <span>{{deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
      </div>
      <!-- 公告活动 -->
      <div class="activity border">
        <!-- 标题 -->
        <div class="title">公告与活动</div>
        <!-- 内容 -->
        <div class="activitycontent">
          <!-- 文字描述 -->
          <p>{{bulletin}}</p>
          <div v-for="(item,key) in supports" :key="key">
            <img
              :src="item.type==0?icon1:(item.type==1?icon2:icon3)"
            />
            {{item.description}}
          </div>
        </div>
      </div>
      <!-- 商家实景 -->
      <div class="border picsbox">
        <div class="title">商家实景</div>
        <div class="pics">
          <div class="content">
            <div class="picwrapper">
              <div v-for="(item,key) in pics" :src="item" :key="key">
                <img :src="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 商家信息 -->
      <div class="merchantMsg">
        <div class="title">商家信息</div>
        <div v-for="(item,key) in infos" :key="key" class="msg">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getseller } from "../apis/api";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      valueDisabled: 3,
      collect: true,
      name: "", //商家名称
      deliveryTime: 0, //配送时间
      minPrice: 0, //起送价
      deliveryPrice: 0, //商家配送
      bulletin: "", //商家公告
      sellCount: "", //销售总数
      supports: [], //商家活动
      pics: [], //商家实景
      infos: [], //商家信息
      icon1:require('../assets/images/decrease_3@2x.png'),
      icon2:require('../assets/images/discount_3@2x.png'),
      icon3:require("../assets/images/special_3@2x.png"),
    };
  },
  created() {
    getseller()
      .then(res => {
        console.log(res);
        let { errno, data } = res.data;
        this.name = data.name;
        this.deliveryTime = data.deliveryTime;
        this.minPrice = data.minPrice;
        this.deliveryPrice = data.deliveryPrice;
        this.bulletin = data.bulletin;
        this.sellCount = data.sellCount;
        this.supports = data.supports;
        this.pics = data.pics;
        this.infos = data.infos;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    collectColor() {
      this.collect =!this.collect
    }
  },
  mounted() {
    let pics = new Bscroll(".pics",{scrollX:true,eventPassthrough:"vertical",});
    this.merchant = new Bscroll(".merchant",{click:true,});
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
  color: black;
}
.border {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.picwrapper {
  display: flex;
  div {
    padding: 5px;
    &:first-child {
      padding-left: 20px;
    }
    &:last-child {
      padding-right: 20px;
    }
  }
}
.merchant {
  width: 100%;
  height: 100%;
  background-color: #e8e9eb;
  overflow: auto;
  /* 商家名称栏 */
  .merchanttitle {
    background-color: #fff;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    .top {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      .name {
        .month {
          display: flex;

          span {
            line-height: 32px;
          }
        }
      }
      .collect {
        text-align: center;
        .icon {
          font-size: 26px;
          margin-bottom: 6px;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-top: 1px solid #ccc;
      .givebox {
        width: 100%;
        text-align: center;
        & + .givebox {
          border-left: 1px solid #ccc;
        }
        .givetitle {
          color: #b5b9bc;
        }
        span {
          font-size: 24px;
        }
      }
    }
  }
  /* 公告活动 */
  .activity {
    background-color: #fff;
    margin-top: 20px;
    padding: 0 20px;
    padding-top: 10px;
    .activitycontent {
      padding: 0 10px;
      p {
        color: #ea4f4d;
        border-bottom: 1px solid #ccc;
        padding: 10px 0 20px 0;
      }
      div{
        padding: 10px;
        display: flex;
        &+div{
          border-top: 1px solid #ccc;
        }
        img{
          width: 20px;
          margin-right: 10px;
        }
      }
    }
  }
  /* 商家实景 */
  .picsbox {
    background-color: #fff;
    margin-top: 20px;
    padding: 10px 0px 20px 0;
    .title {
      margin-left: 20px;
    }
    .pics {
      display: flex;
      overflow: auto;
      img {
        width: 120px;
        margin-top: 10px;
       
      }
    }
  }
  /* 商家信息 */
  .merchantMsg {
    background-color: #fff;
    margin-top: 20px;
    padding: 0 20px;
    border-top: 1px solid #cccccc;
    .title {
      padding: 10px 0;
    }
    .msg {
      padding: 15px 10px;
      border-top: 1px solid #ccc;
    }
  }
}
</style>