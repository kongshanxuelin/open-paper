<template >
  <div class="container">
     <div class="flex-column mb20">
         <div class="flex-item-24">
         <input v-model="act.title" placeholder="活动名称" type="text" class="sl-input" style="width:80%" />
         <a href="#" @click="addMemo">添加备注</a>
         </div>
     </div>    
     <div class="flex-column mb20">
         <div class="flex-item-24">活动时间:
         <input v-model="act.time" type="text" class="sl-input" style="width:100px" />
         </div>
     </div>  
     <div class="flex-column mb20" v-if="act.isD">
        <div class="flex-item-24">
           <textarea v-model="act.d" placeholder="活动备注" class="sl-input" rows=5 style="width:90%"></textarea>
        </div>
     </div>    
     <div class="flex-column mb20">
         <div class="flex-item-24">
           <sl-datepicker placeholder="活动开始日期" format="yyyy-MM-dd" v-model="act.sdt"></sl-datepicker>
           -
           <sl-datepicker placeholder="活动结束日期" format="yyyy-MM-dd" v-model="act.edt"></sl-datepicker>
         </div>
     </div>    
     <div class="flex-column mb20">
         <div class="flex-item-24">活动有效条件:至少满
           <input v-model="act.minNum" type="number" class="sl-input" style="width:50px" />
        人</div>
     </div> 
     <div class="flex-column mb20">
         <div class="flex-item-12">活动是否重复</div>
         <div class="flex-item-12">
           <sl-switcher v-model="act.isFreq"></sl-switcher>
         </div>
     </div>  
     <div class="flex-column mb20" v-if="act.isFreq">
       <div class="flex-item-24">每
         <sl-radio value="w" v-model="act.freqUnit">周</sl-radio>
         <sl-radio value="2w" v-model="act.freqUnit">两周</sl-radio>
         <sl-radio value="m" v-model="act.freqUnit">月</sl-radio>
         执行活动，每
         <span v-if="act.freqUnit=='w'">周</span>
         <span v-if="act.freqUnit=='2w'">两周</span>
         <span v-if="act.freqUnit=='m'">月</span>
            <input v-model="act.freqNum" type="number" class="sl-input" style="width:150px" />
         活动
         </div>
     </div>  
     
     <div class="flex-row flex-middle flex-center mb20">
         <button class="sl-btn primary" @click="actCreate">{{act.id != "" ? "保存团队活动" : "创建团队活动"}}</button>
     </div>    

  </div>
</template>

<script>
import VueCoreImageUpload  from 'vue-core-image-upload';
import Config from '../router/config.js';
export default {
  name: 'sumslack_act_create',
  data(){
  	return {
        token:"",  
        showImage:false,  
        uploadUrl:Config.Ajax.uploadurl,
        act:{
          id:"",title:"",d:"",sdt:"",edt:"",
          isD:false,time:"18:30",addr:"",
          freqNum:0,freqUnit:"D",minNum:1,isFreq:false}
  	}
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload
  },
  created(){
     
     this.$root.eventHub.$emit('header-show', false);
     this.act.id = this.$route.query.id || "";
     if(typeof(this.$route.params.token) === "undefined"){
          this.token = "";
     }else{
          this.token = this.$route.params.token;
     }
     
     if(this.act.id!=""){
         this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/act/get",{actId:this.act.id,token:this.token}).then(data => {
             let act =data.data.act;
             this.act.id = act.id;
             this.act.title = act.title;
             this.act.d = act.d;
             this.act.time = new Date(act.act_time).format("hh:mm");
             this.act.addr = act.act_addr;
             this.act.sdt = new Date(act.start_date).format("yyyy-MM-dd");
             this.act.edt = new Date(act.end_date).format("yyyy-MM-dd");
             this.act.freqNum =act.freq_num;
             this.act.freqUnit = act.freq_unit === "none" ? "":act.freq_unit;
             if(this.act.freqUnit === ""){
               this.act.isFreq = false;
             }else{
               this.act.isFreq = true;
             }
             this.act.minNum = act.min_num;
             
         });
     }
  },
  methods:{
    addMemo(){
      this.act.isD = !this.act.isD;
    },
    actCreate(){
        if(typeof(this.act.id)!="undefined" && this.act.id!=""){ //修改功能
            this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/act/save",{
                token:this.token,
                actId:this.act.id,
                title:this.act.title,
                d:this.act.d,
                sdt:this.act.sdt,
                edt:this.act.edt,
                time:this.act.time,
                addr:this.act.addr,
                minNum:this.act.minNum,
                freqUnit:(this.act.isFreq?this.act.freqUnit:""),
                freqNum:this.act.freqNum
            }).then(data => {
              //console.log(data.data);
              if(data.data.ret){
                  this.$modal.alert("保存活动成功!");  
                  this.$router.push({path:'/act/list/'+this.token});
                }else{
                  this.$modal.alert("创建活动失败!");  
                }
              //this.$router.push({path:'/'});
            });
        }else{
            this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/act/add",{
                token:this.token,
                title:this.act.title,
                d:this.act.d,
                sdt:this.act.sdt,
                edt:this.act.edt,
                time:this.act.time,
                addr:this.act.addr,
                minNum:this.act.minNum,
                freqUnit:(this.act.isFreq?this.act.freqUnit:""),
                freqNum:this.act.freqNum
            }).then(data => {
                console.log(data.data);
                if(data.data.ret){
                  this.$modal.alert("创建活动成功!");  
                  this.$router.push({path:'/act/list/'+this.token});
                }else{
                  this.$modal.alert("创建活动失败!");  
                }
                //this.$router.push({path:'/'});
            });
        }
    },
    imageuploaded(res){
        if(typeof res === "string"){
            res = res.substring(1,res.length-2);
            res = res.trim();
            var ss = res.split(",");
            if(typeof ss === "object"){
                ss.forEach(item => {
                    if(item.trim().indexOf("path=")==0){
                        var path = item.trim().substring(5);
                        console.log(path)
                        this.paper.logo = Config.Ajax.uploadBaseUrl + path.trim();
                    }
                });
            }
        }

        this.showImage = (this.paper.logo!="");
        if(!this.showImage){
            this.$modal.alert("暂时无法上传图片！");
        }
        
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
