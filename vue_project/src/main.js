import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"
import { Button,Icon,Tab,Tabs,
    NavBar,TreeSelect,Stepper, 
    ActionBar, ActionBarIcon, ActionBarButton,Toast,
     Checkbox, CheckboxGroup,SubmitBar,ContactCard,Card,Dialog,AddressList,AddressEdit,
     Field, CellGroup,Form

} from 'vant'
import router from './router'
import '@/common/css/base.less';
 const app=createApp(App)
app.use(Button).use(Icon)
app.use(Tab)
app.use(Tabs)
app.use(router)
app.mount('#app')
app.use(NavBar);
app.use(TreeSelect);
app.use(Stepper);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(Toast);
app.use(store);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(SubmitBar);
app.use(ContactCard);
app.use(Card);
app.use(Dialog);
app.use(AddressList);
app.use(AddressEdit);
app.use(Field);
app.use(CellGroup);
app.use(Form);