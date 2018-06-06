<template >
  <div class="container">
     <div class="flex-row flex-right">
        <button class="sl-btn primary" @click="actNew">创建新活动</button>
     </div>
     <div class="flex-row">
         <div :key="a.id" v-for="a in list" class="mb20">
             {{a.title}} ,
             最少 <span class="sl-label-yellow">{{a.min_num}}</span> 人报名活动才生效，
             <span class="sl-label-yellow">{{a.freq_unit=="w"?"每周":(a.freq_unit=="2w"?"每两周":(a.freq_unit=="m"?"每月":"不重复"))}}</span>活动
             &nbsp;
             <a :href="'/act/create/'+token+'?id='+a.id"><i title="修改" class="icon sumscope-icon icon-edit" style="color: rgb(255, 125, 0);"></i></a>
             <i title="删除" class="icon sumscope-icon icon-close" style="color: rgb(255, 125, 0);" @click="remove(a)"></i>

         </div>
     </div>

  </div>
</template>

<script>
import Config from '../router/config.js';
export default {
  name: 'sumslack_act_list',
  data(){
  	return {
        token:"",  
        list:[]
  	}
  },
  created(){
     this.$root.eventHub.$emit('header-show', false);
     if(typeof(this.$route.params.token) === "undefined"){
          this.token = "";
     }else{
          this.token = this.$route.params.token;
     }
     this.actList();
  },
  methods:{
    actNew(){
      this.$router.push({path:'/act/create/'+this.token});
    },
    remove(a){
      var that = this;
      this.$modal.confirm("确定删除该活动？",function(){
        that.$ajax.get2(Config.Ajax.actBaseUrl,"wx/act/remove",{
                token:that.token,
                actId:a.id
            }).then(data => {
              if(data.data.ret){
                  that.$modal.alert("删除活动成功!");
                  that.actList();
                }else{
                  that.$modal.alert("删除活动失败,只有活动的创建者才允许删除!");  
                }
        });
      });
    },
    actList(){
        this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/act/list",{
                token:this.token
            }).then(data => {
              this.list = data.data.data;
              //this.$router.push({path:'/'});
            });
        
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
    .dt {
      width:60px;
    }
</style>
