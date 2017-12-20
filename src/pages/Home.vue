<template >
   <div :style="{marginLeft:'10px',marginRight:'10px'}">
      <div class="header">
        <img :src="paper.logo" class="logo"></img>
        <span class="title sl-label2" style="font-size:11px">
        	{{paper.d}}
        </span>
      </div>
      <div class="flex-column flex-right flex-middle" style="margin-bottom:10px">
         <button class="sl-btn primary" @click="doSubmit">提交答卷</button>
      </div>
      <sl-swiper :options="swiperOption" class="swiper-box">
          <div class="swiper-pagination" slot="pagination"></div>
          <sl-swiper-slide v-for="(banner,index) in banners" ref="mySwiper" :not-next-tick="notNextTick">
            <div class="flex-row flex-top" :style="{'overflow-y':'auto','overflow-x':'hidden'}">
              <div class="flex-item-24" style="margin-bottom:10px;">
                <span>{{(index+1) + '/' + banners.length}} ： </span>
                <span class="sl-label2">
                  {{banner.d}}
                  <img v-if="banner.img && banner.img!='' && banner.img.indexOf('http')==0" style="width:90%;" :src="banner.img" border=0/>
                  <span v-if="banner.t === 'input'">
                    <input type='text' v-model="ans[banner.id]" class="sl-input" style="width:60px" />
                  </span>
                  <div v-if="banner.t ==='textarea'" style="padding-left:10px;margin-top:10px;">
                      <textarea style="width:95%" rows=8 class="sl-input"  v-model="ans[banner.id]">
                      </textarea>
                  </div>
                </span>
              </div>
              <div class="flex-item-24">
                  <div v-if="banner.t ==='radio'" style="padding-left:10px">
                    <div v-for="(sel,index2) in banner.ques" :style="{'margin-bottom':'10px'}">
                    <sl-radio  :name="'ques'+index" :value="''+index2" v-model="ans[banner.id]">
                      <span>{{sel.d}}</span>
                    </sl-radio>
                    </div>
                  </div>
                  <div v-if="banner.t ==='checkbox'" style="padding-left:10px">
                    <div v-for="(sel,index2) in banner.ques" :style="{'margin-bottom':'10px'}">
                      <sl-checkbox  :value="''+index2" v-model="ans[banner.id]">
                        <span>{{sel.d}}</span>
                      </sl-checkbox>
                    </div>
                  </div>
              </div>
              <div class="flex-item-24" v-for="c in banner.codes">
                <div style="position:relative;text-align:right;right:10px;top:20px;">
                  <span class="sl-label-yellow" style="font-size:8px;">{{c.t}}代码</span>
                </div>
                <pre v-highlightjs="c.d"><code :class="c.t"></code></pre>
              </div>
            </div>
          </sl-swiper-slide>
          
          <!--
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          -->
      </sl-swiper>
    </div>
</template>

<script>
export default {
  name: 'sumslack_label',
  data(){
  	return {
  	  showBtn:false,
      ans:{},
      paper:{logo:"http://h5.sumslack.com/es6.png",d:""},
      banners: [],
      notNextTick: true,
      swiperOption: {
          autoplay: false,
          autoHeight: false,
          paginationType:'progress',
          pagination: '.swiper-pagination',
          //nextButton: '.swiper-button-next',
          //prevButton: '.swiper-button-prev',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 20,
          mousewheelControl: true,

          effect: 'slide',
          onSlideChangeEnd: function (swiper){
            console.log(this)
            console.log(swiper.isEnd ? "end of page" : "");
            
          }
      },
  	}
  },
  mounted(){
      
  },
  created(){
      var that = this;
      this.$ajax.get("paper/detail.jhtml",{token:this.$ajax.token(),id:this.$route.params.id}).then(data => {
          var paper = data.data;
          this.paper = paper.paper;
          document.title = this.paper.title;
          //初始化ans类型
          paper.queses.forEach(function(v,index,array){
              if(v.t != "checkbox"){
                //that.ans[v.id] = '';
                that.$set(that.ans,v.id,'');
              }else{
                //that.ans[v.id] = [];
                that.$set(that.ans,v.id,[]);
              }

          });
          console.log(paper.queses)
          this.banners = paper.queses;
      });
  },
  methods:{
		doSubmit(){
      console.log(this.ans);
      var isCheckAll = true;
      var that = this;
      for(let i in this.ans){
        let t = typeof(this.ans[i]);
        if(t === "object"){
            if(this.ans[i].length == 0){
              isCheckAll = false;
              break;
            }
        }else{
            if(this.ans[i] === ""){
               isCheckAll = false;
               break;
            }
        }
      }

      for(let i in this.ans){
           let item = this.ans[i];
           if(typeof(item) === "object"){
             this.ans[i] = this.ans[i].sort();
             this.ans[i] = item.join(",");
           }
      }
      this.ans.token = this.$ajax.token();
      this.ans.id = this.$route.params.id;
		
			if(!isCheckAll){
				this.$modal.confirm("您还有题目没答，是否确定提交答卷",function(){
          that.$ajax.get("paper/done.jhtml",that.ans).then(data => {
            if(data.data.ret){
              that.$router.push({path:'/result/'+data.data.id});
            }
          });
				});
			}else{
          this.$ajax.get("paper/done.jhtml",this.ans).then(data => {
            if(data.data.ret){
              this.$router.push({path:'/result/'+data.data.id});
            }
          });
			}
    }
	}
 }
</script>

<style lang="less" scoped>
  
	.code {
		display: inline-block;padding:4px;background-color: #193d37;
  }
  .swiper-pagination-progress {
    background: #193d37;
    position: absolute;
  }
  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding-top:10px;
  }
  .swiper-container-horizontal > .swiper-pagination-progress {
    height: 1px;
}
  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    top: -5px;
    left: 0;
    width: 100%;
  }
</style>
