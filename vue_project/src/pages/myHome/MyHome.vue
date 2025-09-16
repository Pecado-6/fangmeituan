<template>
    <div class="home">
        <div class="content">
          <div class="header">
            <!-- 头部 -->
            <div class="text">外卖</div>
            <div class="location">
              <van-icon name="guide-o" />
              <span>沙漠地图皮卡多蓝楼</span><van-icon name="arrow" />
            </div></div>
            <!-- 主要内容 -->
             <div class="main">
              <div class="main_bg">
                <div class="search">
                  <input type="text">
                  <div class="search-text">搜索</div>
                </div>
                <div class="classfiy">
                  <div class="big_classfiy">
                    <div v-for="(i,index) in homeDate.big_classfiy" :key="index">
                      <svg class="icon" aria-hidden="true"><use :xlink:href="`#${i.icon}`"></use></svg>{{i.name}}
                    </div>
                  </div>
                  <div class="small_classfiy">
                  <div v-for="(i,index) in homeDate.small_classfiy" :key="index">
                      <svg class="icon" aria-hidden="true"><use :xlink:href="`#${i.icon}`"></use></svg>{{i.name}}
                    </div>
                  </div>
                </div>
              </div>
             <van-tabs class="van-tabs">
            <van-tab v-for="(i,index) in homeDate.centen_nav_list" :title="i.tab" :key="index">
              <Store :store_list="i.data"/>
            </van-tab>
              
            </van-tabs>

             </div>
        </div>
        <Footer />
    </div>
</template>
<script>
import router from '@/router';
import Footer from '@/components/Footer.vue';
import { onMounted, reactive,toRefs } from 'vue';
import Store from './components/Store.vue';
import { getHomeData } from '@/request/api';
export default {
  components: { 
    Footer,
    Store
  },
  setup(){
    let data=reactive({
      homeDate:{}
    })
    
    
    //数据请求
    const getHome=async()=>{
      const res=await getHomeData()
      if(res.status===200&&res.data.code===0){
        data.homeDate=res.data.data
      }
    }
    onMounted(()=>{
      getHome()
    })
    return{
      ...toRefs(data)
    }
    
  }
}
</script>

<style  lang="less" scoped>
/deep/ .van-tabs__wrap{
  border-radius: 10px;
}
.home{
  display: flex;
  flex-flow: column;
  height: 100%;
  font-size: 20px;
  .content{
    flex: 1;
    overflow-y: auto;
    .header{
      display: flex;
      background-image: linear-gradient(yellow,#fff);
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 10px 10px;
    .text{
      font-size: 17px;
      font-weight: 600;
    }
    .location{
      .span{
        margin: 0 2px;
      }
      font-size: 14px;
    }
  }}
  .main{
    margin-top: 0px;
    .van-tabs{
      padding: 0 20px 10px;

    }
    .main_bg{
      background-image: linear-gradient(white,gray);
      border-radius: 15px 15px 0 0;
      position: relative;
      .big_classfiy{
        display: flex;
        div{
          flex: 1;
          display: flex;
          justify-content: center;
          flex-flow:column ;
          align-items: center;
          .icon{
            widows: 50px;
            height: 50px;
            margin-bottom: 5px;
          }
        }
      }
      .small_classfiy{
        display: flex;
        flex-wrap: wrap;
        div{
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: column;
          width: 20%;

        }
        .icon{
          height: 40px;
          width: 40px;
          margin: 20px;

        }
      }
      .search{
        position: relative;
        // background-color: aqua;
        .search-text{
          position: absolute;
          background-color: darkorange;
          width: 100px;
          right: 1px;
          top:0px;
          height: 54px;
          border-radius: 15px;
          text-align: center;
          line-height: 54px;
          font-size: 15px;
        }
        input{
          height: 50px;
          width: 98%;
          border-radius: 15px;
          border: 1px solid darkorange;
          margin: 0 15px 0 4px;
        }
      }

    }

  }
}

</style>