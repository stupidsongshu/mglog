// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'

/* element-ui组件引入：start */
import 'element-ui/lib/theme-chalk/index.css'
import {
  Container,
  Header,
  Aside,
  Main,
  Table,
  TableColumn,
  Form,
  FormItem,
  Collapse,
  CollapseItem,
  DatePicker,
  TimeSelect,
  TimePicker,
  Row,
  Col,
  Input,
  Select,
  Option,
  Menu,
  Submenu,
  Message,
  MenuItem,
  MenuItemGroup} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.prototype.$message = Message
/* element-ui组件引入：end */

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
