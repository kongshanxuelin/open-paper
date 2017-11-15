<template >
  <div class="container">
     <div class="flex-column mb20">
         <div class="flex-item-12">试题问题描述:</div>
         <div class="flex-item-12"><textarea v-model="ques.d" class="sl-input" rows=5 style="width:90%"></textarea></div>
     </div>    
     <div class="flex-column mb20">
         <div class="flex-item-12">问题类型:</div>
         <div class="flex-item-12">
             <select v-model="ques.t" style="width:90%">
                 <option value="radio">单选题</option>
                 <option value="checkbox">多选题</option>
                 <option value="input">填空题</option>
                 <option value="textarea">多行简答题</option>
             </select>    
         </div>
     </div>    
     <div class="flex-column mb20">
         <div class="flex-item-12">问题答案:</div>
         <div class="flex-item-12">
             <input type="text" v-model="ques.ans" class="sl-input" style="width:90%"/>
             <p><span class="sl-label2" style="font-size:10px">注：填空题直接输入答案，单选题输入备选项序号，从0开始，如输入1，表示选B，多选题输入备选项序号列表，用,隔开，如：0,2,表示选AC</span></p>
        </div>
     </div>    
     <div class="flex-column mb20">
         <div class="flex-item-12">问题附带图片:</div>
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
     <div class="flex-row mb20">
         <div class="flex-item flex-row flex-right mb20">
            <button class="sl-btn primary" @click="itemAdd">新增一个备选项</button>             
         </div>    
         <div class="flex-row" ref="items">
             <div class="flex-item" v-for="(item,index) in ques.items">
                 选项{{index+1}}：<textarea style="width:90%" rows=2 class="sl-input" name="items"></textarea>
                 <i title="删除" class="icon sumscope-icon icon-close" style="font-size: 20px; color: #F00" @click="removeItemsByIndex(index)"></i>
             </div>    
         </div>    
     </div>
     <div class="flex-row mb20">
         <div class="flex-item flex-row flex-right mb20">
            <button class="sl-btn primary" @click="codeAdd">新增一段代码</button>             
         </div>    
         <div class="flex-row" ref="codes">
             <div class="flex-item flex-column" v-for="(item,index) in ques.codes">
                 <div style="margin-bottom:5px">
                 代码{{index+1}}：<input name="codesType" type="text" class="sl-input" />&nbsp;<span class="sl-label2">注：输入java,javascript,css,html,python等</span>
                 </div>                 
                 <textarea style="width:90%;margin-bottom:5px" rows=5 class="sl-input" name="codes"></textarea>
                 <i title="删除" class="icon sumscope-icon icon-close" style="font-size: 20px; color: #F00" @click="removeItemsByIndex(index)"></i>
             </div>    
         </div>  
     </div>
     <div class="flex-row flex-middle flex-center mb20">
         <button class="sl-btn primary" @click="quesCreate">{{this.quesId != "" ? "保存试题" : "创建试题"}}</button>
     </div>    

  </div>
</template>

<script>
import VueCoreImageUpload  from 'vue-core-image-upload';
import Config from '../router/config.js';
export default {
  name: 'sumslack_question',
  data(){
  	return {
        showImage:false,
        quesId:"",
        paperId:"",  
        uploadUrl:Config.Ajax.uploadurl,
        ques:{t:"radio",d:"",ans:"",img:"面试题",
        codes:[],
        codesValue:[],codesTypeValue:[],
        items:[],itemsValue:[],itemsImg:[]}
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
    //  if(this.paperId!=""){
    //      this.$ajax.get("paper/detail.jhtml",{id:this.paperId}).then(data => {
    //          this.paper = data.data.paper;
    //          if(data.data.paper.logo!=""){
    //              this.showImage = (data.data.paper.logo!="");
    //          }
    //      });
    //  }
  },
  methods:{
    quesCreate(){
        var items = document.getElementsByName("items");
        var codes = document.getElementsByName("codes");
        var codesType = document.getElementsByName("codesType");
        if(typeof(items)!="undefined" && items.length>0){
            items.forEach(item => {
                this.ques.itemsValue.push(item.value);
            });
        }
        if(typeof(codes)!="undefined" && codes.length>0){
            codes.forEach((item,index) => {
                this.ques.codesValue.push(item.value);
                this.ques.codesTypeValue.push(codesType[index].value);
            });
        }
        console.log(this.ques);
        this.ques.token = this.$ajax.token();
        this.ques.id = this.paperId;
        this.$ajax.post("paper/quesAdd.jhtml",this.ques).then(data => {
            console.log(data.data);
            this.$router.push({path:'/paper/questions/'+this.paperId});
        });
        /*
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
        */
    },
    itemAdd(){
       this.ques.items.push("")
    },
    codeAdd(){
       this.ques.codes.push("") 
    },
    removeItemsByIndex(index){
        this.ques.items.splice(index, 1);
    },
    imageuploaded(res){
        if(typeof res === "string"){
            res = res.substring(1,res.length-3);
            var ss = res.split(",");
            if(typeof ss === "object"){
                ss.forEach(item => {
                    if(item.trim().indexOf("path=")==0){
                        var path = item.trim().substring(5);
                        this.ques.img = Config.Ajax.uploadBaseUrl + path.trim();
                    }
                });
            }
        }

        // this.showImage = (this.paper.logo!="");
        // if(!this.showImage){
        //     this.$modal.alert("暂时无法上传图片！");
        // }
        
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
