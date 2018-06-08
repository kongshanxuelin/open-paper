<template >
  <div class="container">
     <div class="flex-column mb20">
         <div class="flex-item-12">自定义任务定义:</div>
         <div class="flex-item-12"></div>
     </div>    
     <div class="flex-row flex-middle flex-center mb20">
         <button class="sl-btn primary" @click="saveSettings">保存设置</button>
     </div>    
  </div>
</template>

<script>
import Config from '../router/config.js';
export default {
  name: 'sumslack_settings_sign',
  data(){
  	return {
        showImage:false,
        token:""
  	}
  },
  created(){
     this.$root.eventHub.$emit('header-show', false);
     if(typeof(this.$route.params.token) === "undefined"){
          this.token = "";
     }else{
          this.token = this.$route.params.token;
     }
  },
  methods:{
    saveSettings(){
        
    }
  }
 }
</script>
<style lang="less" scoped>
    .container {
        margin:4px;
    }
    .mb20{
        margin-bottom: 15px;
    }
</style>
