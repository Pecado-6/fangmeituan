<template>
    <div>
        <Header :title="address"/>
  <van-address-edit
  :area-list="areaList"
  :address-info="addressInfo"
  show-delete
  show-set-default
  show-search-result
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
 
/></div>
</template>

<script>
import Header from '@/components/Header.vue';
import { Toast } from 'vant';
import { computed, onMounted, reactive, toRefs } from 'vue';
import { useRouter,useRoute} from 'vue-router';
import { useStore } from 'vuex';
export default {
components:{
    Header,
},
setup(){
    let store=useStore()
    let route=useRoute()
    let router=useRouter()
    let data=reactive({
        areaList:{
            province_list:{
                11000:"广东省",
                12000:"广西省"
            },
            city_list:{
                110100:"广州市",
                110200:"深圳市",
                120100:"南宁市",
                120200:"柳州市",
                120300:"桂林市"
            },
            county_list:{
                110101:"越秀区",
                110102:"天河区",
                110201:"福田区",
                110202:"南山区",
                120101:"青秀区",
                120102:"江南区",
                120103:"青秀区",
                120201:"城中区",
                120202:"柳南区",
                120203:"柳北区",
                120301:"七星区",
                120302:"临桂区"
            },
        },
        addressInfo:{}
    })
    const address=computed(()=>{
        return route.query.type==='add'?"新增地址":"编辑地址"
    })
    //数据出始化
    const init=()=>{
        store.state.userAddress.forEach(item => {
            if(item.id===Number(route.query.id)){
                data.addressInfo=item
            }
        });
    }
    onMounted(()=>{
        init()
    })
    //保存按钮
    const onSave=(content)=>{
  console.log("保存的地址数据:", content);
  try {
    // 编辑地址时，给 content 补全 id（从初始化的 addressInfo 中取）
    if(route.query.type !== "add"){
      content.id = data.addressInfo.id; // 关键：补全 id，确保能匹配到要修改的地址
    }
    // 再提交 mutation
    if(route.query.type === "add"){
      store.commit("ADDADDRESS", content);
    }else{
      store.commit("CHANGEADDRESS", content);
    }
    Toast("保存成功!");
    setTimeout(()=>{
        router.back()
    },1000)
  } catch (err) {
    console.error("onSave 执行出错:", err);
    Toast("保存失败!");
  }
}
    //删除按钮
    const onDelete=(content)=>{
        store.commit("DELETEADDRESS",content)
        Toast("删除成功")
        setTimeout(()=>{
        router.back()
    },1000)
    }
return{
    ...toRefs(data),
    onSave,
    onDelete,
    address,
}
}
}
</script>

<style lang="less" scoped>
/deep/ .van-button--danger{
    background-color: #ffc400;
    border-color: #ffc400;
}
/deep/ .van-switch--on{
    background-color: #ffc400;
}
</style>