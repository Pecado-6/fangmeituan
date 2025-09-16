<template>
    <div class="storedetails">
         <Header title="我的店铺" />
         <div class="content">
            <div class="img"></div>
            <div class="foodclassfiy">
                <div class="name">
                        <div class="food">{{ title }}</div>
                    <img src="../../assets/store.webp" alt="" class="store_img">
                </div>
                <div><van-tabs >
                <van-tab v-for="(i,index) in storeData" :title="i.name" :key="index">
                    <FoodList :index="index" :foodData="i.data"/>
                </van-tab>
                </van-tabs></div>
         </div>
    </div>
    <van-action-bar>
  <van-action-bar-icon icon="chat-o" text="客服" @click="service"  />
  <van-action-bar-icon icon="cart-o" text="购物车" :badge="store.state.carList.length" @click="toCar" />
  <van-action-bar-button type="warning" text="加入购物车" @click="handleAddCar"/>
  <van-action-bar-button type="danger" text="立即购买" @click="clickBuy" />
</van-action-bar>

  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import { toRefs,reactive, onMounted } from 'vue';
import FoodList from './components/FoodList.vue';
import { Toast } from 'vant';
import { useStore } from 'vuex';
import { routeLocationKey, useRoute, useRouter } from 'vue-router';
import { getStoreData } from '@/request/api';
export default {
    components:{
        Header,
        FoodList,
    },
    setup(){
        const store=useStore()
        const router=useRouter()
        const route=useRoute()
        console.log(store.state.carList);
        let data=reactive({
            storeData:[],
            title:'',
            img:''
        })
        //数据的请求
        const  getStore=()=>{
            getStoreData().then((res)=>{       
                 console.log('接口返回的店铺数组:', res.data.data); // 1. 打印所有店铺
    console.log('要匹配的title:', route.query.title); // 2. 打印传递的title
                if(res.status===200&&res.data.code===0){
                    res.data.data.forEach((i)=>{
                     console.log("55555",route.query.title, i.title);
                        if(i.title===route.query.title){
                            data.title=i.title
                            data.storeData=i.storeData
                            data.img=i.img
                        }
                    })
                }
                console.log('接口响应成功:', res);
            })
        }
        onMounted(()=>{
            getStore()
        })
         //客服的点击
         const service=()=>{
            Toast.fail("敬请期待")
         }
         //跳转购物车
         const toCar=()=>{
            router.push("./car")
         }
         //加入购物车
         const handleAddCar=(type)=>{
            let newList=[]
            data.storeData.forEach((item)=>{
                item.data.items?.forEach((items)=>{
                    items.children.forEach((itemss)=>{
                        if(itemss.num>0){
                            newList.push(itemss)
                        }
                    })
                })
            })
            if(newList.length===0){
                Toast("请选择商品")
                return;
            }
            store.commit("ADDCAR",newList)
            type==="buy" ? toCar():""
         }
         //点击立即购买
         const clickBuy=(buy)=>{
            handleAddCar("buy");

         }
        return {
        ...toRefs(data),
        service,
        handleAddCar,
        store,
        clickBuy,
        toCar,
    }
    }
  
}
</script>

<style lang="less" scoped>
.storedetails{
    height: 100%;
    display: flex;
    flex-flow: column;
    .content{
        flex: 1;
        overflow: auto;
        .img{
        width: 100%;
        background : url("../../assets/store.webp");
        height: 200px;
         background-size: contain; /* 保持图片比例，完整显示在容器内 */
  background-repeat: no-repeat; /* 防止图片重复显示 */
  background-position: center; /* 图片在容器中居中显示 */
    }
        .foodclassfiy {
  .name {
    border-radius: 10px 0;
    display: flex;
    text-align: center;
    
    .food {
      display: flex;
      font-size: 18px;
      width: 50%;
      flex-flow: column;
      align-items: center;
      justify-content: center;
    }
    
    .store_img {
      width: 50%;  /* 占父容器宽度的50% */
      height: 150px;  /* 固定高度 */
    }
  }
}
    }
}
</style>