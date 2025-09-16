<template>
  <div class="footer">
    <div class="item"> 
      <router-link to="/home" class="nav_item" active-class="nav_color" >
        <van-icon name="wap-home-o" />首页
      </router-link></div>
    <div class="item"><router-link to="/car" class="nav_item" active-class="nav_color"><van-icon name="cart-o" />购物车</router-link></div>
    <div class="item" ><router-link to="/order" class="nav_item" active-class="nav_color"><van-icon name="balance-list-o" />订单</router-link></div>
    <div class="item"><router-link to="/mine" class="nav_item" active-class="nav_color"><van-icon name="contact" size="30" />主页</router-link></div>
  </div>
</template>
<script>
export default {

}
</script>

<style lang="less" scoped>
.footer{
  display: flex;
  font-size: 30px;
  background-color: #fff;
  border: 0.5px solid #fff;
  .item{
    flex: 1;
    display: flex;
    justify-content: center;
    .nav_color{
      color: aqua;
    }
    .nav_item{
      display: flex;
      flex-flow: column;
      align-items: center;
      font-size: 25px;
    }
  }
}
</style>