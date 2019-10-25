<template>
  <div class="wrapper">
   <div class="content">
      <!-- 综合评分 -->
    <div class="grade">
      <!-- 左边 综合评分-->
      <div class="gradeleft">
        <div class="gradenum">3.9</div>
        <div class="allgrade">综合评分</div>
        <div class="rim">高于周边商家69.2%</div>
      </div>
      <!-- 右边服务态度 -->
      <div class="graderight">
        <div class="serve">
          <span class="title">服务态度</span>
          <div>
            <i class="icon1 icon"></i>
            <i class="icon1 icon"></i>
            <i class="icon1 icon"></i>
            <i class="icon1 icon"></i>
            <i class="icon2 icon"></i>
          </div>
          <span class="servenum">3.9</span>
        </div>
        <div class="serve">
          <span class="title">服务态度</span>
          <div>
            <i class="icon1 icon"></i>
            <i class="icon1 icon"></i>
            <i class="icon1 icon"></i>
            <i class="icon1 icon"></i>
            <i class="icon2 icon"></i>
          </div>
          <span class="servenum">4.0</span>
        </div>
        <div class="serve">
          <span class="title">送达时间</span>
          <span class="delivery">44分钟</span>
        </div>
      </div>
    </div>
    <!-- 评价板块 -->
    <div class="evaluate">
      <!-- 上面板块 -->
      <div class="evaluatetop">
        <div class="btnbox">
          <button class="btn1 btn">满意</button>
          <button class="btn2 btn">满意</button>
          <button class="btn3 btn">不满意</button>
        </div>
        <div class="look">
          <Icon type="ios-checkmark-circle" class="icon" />
          <span>只看有内容的评价</span>
        </div>
      </div>
      <!-- 评价内容 -->
      <div class="evaluatemain">
        <div class="evaluatecontent" v-for="(item,key) in data" :key="key">
          <img :src="item.avatar" />
          <div class="list">
            <div class="name">
              <div class="username">{{item.username}}</div>
              <div class="rateTime">{{$moment(item.rateTime).format('YYYY-MM-DD hh:mm:ss')}}</div>
            </div>
            <div class="starbox">
              <div>
                <Rate v-model="item.score" disabled class="star" />
              </div>
              <div class="deliveryTime">{{item.deliveryTime?item.deliveryTime+'分钟送达':"20分钟送达"}}</div>
            </div>
            <div class="text">{{item.text}}</div>
            <div class="varietybox">
              <div class="icon">
                <Icon type="md-thumbs-up" style="color:#019FDD" v-if="item.rateType==0" />
                <Icon type="md-thumbs-down" style="color:#B7BABF" v-if="item.rateType==1" />
              </div>
              <div class="variety">
                <div v-for="(obj,key) in item.recommend" :key="key">{{obj}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import { getevaluate } from "../apis/api";
import Bscroll from 'better-scroll';
export default {
  data() {
    return {
      data: []
      // avatar:'',//用户头像
      // username:'',//用户名
      // rateTime:0,//评论时间
      // deliveryTime:0,//送达时间
      // score:0,//评分
      // rateType:0,//评价类型
      // text:'',//评价内容
      // recommend:[],//用户推荐菜名
    };
  },
  created() {
    getevaluate()
      .then(res => {
        console.log(res);
        let { data, errno } = res.data;
        if (errno === 0) {
          this.data = data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted(){
     this.evaluate=new Bscroll('.wrapper')
  }
};
</script>

<style lang="less" scoped>
@color: #ff9900;
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: 100%;
  background-repeat: no-repeat;
}
.icon1 {
  background-image: url("../assets/images/star24_on@2x.png");
}
.icon2 {
  background-image: url("../assets/images/star24_off@2x.png");
}
/* 综合评分 */
.wrapper {
  width: 100%;
  height: 100%;
  background-color: #eaeaea;
  overflow: scroll;
  padding-bottom: 50px;
  /* 综合评分 */
  .grade {
    background-color: #fff;
    display: flex;
    padding: 10px 0;
    .gradeleft {
      width: 40%;
      text-align: center;
      border-right: 1px solid #d6d6d6;
      .gradenum {
        color: @color;
        font-size: 24px;
      }
      .allgrade {
        color: black;
      }
      .rim {
        font-size: 12px;
        color: #999b9f;
      }
    }
    .graderight {
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 12px;
      .serve {
        align-items: center;
        display: flex;
        color: black;
        i {
          margin-right: 2px;
        }
        .title {
          margin-right: 10px;
        }
        .servenum {
          color: @color;
          margin-left: 10px;
        }
        .delivery {
          color: #999b9f;
        }
      }
    }
  }

  /* 评价板块 */
  .evaluate {
    margin-top: 20px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    /* 上面板块 */
    .evaluatetop {
      padding: 0 20px;
      border-bottom: 1px solid #cccccc;
      .btnbox {
        padding: 10px 0;
        .btn {
          padding: 5px 15px;
          outline: none;
          border: none;
          margin-right: 10px;
        }
        .btn1 {
          background-color: #00a0dc;
          color: #fff;
        }
        .btn2 {
          background-color: #ccecf7;
        }
        .btn3 {
          background-color: #eaebed;
        }
      }
      .look {
        padding: 5px 0;
        border-top: 1px solid #ccc;
        line-height: 26px;
        display: flex;
        color: #b7babf;
        .icon {
          font-size: 26px;
          color: #b7babf;
          margin-right: 20px;
        }
      }
    }

    /* 评价内容 */
    .evaluatemain{
      padding: 0 20px;
       background-color: #fff;
      .evaluatecontent {
      width: 100%;
      display: flex;
      padding: 20px 0;
      &+.evaluatecontent{
        border-top: 1px solid #ccc;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 30px;
        margin-right: 10px;
      }
      .list {
        flex: 1;
        .name {
          display: flex;
          justify-content: space-between;
          .username {
            color: black;
          }
          .rateTime {
            color: #d4d5d8;
          }
        }
        .starbox {
          display: flex;

          .star {
            font-size: 14px;
            div{
              margin-right: 0px;
            }
          }
          .deliveryTime {
            color: #d4d5d8;
          }
        }
        .text {
          color: black;
          font-size: 12px;
        }
        .varietybox {
          display: flex;
          align-items: baseline;
          .icon {
            width: 20px;
          }
          .variety {
            display: flex;
            flex-wrap: wrap;
            div {
              padding: 2px 5px;
              font-size: 13px;
              text-align: center;
              white-space: nowrap;
              border: 1px dotted #ccc;
              margin: 2px 5px;
              border-radius: 5px;
              background-color: #eaebed;
            }
          }
        }
      }
    }
    }
    
  }
}
</style>