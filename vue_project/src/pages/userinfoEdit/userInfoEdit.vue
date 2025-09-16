<template>
    <div class="userEdit">
        <Header title="账号管理"/>
        <div class="input-item">
            <van-field v-model="nickName" label="昵称" placeholder="请输入昵称" />
            <van-field v-model="introduceSign" label="个性签名" placeholder="请输入签名"/>
            <van-field v-model="password" label="密码" placeholder="请输入密码"/>
        </div>
        <van-button type="primary" round color="#ffc400" block class="save-btn" @click="save">保存</van-button>
        <van-button type="primary" round color="#ffc400" block class="save-btn" @click="loginOut">退出登录</van-button>
    </div>
  
</template>

<script>
import Header from '@/components/Header.vue';
import router from '@/router';
import { Toast } from 'vant';
import { onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
export default {
components:{
    Header,
},
setup(){
    let router=useRouter()
    let data=reactive({
        nickName:'',
        introduceSign:"",
        password:""
    })
    //保存
    const save=()=>{
        if(data.nickName&&data.password){
            const userInfo=JSON.parse(localStorage.userInfo)
            const newUserInfo={
                用户名:data.nickName||userInfo['用户名'],
                密码:data.password||userInfo['密码'],
                个性签名:data.password||userInfo['个性签名']
            }
            localStorage.setItem("userInfo",JSON.stringify(newUserInfo))
            Toast("修改成功")
            router.push('./mine')
        }else{
            Toast("保存失败")
        }
    }
    //回显信息
     onMounted(() => {
            const storedUser = localStorage.getItem('userInfo');
            if (storedUser) {
                const userInfo = JSON.parse(storedUser);
                // 回显昵称（对应localStorage中的“用户名”字段）
                data.nickName = userInfo['用户名'] || '';
                // 回显已有的个性签名
                data.introduceSign = userInfo['个性签名'] || '';
                // 回显密码（可选：从安全角度建议不回显，此处保留原逻辑）
                data.password = userInfo['密码'] || '';
            }
        });
    //退出登录
    const loginOut=()=>{
        localStorage.removeItem("isLogin")
        Toast("退出登录")
        router.push('/login')
    }



    return{
        ...toRefs(data),
        save,
        loginOut,
    }
}
}
</script>

<style lang="less" scoped>
/deep/ .van-button--danger{
    background-color: #ffc400;
    border-radius: #ffc400;
}
.save-btn{
    width: 80%;
    margin: 20px auto;
}
</style>