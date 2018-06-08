<template >
  <div class="container">
     <h1>签到设置</h1>
     <div class="flex-column mb20">
         <div class="flex-item-6">上下班时间:</div>
         <div class="flex-item-18"> 
             <input class="sl-input date w150" v-model="s.startTime" placeHolder="输入上班时间"  /> ~
             <input class="sl-input date w150" v-model="s.endTime" placeHolder="输入上班时间"  />
         </div>
     </div>   
     <div class="flex-column mb20">
         <div class="flex-item-6">公司位置:</div>
         <div class="flex-item-18"> 
             <input class="sl-input w60" v-model="s.let" placeHolder="公司经度"  /> 
             <input class="sl-input w60" v-model="s.lot" placeHolder="公司纬度"  />
             <button class="sl-btn" @click="getPos()">获取</button>

         </div>
     </div> 
     <div class="flex-column mb20">
         <div class="flex-item-6">误差范围:</div>
         <div class="flex-item-18"> 
             <input type="number" class="sl-input w300" v-model="s.width" placeHolder="距离中心位置多少米允许点签到"  /> 米

         </div>
     </div> 
     <div class="flex-column mb20">
         <div class="flex-item-6">生效日期:</div>
         <div class="flex-item-18">
           <sl-datepicker placeholder="活动开始日期" format="yyyy-MM-dd" v-model="s.sdt"></sl-datepicker>
           -
           <sl-datepicker placeholder="活动结束日期" format="yyyy-MM-dd" v-model="s.edt"></sl-datepicker>
         </div>
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
        token:"",
        isMini:false,
        jsconfig:{},
        s:{startTime:"09:00",endTime:"18:00",let:0,lot:0,width:100,sdt:"2018-01-01",edt:"2025-12-31"}
  	}
  },
  created(){
     var that = this;
     this.$root.eventHub.$emit('header-show', false);
     if(typeof(this.$route.params.token) === "undefined"){
          this.token = "";
     }else{
          this.token = this.$route.params.token;
     }

     wx.miniProgram.getEnv(function(res) {
        that.isMini = res.miniprogram
     })

     this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/service/js_config",{
            url:encodeURIComponent(location.href.split("#")[0]) 
        }).then(data => {
            this.jsconfig = data.data;
            wx.config({
                beta:true,
                debug: true,
                appId: this.jsconfig.appId,
                timestamp:this.jsconfig.timestamp,
                nonceStr:this.jsconfig.nonceStr,
                signature:this.jsconfig.signature,
                jsApiList:[ 
                    'checkJSApi',
                    'getLocation'
                ],
                success: function (res) {
                    //alert("success:"+JSON.stringify(res));
                },
                fail:function(e){
                    //alert("fail:"+JSON.stringify(e));    
                }
            });

        });
    
            
    wx.ready(function(){
        //alert("wx ready ok")
    });
    wx.error(function (res) {  
        //alert("ERROR:"+JSON.stringify(res))
    });  

    //获取当前考勤信息
    this.$ajax.get2(Config.Ajax.actBaseUrl,"sign/get",{
        token:this.token
    }).then(data => {
        var sign = data.data;
        if(sign.week){
            this.s.startTime = sign.workon_time;
            this.s.endTime = sign.workoff_time;
            this.s.let = sign.let;
            this.s.lot = sign.lot;
            this.s.width = sign.scope;
            this.s.sdt = sign.startDate;
            this.s.edt = sign.endDate;
        }else{
            this.getPos();
        }
    });

  },
  methods:{
    saveSettings(){
        let _param = {
            token:this.token,
            workon_time:this.s.startTime,
            workoff_time:this.s.endTime,
            work_week:"1,2,3,4,5",
            scope:this.s.width,
            let:this.s.let,
            lot:this.s.lot,
            sdt:this.s.sdt,
            edt:this.s.edt
        };
        console.log(_param);
        this.$ajax.get2(Config.Ajax.actBaseUrl,"sign/settings",_param).then(data => {
            var ret = data.data;
             console.log(ret);
            if(ret.ret){
                this.$modal.alert("设置成功@！")
            }else{
                this.$modal.alert("设置失败@！")
            }
        });
    },
    getPos(){
        var that = this;
        wx.checkJsApi({
            jsApiList: ['getLocation'],
            success: function(res) {
                wx.getLocation({
                    type: 'wgs84',
                    success: function(pos) {
                        var latitude = pos.latitude
                        var longitude = pos.longitude
                        that.s.let = latitude;
                        that.s.lot = longitude;
                    }
                })
            }
        });
    }
  }
 }
</script>
<style lang="less" scoped>
    h1 {
        text-align: center;
        font-size:16px;
    }
    .container {
        margin:4px;
    }
    .mb20{
        margin-bottom: 15px;
    }
    .w60 {
        width:75px;
    }
    .w150 {
        width:100px;
    }
    .w300 {
        width:200px;
    }
</style>
