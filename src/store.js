import Vue from 'vue';
import Vuex from 'vuex';
import { getgoods } from './apis/api'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [],
    },
    mutations: {
        initdata(state,val){//接收异步请求回来的数据,传入数据仓库的data
            state.data=val;
        },
        setnum(state,{num,name}){
            //console.log('state',obj)
            // state.data[key].foods[index].count+=num
            for(let item of state.data){
                for(let foods of item.foods){
                    if(foods.name===name){
                        foods.count+=num;
                    }
                }   
            }
        }   
    },
    actions: {
        initdata(context) {
            getgoods().then(res => {//给每个数据对象添加一个数量的字段
                //console.log('res',res)
                for(let item of res.data.data){
                    for(let foods of item.foods){
                        foods.count=0;
                    }
                }
                context.commit('initdata',res.data.data)//把数据同步给mutations
                
            }).catch(err => { console.log(err) })
        }
    },
    getters: {
        shopcardata(state){//获取用户选中的数据
            let shopcarlist=[];
           
            for(let item of state.data){
                for(let obj of item.foods){
                   if(obj.count>0){
                       let flag=false;
                       for(let list of shopcarlist){//循环新数组,判断新数组里的数据是否重复
                           if(list.name==obj.name){
                               flag=true;
                           }
                       }
                       if(!flag)shopcarlist.unshift(obj)
                   }
                    
                }
            }
            return shopcarlist;
        },
        
    },
})