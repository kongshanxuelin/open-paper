<template >
  <div class="flex-row">
      <div class="flex-item flex-row">
        <div :key="index" v-for="(item, index) in items" class="flex-item flex-column flex-middle m20">
          <div class="flex-item-12">
            <img :src="item.logo" style="width:32px;height:32px;border-radius:50%;border:0;" border=0>
            <span @click="goPaper(item)">{{item.title}} </span>
          </div>
          <div class="flex-item-12" style="text-align:right;padding-right:10px;">
            <i title="修改" class="icon sumscope-icon icon-edit" style="font-size: 20px; color: rgb(255, 125, 0);" @click="paperEdit(item)"></i>
            <i title="预览试卷" class="icon sumscope-icon icon-search" style="font-size: 20px; color: rgb(255, 125, 0);" @click="doStart(item)"></i>
            <i title="试题管理" class="icon sumscope-icon icon-appstore-o" style="font-size: 20px; color: rgb(255, 125, 0);" @click="paperQuestions(item)"></i>
            <i title="生成微信小程序码" class="icon sumscope-icon icon-qrcode" style="font-size: 20px; color: rgb(255, 125, 0);" @click="genQrCode(item)"></i>
            <i title="删除" class="icon sumscope-icon icon-close" style="font-size: 20px; color: #F00" @click="doRemove(item)"></i>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'sumslack_label',
  data(){
  	return {
  	  items: []
  	}
  },
  created(){
      this.$ajax.get("paper/mypaper.jhtml",{token:this.$ajax.token()}).then(data => {
          this.items = data.data;
      });
  },
  methods:{
    doRemove(paper){
      this.$modal.confirm("是否确定删除？一旦删除，不可恢复",() => {
        this.$ajax.get("paper/remove.jhtml",{token:this.$ajax.token(),id:paper.id}).then(data => {
          if(data.data.ret){
            this.items = this.items.filter((item) => {return item.id != paper.id});
          }else{
            this.$modal.alert(data.data.msg || "错误，请联系管理员");
          }
      });
      });
    },
    paperEdit(paper){
      this.$router.push({path:'paper/edit/'+paper.id});
    },
    goPaper(paper){
      if(window.__wxjs_environment === 'miniprogram'){
        wx.miniProgram.navigateTo({url: '/pages/paper/share/index?type=paper&rid='+paper.id});
      }else{
        this.$router.push({path:'paper/'+paper.id});
      }
    },
    paperQuestions(paper){
        this.$router.push({path:'paper/questions/'+paper.id});
    },
    genQrCode(paper){
        this.$ajax.get("paper/genImage.jhtml",{
          token:this.$ajax.token(),
          id:paper.id,
          type:"paper"}).then(data => {
            console.log(data.data)
            if(data.data.ret){
              this.$modal.alert(`<div style="margin:15px;"><p>可将以下小程序码截图发送给微信朋友或发送到朋友圈，长按小程序码即可打开试卷</p>
              <p><img src='${data.data.url}' /></p></div>`);
            }else{
              this.$modal.alert("生成小程序码失败，请重试！");
            }
        });
    },
    doStart(paper){
      this.$router.push({path:'paper/'+paper.id});
    }
	}
 }
</script>
<style lang="less" scoped>
  .page{
	  height: 200px;
	  position: relative;
	  overflow: auto;
	  /* Prevent native touch events on Windows */
	  -ms-touch-action: none;
	  /* Prevent the callout on tap-hold and text selection */
	  -webkit-touch-callout: none;
	  user-select: none;
	  text-size-adjust: none;
	}
	div.m20{
	  margin:5px;
  }
  .item {
    padding:0;
    margin:0;
    list-style-type:none;
    cursor: pointer;
  }
  i {
    margin-right:2px;
    cursor: pointer;
  }
</style>