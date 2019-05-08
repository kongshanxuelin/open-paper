<template >
  <div>
     <div class="m20" v-html="msg">{{msg}}</div>
     <div class="flex-row flex-center flex-middle m20">
       <a class="sl-btn primary" @click="doShare" href="#">分享给朋友</a>
     </div>
      <div class="m20" v-if="showImg">
        <img class="arrow" src="http://h5.sumslack.com/share-it.png">
      </div>
  </div>
</template>

<script>
export default {
  name: 'sumslack_result',
  data(){
  	return {
      showImg:false,
      id:"",
      score:0,
      rate:"0%",
      msg:""
  	}
  },
  created(){
      console.log("xxxx")
      var that = this;
      this.$ajax.get("paper/score.jhtml",{id:this.$route.params.id}).then(data => {
          console.log(data)
          this.score = data.data.score;
          this.rate = data.data.rate;
          if(data.data.paper.lang.indexOf("题")>=0)
            this.msg = "您的分数为：<span class='sl-label-yellow'> " + this.score + "分 </span>，打败了 "+this.rate+" 的答题者!";
          else
            this.msg = "感谢您的参与!";
      });
  },
  methods:{
    doShare(){
        //this.showImg = true;
        if(window.__wxjs_environment === 'miniprogram'){
          wx.miniProgram.navigateTo({url: '/pages/grid-paper/share/index?rid='+this.$route.params.id});
        }else{
          this.$modal.alert("点击右上角更多菜单分享！");
          //this.showImg = true;
        }
    }
	}
 }
</script>
<style lang="less" scoped>
	.m20{
	  margin:20px;
  }
  #shareit {
    -webkit-user-select: none;
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.85);
    text-align: center;
    top: 0;
    left: 0;
    z-index: 105;
  }
  #shareit img {
    max-width: 100%;
  }
  .arrow {
    position: absolute;
    right: 10%;
    top: 5%;
  }
  #share-text {
    margin-top: 400px;
  }

</style>
