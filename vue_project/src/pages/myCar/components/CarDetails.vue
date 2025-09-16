<template>
  <div class="cardetails">
    <!-- 商品列表 -->
     <div class="content">
        <van-checkbox-group v-model="result" @change="groupChange">
            <div v-for="(i,index) in store.state.carList " :key="index">
                <FoodAdd :item="i" :addClick="addClick" :showCheckbox="true" checked-color="#333"/>
            </div>
</van-checkbox-group>
     </div>
     <!-- 结算功能 -->
      <van-submit-bar :price="sumPrice*100" button-text="结算" @submit="onSubmit" class="submit-all" v-if="isDelete">
  <van-checkbox v-model="checked" @click="chooseAll">全选</van-checkbox>
</van-submit-bar>
<!-- 删除 -->
<div class="buy" v-else>
    <div class="left">
         <van-checkbox v-model="checked" @click="chooseAll">全选</van-checkbox>
         <div class="delete" @click="deleteClick">
            删除
         </div>
    </div>
</div>
  </div>
</template>

<script>
import store from '@/store';
import { computed, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import FoodAdd from '@/pages/myHome/components/FoodAdd.vue';
import { Toast } from 'vant';
import Header from '@/components/Header.vue';
import emitter from '@/common/js/evenbus';
import router from '@/router';
import { useRouter } from 'vue-router';
export default {
    components:{
        FoodAdd,
        Header,

    },
    props:["changeShow"],
    setup(props){
        const store=useStore()
        const router=useRouter()
        let data=reactive({
            result:[],
            checked:true,
            isDelete:true,
        })
        const addClick=()=>{       }
        //商品默认选中的初始化
        const init=()=>{
            data.result=store.state.carList.map((item)=>item.id)
        }
        onMounted(()=>{
            init()
        })
        //商品的个数增加同步
        const onChange=(value,detail)=>{
            store.state.carList.map((item)=>{
                if(item.id===detail.name){
                    item.num=value
                }
            })
        }
        //更新数据
        const updata=(type)=>{
            return store.state.carList.filter((item)=>{
               return type===2 
               ?data.result.includes(item.id)
               : !data.result.includes(item.id)
            })
            
        }
        //结算按钮
        const onSubmit=()=>{
            if(data.result.length!==0){
                store.commit("PAY",updata(2))
                router.push({
                    path:'/createorder',
                    query:{
                        list:data.result
                    }

                })
            }else{
                Toast.fail("请选择商品再进行结算!")
            }
        }
        //全选按钮
        const chooseAll=()=>{
            if(data.result.length!==store.state.carList.length){
                init()
            }else{
                data.result=[]
            }
        }
        //每个复选框的点击事件触发
        const groupChange=(result)=>{
            if(result.length===store.state.carList.length){
                data.checked=true
            }else{
                data.checked=false
            }
            data.result=result
        }
        //计算总价
        const sumPrice=computed(()=>{
            let countList=updata(2)
            let sum=0
            countList.forEach(item => {
                sum+=item.num * item.price
            });
            return sum
        })
        //监听编辑的点击 
        emitter.on(("edit"),()=>{
            data.isDelete=!data.isDelete;
        })
        //删除按钮
        const deleteClick=()=>{
            
            if(data.result.length){
                //更新删除后的购物车的数据
                store.commit("DELETE",updata(1))
                //删除后的选中
                data.result=[]
                //购物车无数据时展示兜底数据
                if(store.state.carList.length===0){
                    store.commit("EDIT","delete")
                props.changeShow();
            }
            }else{
                Toast.fail("请选择要删除的商品")
            }
        }
           return{
            ...toRefs(data),
            store,
            addClick,
            onChange,
            onSubmit,
            chooseAll,
            groupChange,
            sumPrice,
            deleteClick,
           }
    }
}
</script>

<style lang="less" scoped>
.cardetails{
    font-size: 14px;
    flex: 1;
    position: relative;
    overflow: auto;
    padding: 20px 20px 55px;
    .submit-all{
        position: fixed;
        bottom: 71px;
    }
    .buy{
        position: fixed;
        bottom: 71px;
        right: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        height: 50px;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;
        .left{
            display: flex;
            align-items: center;
        }
        .delete{
            color: #fff;
            background-color: darkorange;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            width: 110px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            margin-left:200px ;
        }
    }
    .content{
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;
    }
}

</style>