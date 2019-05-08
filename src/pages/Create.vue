<template >
  <div class="container">
     <div class="flex-column mb20">
         <div class="flex-item-12">试卷标题:</div>
         <div class="flex-item-12"><input v-model="paper.title" type="text" class="sl-input" style="width:90%" /></div>
     </div>    
     <div class="flex-column mb20">
         <div class="flex-item-12">试卷描述:</div>
         <div class="flex-item-12"><textarea v-model="paper.d" class="sl-input" rows=5 style="width:90%"></textarea></div>
     </div>    
     <div class="flex-column mb20">
         <div class="flex-item-12">试卷Logo地址:</div>
         <div class="flex-item-12">
             <vue-core-image-upload
                :class="['btn', 'btn-primary']"
                :crop="false"
                @imageuploaded="imageuploaded"
                :max-file-size="5242880"
                :url="uploadUrl">
                <span v-if="!showImage">点击上传</span>
                <img v-else :src="paper.logo" />
                </vue-core-image-upload>
         </div>
     </div>   
     <div class="flex-column mb20">
         <div class="flex-item-12">其他(带"题"字需有答案):</div>
         <div class="flex-item-12"><input type="text" v-model="paper.lang" class="sl-input" style="width:90%"/></div>
     </div>    
     <div class="flex-row flex-middle flex-center mb20">
         <button class="sl-btn primary" @click="paperCreate">{{this.paperId != "" ? "保存试卷/问卷" : "创建试卷/问卷"}}</button>
     </div>    

  </div>
</template>

<script>
import VueCoreImageUpload  from 'vue-core-image-upload';
import Config from '../router/config.js';
export default {
  name: 'sumslack_result',
  data(){
  	return {
        paperId:"",  
        showImage:false,  
        uploadUrl:Config.Ajax.uploadurl,
        paper:{title:"",d:"",logo:"",lang:"面试题"}
  	}
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload
  },
  created(){
     if(typeof(this.$route.params.id) === "undefined"){
          this.paperId = "";
     }else{
          this.paperId = this.$route.params.id;
     }
     if(this.paperId!=""){
         this.$ajax.get("paper/detail.jhtml",{id:this.paperId}).then(data => {
             this.paper = data.data.paper;
             if(data.data.paper.logo!=""){
                 this.showImage = (data.data.paper.logo!="");
             }
         });
     }
  },
  methods:{
    paperCreate(){
        if(typeof(this.paperId)!="undefined" && this.paperId!=""){ //修改功能
            this.$ajax.get("paper/save.jhtml",{
                token:this.$ajax.token(),
                id:this.paperId,
                title:this.paper.title,
                d:this.paper.d,
                logo:this.paper.logo,
                lang:this.paper.lang
            }).then(data => {
            console.log(data.data);
            this.$router.push({path:'/'});
            });
        }else{
            this.$ajax.get("paper/create.jhtml",{
                token:this.$ajax.token(),
                title:this.paper.title,
                d:this.paper.d,
                logo:this.paper.logo,
                lang:this.paper.lang
            }).then(data => {
            console.log(data.data);
            this.$router.push({path:'/'});
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
                    console.log("item:",item)
                    if(item.trim().indexOf("path=")==0){
                        var path = item.trim().substring(5);
                        console.log(path)
                        if((path+"").endsWith("}")) path = path.substring(0,path.length-1);
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
</style>
