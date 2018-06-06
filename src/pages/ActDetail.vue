<template >
  <div class="container">

     <div class="flex-row">
         <div class="mb20">
            活动名称： {{act.title}}
         </div>
         <div class="mb20">
            参加时间：
            <span class="sl-label-yellow">
            {{act.freq_unit == 'w'?"每周" : (act.freq_unit == '2w'?"每两周" :(act.freq_unit == 'm'?"每月" :'不重复')) }}
            {{act.freq_unit.indexOf('w')>=0?('周'+ (act.freq_num==0?'日':act.freq_num)):(act.freq_num+'号')}}
            {{new Date(act.act_time).format("hh:mm")}}
            </span>
         </div>
         <div class="mb20">
            活动描述： {{act.d}} 至少 <span class="sl-label-yellow">{{act.min_num}}</span> 人报名参加活动才生效
         </div>
         <div class="mb20">
            截至日期： {{new Date(act.start_date).format("yyyy-MM-dd")}}~{{new Date(act.end_date).format("yyyy-MM-dd")}}
         </div>
         <div class="mb20">
            最近一轮活动进行中： {{new Date(act.cur_start_date).format("yyyy-MM-dd")}}~{{new Date(act.cur_end_date).format("yyyy-MM-dd")}}
         </div>
     </div>

  </div>
</template>

<script>
import Config from '../router/config.js';
export default {
  name: 'sumslack_act_detail',
  data(){
  	return {
        token:"",  
        id:"",
        act:{}
  	}
  },
  created(){
     this.$root.eventHub.$emit('header-show', false);
     if(typeof(this.$route.params.token) === "undefined"){
          this.token = "";
     }else{
          this.token = this.$route.params.token;
     }
     this.id = this.$route.params.id;
     console.log("create:",this.id,this.token)
     this.actGet();
  },
  methods:{
    actGet(){
        this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/act/get",{
                token:this.token,
                actId:this.id
            }).then(data => {
              console.log(data.data)
              this.act = data.data.act;
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
