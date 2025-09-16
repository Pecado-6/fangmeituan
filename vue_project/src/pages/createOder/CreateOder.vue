<template>
    <div class="create_oder">
        <Header title="生成订单" />
        <van-contact-card type="edit" :tel="currenContact.tel" :name="currenContact.name" @click="onEdit" />
        <div class="content">
            <div v-for="(i, index) in store.state.orderList" :key="index">
                <van-card :num="i.num" :price="i.price" :title="i.title" :thumb="i.pic" />
            </div>
        </div>
        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>{{ sumPrice}}￥</span>
            </div>
            <van-button class="pay-btn" type="primary" @click="handleCreateOrder" color="#ffc400">生成订单</van-button>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import router from '@/router';
import { onMounted, reactive, toRefs } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { Dialog } from 'vant';
export default {
    components: {
        Header  // 必须在这里注册组件
    },
    setup() {
        const store = useStore()
        const router=useRouter()
        const route=useRoute()
        console.log(store.state.orderList);
        let data = reactive({
            currenContact: {
                name: "",
                tel: ""
            },
            sumPrice:0
        })
        //用户信息初始化
        const initUser=()=>{
            store.state.userAddress.forEach((item)=>{
                if(item.isDefault){
                    data.currenContact.name=item.name
                    data.currenContact.tel=item.tel
                }
            })
        }
        //求商品总价
        const initPrice=()=>{
            let price=0
            if(store.state.orderList.length){
                store.state.orderList.forEach(item => {
                    price+=item.num*item.price
                });
                data.sumPrice=price
            }
        }
        onMounted(()=>{
            initPrice()
            initUser()
        })
        //地址编辑按钮
        const onEdit = () => { 
            router.push('/address')
        }
        // 解构 currentContact 对象
        const { currentContact } = data;
        //生成订单，跳转到订单页面
        const handleCreateOrder = () => {
            Dialog.alert({
                title: '提示',
                message: '下单完成！',
            }).then(() => {
                // on close
                let newList=store.state.carList.filter((item)=>{
                    return !route.query.list.includes(item.id+"")
                })
                store.commit("DELETE",newList)
                store.commit("UPDATAORDER")
                router.push('/order')
            });

        }
        return {
            ...toRefs(data),
            onEdit,
            store,
            handleCreateOrder,
            initPrice,
            initUser,
        }
    }
}
</script >

<style lang="less" scoped>
 .create_oder{
    display: flex;
    flex-flow: column;
    height: 100%;
    .content{
        flex: 1;
        overflow-y: auto;
    }
    .pay-wrap{
        padding: 10px 0;
        width: 100%;
        background-color: #fff;
        border-top: 1px solid #e9e9e9;
        >div{
            display: flex;
            justify-content: space-between;
            padding: 0 5%;
            margin: 10px 0;
            font-size: 14px;
            span:nth-child(2){
                color: red;
                font-size: 18px;
            }
        }
        .pay-btn{
        width:100%;
        border-radius: 10px;
    }
    
    }
 }
</style>