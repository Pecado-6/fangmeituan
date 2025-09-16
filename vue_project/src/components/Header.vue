<template>
  <div class="header">
    <van-nav-bar :title="title"
  left-arrow
  @click-left="onClickLeft" />
  <div class="edit" v-if="edit" @click="editClick">{{ store.state.edit ? "编辑" :"完成"}}</div>
  </div>
</template>

<script>
import emitter from '@/common/js/evenbus';
import store from '@/store';
import { Toast } from 'vant';
export default {
    props: {
    title: {
      type: String,
      default: '' // 默认空标题
    },
      edit: {
      type: Boolean, // edit 是布尔类型（控制按钮显示/隐藏）
      default: false // 默认不显示按钮，避免未传值时 v-if="edit" 报错
    }
  },
setup() {
    const onClickLeft = () => history.back();
    //编辑按钮
    const editClick=()=>{
      if(store.state.carList.length){
        store.commit("EDIT")
        emitter.emit("edit")
      }else{
        Toast.fail("当前商品为空，不可编辑")
      }
    }
    return {
      onClickLeft,
      editClick,
      store
    };
  },
}
</script>

<style lang="less" scoped>
.header {
  position: relative; /* 确保子元素绝对定位基于此容器 */
  
  /* 导航栏左侧箭头样式（不变） */
  ::v-deep .van-nav-bar__left .van-icon {
    color:black;
    font-size: 20px;
  }

  /* 修复编辑按钮：提高层级 + 调整右侧位置 */
  .edit {
    position: absolute;
    right: 30px; /* 向右调整，避开导航栏默认右侧区域 */
    top: 50%;
    transform: translateY(-50%);
    color: #ff4d4f;
    font-size: 16px; /* 稍微放大，更容易看到 */
    cursor: pointer;
    z-index: 10; /* 提高层级，确保在导航栏之上 */
    padding: 5px 10px; /* 增加点击区域 */
    background: transparent; /* 确保背景透明，不遮挡其他内容 */
  }

  
}
</style>