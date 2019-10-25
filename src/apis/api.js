import axios from 'axios';

const url='http://172.20.10.2:3333'

/* 获取商家详情 */
export function getseller(){
    return axios.get(url+'/api/seller')
}
/* 获取商品详情 */
export function getgoods(){
    return axios.get(url+'/api/goods')
}
/* 获取评价 */
export function getevaluate(){
    return axios.get(url+'/api/ratings')
}