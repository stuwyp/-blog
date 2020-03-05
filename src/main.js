// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './common/style/index.less'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App";
import router from "./router";
import Router from 'vue-router'
import store from './store'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import Date from '@/utils/date'

// import '@/permission' // permission control

import {
  Button,
  Input,
  Form,
  FormItem,
  Message,
  Tabs,
  TabPane,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Tag,
  Icon
} from 'element-ui';

// 修复 多次点击标签出错 bug
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Icon);


Vue.prototype.$message = Message
Vue.config.devtools = true
Vue.config.productionTip = false

Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.use(Date)


/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
