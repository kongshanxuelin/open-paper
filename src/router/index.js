import Vue from 'vue'
import Router from 'vue-router'

//Pages
import Home from '@/pages/Home'
import Page1 from '@/pages/Page1'
import Create from '@/pages/Create'
import QuesList from '@/pages/QuesList'
import QuesCreate from '@/pages/QuesCreate'
import Page2 from '@/pages/Page2'
//end of Pages

import SLComponent from "@/router/component.js"

import VueJsModal from "@/components/dialog/index.js"

import VueAwesomeSwiper from 'vue-awesome-swiper'

//ajax & config
import axios from 'axios'
import Config from "./config.js"


import VueHighlightJS from '@/components/highlightjs/index.js'
Vue.use(VueHighlightJS)

//Ajax
Vue.prototype.$ajax = {
  token: function(){
    return Config.Ajax.token;
  },
  get: function (_url, _data, config) {
    return this.request("get", _url, _data, config);
  },
  post: function (_url, _data, config) {
    return this.request("post", _url, _data, config);
  },
  all: function (urls, cb) {
    var promises = [];
    for (var index in urls) {
      var url = urls[index];
      promises.push(this.get(url));
    }
    axios.all(promises)
      .then(axios.spread(function (acct, perms) {
        if (typeof cb === "function") {
          cb(acct, perms);
        }
      }));
  },
  request: function (_method, _url, _data, config) {
    if (typeof config === "object") {
      config.method = _method;
      config.baseURL = Config.Ajax.url,
        config.url = _url,
        config.params = _data,
        config.data = _data
    }
    if (_method === "get") {
      if (typeof config === "object") {
        return axios(config);
      } else {
        return axios({
          method: _method,
          baseURL: Config.Ajax.url,
          params: _data,
          url: _url
        });
      }
    } else if (_method === "post") {
      if (typeof config === "object") {
        return axios(config);
      } else {
        return axios({
          method: _method,
          baseURL: Config.Ajax.url,
          url: _url,
          data: _data
        });
      }
    } else {
      if (typeof config === "object") {
        return axios(config);
      } else {
        return axios({
          method: _method,
          baseURL: Config.Ajax.url,
          url: _url,
          params: _data,
          data: _data
        });
      }
    }

  }
};

Vue.use(VueAwesomeSwiper)

Vue.use(VueJsModal, {
  dialog: true
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Page1
    },
    {
      path: '/paper/create',
      name: 'papercreate',
      component: Create
    },
    {
      path: '/paper/edit/:id',
      name: 'paperEdit',
      component: Create
    },
    {
      path: '/paper/questions/:id',
      name: 'paperQuesList',
      component: QuesList
    },
    {
      path: '/paper/question_add/:id',
      name: 'paperQuesCreate',
      component: QuesCreate
    },
    {
      path: '/paper/:id',
      name: 'paperone',
      component: Home
    },
    {
      path: '/result/:id',
      name: 'result',
      component: Page2
    }
  ]
})
