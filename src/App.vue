<template>
  <div id="app">
    <div class="header" v-if="isHeaderShow">
        <!--
        <button class="sl-btn default" @click="createQuestion">提交试题</button>&nbsp;
        <button class="sl-btn default" @click="myQuestion">我的试题</button>&nbsp;
        -->
        <span class="sl-label2" style="margin-right:20px;font-size:10px;padding:5px;">一个出题小系统，可将试卷发布分享到微信，用户扫描二维码即可答题</span>
        <a href="#" @click="goHome"><i title="首页" class="icon sumscope-icon icon-home icon"></i></a>&nbsp;&nbsp; 
        <a href="#" @click="createPaper"><i title="首页" class="icon sumscope-icon icon-folder-add icon"></i></a>
    </div>
    <div class="content">
		  <transition name="slide-fade">
		    <router-view></router-view>
		  </transition>
		</div>
    <v-dialog :width="800" :clickToClose="false" />
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'app',
  data(){
  	return {
      isHeaderShow:true
			
		}
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
  mounted(){
      console.log('mounted');
  },
  created(){
    this.height = window.screen.availHeight - 240;
    
    this.$root.eventHub.$on("header-show",target => {
        this.isHeaderShow = target
    });
  },
  methods:{
    goHome(){
      this.$router.push({path:'/'});
    },
    createPaper(){
      this.$router.push({path:'paper/create'});
    },
    createQuestion(){

    },
    myQuestion(){

    }
  }
}
</script>

<style lang="less">
  @import "./assets/css/core.less";
  @import "./assets/css/base.less";
  @import "./assets/css/swiper.css";
  @import "./assets/fonts/iconfont.css";

  select {
      color:#fff;
    
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;

      background: url("http://h5.sumslack.com/down.png") no-repeat scroll right center transparent;
      background-color:#0e1a18;  
      height:25px;
      width:200px;

      border:1px solid #193d37;
      border-radius:2px;
      padding:2px 10px;

  }


  select::-ms-expand { display: none; }

  html,body{
    margin:0;
    padding:0;
  }
  .header{
    margin-top:10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right:25px;
  }
  .header .title {
    padding:20px;
  }
  .logo {
    border-radius: 50%;
    width:48px;
    height:48px;
  }
  .icon {
    color:#ffebc8;
  }
  .bottomDiv{
    position: fixed;
    bottom:25px;
    width:98%;
  }
  .content {
    padding:10px;
  }
   .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px ;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>
