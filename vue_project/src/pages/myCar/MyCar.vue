<template>
 <div class="mycar">
    <Header title="购物车" :edit="true"/>
    <CarDetails v-if="isShow" :changeShow="changeShow"/>
    <Blank v-else/>
    <Footer />
  </div>
</template>

<script>
import Blank from '@/components/Blank.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import CarDetails from './components/CarDetails.vue';
import { onMounted, ref } from 'vue';
import store from '@/store';
import { useStore } from 'vuex';
export default {
components: { 
    Footer,
    Blank,
    Header,
    CarDetails,
  },
  setup(){
    const store=useStore()
    let isShow=ref(true)
    //初始化兜底样式展示与否
    const init=()=>{
      if(store.state.carList.length===0){
        isShow.value=false
      }
    }
    const changeShow=()=>{
      isShow.value=false
    }
    onMounted(()=>{
      init()
    })
    return {
      isShow,
      changeShow,
    }
  }
  
}
</script>

<style lang="less" scoped>
.mycar{
  display: flex;
  flex-flow: column;
  height: 100%;
  .content{
    flex: 1;
    overflow-y: auto;
  }
}
</style>