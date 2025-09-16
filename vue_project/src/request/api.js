import axios from "./request";
//首页数据接口
export const getHomeData=()=>axios.get('/mock/home.json')
//商店数据接口
export const getStoreData=()=>axios.get('/mock/store.json')