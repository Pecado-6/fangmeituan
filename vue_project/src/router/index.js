import { Toast } from "vant";
import { createWebHistory } from "vue-router";
import { createRouter,createWebHashHistory } from "vue-router";
const router=createRouter({
    history:createWebHistory(),
    routes:[
         {
            path:'/',
            component:() => import('../pages/myHome/MyHome.vue')
        },
        {
            path:'/home',
            component:() => import('../pages/myHome/MyHome.vue')
        },
         {
            path:'/car',
            component:() => import('../pages/myCar/MyCar.vue'),
            meta:{
                isAuth:true
            }
        },
         {
            path:'/order',
            component:() => import('../pages/myOrder/MyOrder.vue'),
             meta:{
                isAuth:true
            }
        },
         {
            path:'/mine',
            component:() => import('../pages/mine/Mine.vue'),
             meta:{
                isAuth:true
            }
        },
         {
            path:'/store',
            component:() => import('../pages/myStore/Mystore.vue')
        },
         {
            path:'/createorder',
            component:() => import('../pages/createOder/CreateOder.vue'),
             meta:{
                isAuth:true
            }
        },
        {
            path:'/address',
            component:() => import('../pages/address/Address.vue'),
             meta:{
                isAuth:true
            }
        },
        {
            path:'/addressedit',
            component:() => import('../pages/addressEdit/AddressEdit.vue'),
             meta:{
                isAuth:true
            }
        },
         {
            path:'/login',
            component:() => import('../pages/login/Login.vue'),
        },
          {
            path:'/register',
            component:() => import('../pages/register/Register.vue'),
        },
        {
            path:'/userinfoedit',
            component:() => import('../pages/userinfoEdit/userInfoEdit.vue'),
        },
    ]
})
router.beforeEach((to,from,next)=>{
    if(to.meta.isAuth){
        if(localStorage.isLogin==='1'){
            next()
        }
        else{
            Toast("请先登录")
            router.push('./login')
        }
    }else{
            next()
        }
})
export default router