import Vue from 'vue'
import Router from 'vue-router'

//Pages
import Home from '@/pages/Home'
import Page1 from '@/pages/Page1'
import Create from '@/pages/Create'
import QuesList from '@/pages/QuesList'
import QuesCreate from '@/pages/QuesCreate'
import Page2 from '@/pages/Page2'

import ActCreate from '@/pages/ActCreate'
import ActList from '@/pages/ActList'
import ActDetail from '@/pages/ActDetail'

import ActSetttingsSignin from '@/pages/SetSignin'
import ActSetttingsTmpl from '@/pages/SetCusTmplDef'
import ActSetttingsProcess from '@/pages/SetProcessDef'

import Fenci from '@/pages/FenCi'

//end of Pages

import SLComponent from "@/router/component.js"

import VueJsModal from "@/components/dialog/index.js"

import VueAwesomeSwiper from 'vue-awesome-swiper'

//ajax & config
import axios from 'axios'
import Config from "./config.js"


import VueHighlightJS from '@/components/highlightjs/index.js'
Vue.use(VueHighlightJS)

// Date Format
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}


//Ajax
Vue.prototype.$ajax = {
  token: function(){
    return Config.Ajax.token;
  },
  getParam:function(){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) 
      return (r[2]);
    return null;
  },
  get: function (_url, _data, config) {
    return this.request("get", _url, _data, config);
  },
  get2: function (baseUrl,_url, _data, config) {
    return this.request2(baseUrl,"get", _url, _data, config);

  },
  post2: function (baseUrl, _url, _data, config) {
    return this.request2(baseUrl,"post", _url, _data, config);

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

  },
  request2: function (baseUrl,_method, _url, _data, config) {
    if (typeof config === "object") {
      config.method = _method;
      config.baseURL = baseUrl,
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
          baseURL: baseUrl,
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
          baseURL: baseUrl,
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
          baseURL: baseUrl,
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
  base:"/",
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
      path: '/act/create/:token',
      name: 'actcreate',
      component: ActCreate
    },
    {
      path: '/act/list/:token',
      name: 'actlist',
      component: ActList
    },
    {
      path: '/act/detail/:id,:token',
      name: 'actDetail',
      component: ActDetail
    },
    {
      path: '/act/settings/signin/:token',
      name: 'actSeetingsSignin',
      component: ActSetttingsSignin
    },
    {
      path: '/act/settings/tmpl/:token',
      name: 'actSeetingsTmpl',
      component: ActSetttingsTmpl
    },
    {
      path: '/act/settings/process/:token',
      name: 'actSeetingsProcess',
      component: ActSetttingsProcess
    },
    {
      path: '/act/fenci/:token',
      name: 'actFenci',
      component: Fenci
    },
    {
      path: '/result/:id',
      name: 'result',
      component: Page2
    }
  ]
})
