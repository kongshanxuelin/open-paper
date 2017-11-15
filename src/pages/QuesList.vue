<template >
  <div class="container">
     <div class="flex-row flex-right">
        <button class="sl-btn primary" @click="quesCreate">新增一道题目</button>
     </div>
     <div class="flex-row">
         <div v-for="q in queses" class="mb20">
             [{{q.t}}] {{q.d}} 
             &nbsp;
             <i title="修改" class="icon sumscope-icon icon-edit" style="color: rgb(255, 125, 0);" @click="edit(q)"></i>
             <i title="删除" class="icon sumscope-icon icon-close" style="color: rgb(255, 125, 0);" @click="remove(q)"></i>
             <p> 该问题有 <a href="#">{{q.ques.length}}</a> 个选项, <a href="#">{{q.codes.length}}</a> 段代码</p>
         </div>
     </div>

  </div>
</template>

<script>
export default {
  name: 'paper_question',
  data(){
  	return {
        paperId:"",  
        queses:[]
  	}
  },
  created(){
    if(typeof(this.$route.params.id) === "undefined"){
        this.paperId = "";
    }else{
        this.paperId = this.$route.params.id;
    }
    this.$ajax.get("paper/quesList.jhtml",{token:this.$ajax.token(),id:this.paperId}).then(data => {
        console.log(data.data)
        this.queses = data.data;
    });
  },
  methods:{
    quesCreate(){
        this.$router.push({path:'/paper/question_add/'+this.paperId});
    },
    edit(q){
        console.log(q)
        this.$modal.prompt({msg:"编辑问题描述：",type:"textarea",value:q.d},(res) => {
           this.$ajax.get("paper/quesSaveD.jhtml",{token:this.$ajax.token(),id:q.id,d:res}).then(data => {
                if(data.data.ret){
                    this.queses.forEach((item,index) => {
                        console.log(item,index);
                        if(item.id === q.id){
                            item.d = res;
                        }
                    });
                }else{
                    this.$modal.alert("错误，请稍候重试！");
                }
           });
        });
    },
    remove(q){
        this.$modal.confirm("是否确定删除？",() => {
           this.$ajax.get("paper/quesRemove.jhtml",{token:this.$ajax.token(),id:q.id}).then(data => {
                console.log(data.data);
                if(data.data.ret){
                    this.queses = this.queses.filter((item) => {return item.id != q.id});
                }else{
                    this.$modal.alert("错误，请稍候重试！");
                }
            });
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
</style>
