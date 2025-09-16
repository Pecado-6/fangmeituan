<template>
    <Header title="地址管理"/>
    <van-address-list
  :list="list"
   default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
/>
</template>

<script>
import Header from '@/components/Header.vue';
import router from '@/router';
import store from '@/store';
import { onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
components:{
    Header,
},
setup(){
    let store=useStore()
    let router=useRouter()
    let data=reactive({
        list:[],

    })
    //初始化数据
    const initAddress=()=>{
        data.list=store.state.userAddress.map((item)=>{
            return{
                id:item.id,
                name:item.name,
                tel:item.tel,
                address:`${item.province} ${item.city} ${item.county} ${item.addressDetail}`,
                isDefault:!!item.isDefault
            }
        })
    }
    //新增地址按钮
    const onAdd=(item)=>{
        router.push({
            path:'/addressEdit',
            query:{
                type:"add"
            }
        })
    }
    //编辑地址按钮
    const onEdit=(item)=>{
        router.push({
            path:'/addressEdit',
            query:{
                id:item.id,
                type:"change"
            }
        })
    }
    onMounted(()=>{
        initAddress()
    })
    return{
        ...toRefs(data),
        onAdd,
        onEdit,
        initAddress,
    }
}
}
</script>

<style lang="less" scoped>
/deep/ .van-button--danger{
    background-color: #ffc400;
    border-color: #ffc400;
}
/deep/ .van-radio--on{
    background-color: #ffc400;

}
/deep/ .van-radio__icon{
    display: none;
}
</style>