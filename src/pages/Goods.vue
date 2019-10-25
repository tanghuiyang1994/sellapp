<template>
  <div class="goods">
    <!-- 侧边栏 -->

    <div class="leftnav" id="leftscroll">
      <ul class="content">
        <div
          v-for="(item,key) in data"
          :key="key"
          :class="{selected:name==item.name,leftNavItem:true}"
          @click="navname(item.name)"
        >
          <div class="itemtext">{{item.name}}</div>
        </div>
      </ul>
    </div>
    <!-- 右侧内容 -->
    <div class="rightbox" id="rightscroll">
      <ul class="content">
        <div v-for="(item,key) in data" :key="key" :id="item.name">
          <!-- 食品分类 -->
          <div class="foodstop">{{item.name}}</div>
          <div class="foods">
            <div v-for="(foods,index) in item.foods" :key="index" class="foodsbox">
              <div class="foodsitem">
                <img :src="foods.icon" />
                <div class="foodscontent">
                  <div class="foodtitle">{{foods.name}}</div>
                  <div class="description">{{foods.description}}</div>
                  <div class="rating">
                    <span class="sellCount">月售{{foods.sellCount}}份</span>
                    <span>好评率{{foods.rating}}%</span>
                  </div>
                  <div class="price">
                    <div>
                      <span>￥{{foods.price}}</span>
                      <del>{{(foods.oldPrice)?("￥"+foods.oldPrice):''}}</del>
                    </div>
                    <div class="foodsbtn">
                      <Icon
                        type="ios-remove-circle-outline"
                        v-show="foods.count<1?false:true"
                        @click="changenum(-1,index,foods.name)"
                      />
                      <label v-show="foods.count<1?false:true">{{foods.count}}</label>
                      <Icon type="md-add-circle" @click="changenum(1,index,foods.name)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getgoods } from "../apis/api";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      name: "热销榜", //当前选中的选项卡
      show: false,
    };
  },
  computed: {
    data() {
      return this.$store.state.data;
    },
    itemHeight() {
      //等到前面异步执行完毕,就执行这个回调函数
      //console.log(document.getElementById('热销榜').offsetHeight)
      var arr = [];
      for (let obj of this.data) {
        arr.push(document.getElementById(obj.name).offsetHeight);
      }
      var dataArr = [];
      var total = 0;
      for (let i = 0; i < arr.length; i++) {
        dataArr.push({
          min: total,
          max: total + arr[i],
          tabname: this.data[i].name
        });
        total += arr[i];
      }
      //console.log(dataArr);
     return dataArr;
    }
  },
  created() {
    this.$store.dispatch("initdata");
    // getgoods()
    //   .then(res => {
    //     //console.log(res);
    //     let { data, errno } = res.data;
    //     if (errno === 0) {
    //       this.data = data;
    //     }
    //     this.$nextTick(() => {
    //       //等到前面异步执行完毕,就执行这个回调函数
    //       //console.log(document.getElementById('热销榜').offsetHeight)
    //       var arr = [];
    //       for (let obj of this.data) {
    //         arr.push(document.getElementById(obj.name).offsetHeight);
    //       }
    //       var dataArr = [];
    //       var total = 0;
    //       for (let i = 0; i < arr.length; i++) {
    //         dataArr.push({
    //           min: total,
    //           max: total + arr[i],
    //           tabname: this.data[i].name
    //         });
    //         total += arr[i];
    //       }
    //       console.log(dataArr);
    //       this.itemHeight = dataArr;
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  },
  mounted() {
    this.leftScroll = new Bscroll("#leftscroll", {
      click: true //开启点击事件
    });
    this.rightScroll = new Bscroll("#rightscroll", {
      click: true, //开启点击事件
      probeType: 3 //开启监听右侧内容滑动并派发事件
    });

    this.rightScroll.on("scroll", obj => {
      let y = Math.abs(obj.y);
      for (let obj of this.itemHeight) {
        if (y >= obj.min && y < obj.max) {
          this.name = obj.tabname;
          break;
        }
      }
    });
  },
  methods: {
    navname(name) {
      this.name = name;
      this.rightScroll.scrollToElement("#" + name, 600);
    },
    changenum(num,index,name) {
      //console.log('goods',num,key,index)
      this.$store.commit({
            type:'setnum',
            num,
            name
      })
      //this.$store.state.data[key].foods[index].count+=num;
      
      // this.$state[key].map((item,key)=>{
      //   if(key==index){
      //     item.count+=num;
      //     return;
      //   }
      // })
    }
  }
};
</script>

<style lang="less" scoped>
.selected {
  background-color: #fff !important;
  color: black !important;
  border-right: 2px solid #00a0dc;
  padding-bottom: 50px;
}
.goods {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  .leftnav {
    width: 100px;
    height: 100%;
    overflow: scroll;
    background-color: #f4f5f7;
    .leftNavItem {
      width: 100px;
      height: 70px;
      padding: 0 16px;
      &:not(:last-of-type) {
        border-bottom: 1px solid #ccc;
      }
      .itemtext {
        display: flex;
        align-items: center;
        height: 70px;
      }
    }
  }
  .rightbox {
    flex: 1;
    overflow: scroll;
    .foodstop {
      width: 100%;
      background-color: #f4f5f7;
      font-size: 15px;
      padding: 6px 16px;
      box-shadow: 0 0 4px 0px inset #cccccc;
      color: #989da1;
    }
    .foods {
      width: 100%;
      padding: 0 20px;

      .foodsbox {
        width: 100%;
        & + .foodsbox {
          border-top: 1px solid #ccc;
        }
        .foodsitem {
          display: flex;
          width: 100%;
          padding: 20px 0;
        }
      }
      img {
        width: 80px;
        height: 80px;
        margin-top: 2px;
      }
      /* 食品内容 */
      .foodscontent {
        width: 100%;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* 食品标题 */
        .foodtitle {
          font-size: 18px;
          color: black;
        }
        /* 食品类型 */
        .description {
          width: 100px;
          font-size: 12px;
          color: #aaadb2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        /* 月售&好评 */
        .rating {
          font-size: 12px;
          color: #aaadb2;
          .sellCount {
            margin-right: 10px;
          }
        }
        /* 售价 */
        .price {
          display: flex;
          height: 24px;
          line-height: 24px;
          justify-content: space-between;
          span {
            font-weight: bold;
            color: red;
            font-size: 16px;
          }
          .foodsbtn {
            color: #00a0dc;
            font-size: 24px;
            display: flex;
            label {
              display: inline-block;
              margin: 0 5px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>