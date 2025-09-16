<template>
  <div class="food_list" v-if="index === 0">
    <van-tree-select v-model:main-active-index="active" height="55vw" :items="items" @click-nav="navClick">
      <template #content>
        <div v-for="(i, index) in subItem" class="item_bg" :key="index">

          <FoodAdd :item="i" :showAdd="true" :addClick="addClick" :onChange="onChange" />
        </div>
      </template>
    </van-tree-select>
  </div>
  <div v-else>{{ foodData.content }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import FoodAdd from '@/pages/myHome/components/FoodAdd.vue';
export default {
  props: ["index", "foodData"],
  components: {
    FoodAdd
  },
  setup(props) {
    let data = reactive({
      active: 0,
      items: [],
      subItem: []
    })
    //数据初始化
    const init = () => {
      let newList = []
      props.foodData?.items?.map((i, index) => {
        newList.push({ text: i.text });
        if (data.active === index) {
          data.subItem = i.children

        }
      });
      data.items = newList;
    }
    init()
    //点击左侧导航栏
    const navClick = (i) => {
      data.active = i;
      init();
    };
    //切换步进器
    const addClick = (i) => {
      data.subItem.forEach((item) => {
        if (item.id === i) {
          item.add = false;
          item.num += 1
        }
      })
    }
    //步进器增加触发事件
    const onChange = (value, detail) => {
      data.subItem.forEach((item) => {
        if (item.id === detail.name) {
          item.num = value
        }
      })
      console.log(data.subItem, "data.subItem");
    }
    return {
      ...toRefs(data),
      navClick,
      addClick,
      onChange,

    }

  }
}
</script>

<style lang="less" scoped></style>