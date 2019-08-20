// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from './store'
import Util from '@/helpers/util'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

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
Vue.use(Util)



/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
