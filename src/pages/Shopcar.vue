<template>
  <div>
    
    <div class="maskbox"></div>
    <div class="shopcar">
      <div class="send" v-show="allmoney>=20?true:false">已满足起送价</div>
      <div class="title">
        <div>购物车</div>
        <div @click="clearshopcar">清空购物车</div>
      </div>
      <div class="carbox">
        <div v-for="(item,key) in data" :key="key" class="item">
          <div class="name">{{item.name}}</div>
          <div class="price">￥{{item.price*item.count}}</div>
          <div class="iconbox">
            <Icon type="ios-remove-circle-outline" class="icon" @click="changecarnum(-1,item.name)" />
            <label>{{item.count}}</label>
            <Icon type="md-add-circle" class="icon" @click="changecarnum(1,item.name)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mask: false
    };
  },
  created() {
    //console.log("carstore", this.$store.getters.shopcardata);
    if (this.$store.state.data.length == 0) {
      this.$store.dispatch("initdata");
    }
  },
  computed: {
    data() {
      return this.$store.getters.shopcardata;
    },
    allmoney() {
      let allmoney = 0;
      for (let i = 0; i < this.$store.getters.shopcardata.length; i++) {
        let moeny =
          this.$store.getters.shopcardata[i].price *
          this.$store.getters.shopcardata[i].count;
        allmoney += moeny;
      }
      return allmoney;
    }
  },
  methods: {
    changecarnum(num, name) {
          this.$store.commit({
            type:'setnum',
            num,
            name,
          })
    },
    clearshopcar() {
      if(this.$store.getters.shopcardata.length>0){
        this.$store.dispatch("initdata");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.maskbox {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 902;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
}
.shopcar {
  position: fixed;
  z-index: 903;
  bottom: 50px;
  width: 100%;
  background-color: #fff1d0;

  .send {
    padding: 2px;
    text-align: center;
  }
  .title {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f4f4f4;
  }
  .carbox {
    width: 100%;
    padding: 0 10px;
    background-color: #fff;
    max-height: 200px;
    overflow: scroll;
    .item {
      display: flex;
      padding: 15px 0;
      font-size: 15px;
      .name {
        width: 40%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .price {
        width: 30%;
        text-align: center;
        color: red;
        font-size: 16px;
      }
      .iconbox {
        width: 30%;
        display: flex;
        justify-content: flex-end;
        .icon {
          color: #00a0dc;
          font-size: 24px;
        }
        label {
          display: inline-block;
          width: 30px;
          text-align: center;
          line-height: 24px;
        }
      }
      & + .item {
        border-top: 1px solid #ccc;
      }
    }
  }
}
</style>