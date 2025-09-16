import { createStore } from "vuex";
export default createStore({
    state:{
        carList:[],//购物车列表
        orderList:[],//生成订单列表
        edit:true,//编辑的状态
        orderListed:[],//生成订单后列表
        userAddress:[{
            id:101,
            name:"共和国最锋利的剑",
            tel:"101",
            province:"湖北",
            city:"黄冈",
            county:"林家大湾",
            addressDetail:"天要下雨，娘要嫁人",
            isDefault:true,
            
            areaCode:"555"
        },
        {
            id:102,
            name:"幼龙",
            tel:"222222",
            province:"吉林",
            city:"长春",
            county:"开源村",
            addressDetail:"雨夜擒幼龙",
            isDefault:false,
            
            areaCode:"888"
        },
    ]
    },
    mutations:{
        //添加购物车
        ADDCAR(state,value){
            state.carList=value

        },
        //结算按钮
        PAY(state,value){
            state.orderList=value
        },
        //删除按钮
         DELETE(state,value){
            state.carList=value
        },
        //生成订单
        UPDATAORDER(state,value){
            state.orderListed=state.orderListed.concat(state.orderList)
        },
        //编辑按钮
         EDIT(state,value){
            if(value==="delete"){
                state.edit=true
            }else{
                 state.edit=!state.edit
            }
           
        },
        //新增地址
        ADDADDRESS(state,value){
            state.userAddress.map((item)=>{
                if(value.isDefault){
                    item.isDefault=false
                }
            })
            state.userAddress.push(value)
        },
        //修改地址
        CHANGEADDRESS(state,value){
            state.userAddress=state.userAddress.map((item)=>{
                if(value.isDefault){
                    item.isDefault=false
                }
                return item.id===value.id?value:item
            })
        },
        //删除按钮
        DELETEADDRESS(state,value){
            state.userAddress=state.userAddress.filter((item)=>{
                return !( value.id===item.id)
            })
            if(value.isDefault && state.userAddress.length){
                    state.userAddress[0]=isDefault=true
                }
        }
    },
    actions:{}

})