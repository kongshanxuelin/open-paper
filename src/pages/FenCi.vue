<template >
  <div class="container">

    <div> 
         <h1>图片识别债券信息</h1>
      <div>   
         <span class="sl-label-yellow">识别引擎选择：</span>
         <sl-radio value="all" v-model="upData.engine">双引擎 <span class="sl-label-yellow">[ 更多识别结果，能处理低像素图片，识别精度低 ]</span></sl-radio>
         <sl-radio value="t" v-model="upData.engine">腾讯AI <span class="sl-label-yellow">[ 快速，识别精度高 ]</span></sl-radio>
         <p style="color:grey;font-size:12px;">
           注：如遇程序无法识别到有效的债券信息的情况，请将样本图片发送至：<a style="color:grey" href="mailto:jacon.xue@sumscope.com">jacon.xue@sumscope.com</a>，以便我们改进算法，技术支持：森浦资讯
          </p>
      </div>   
      <div class="mb20">
        <sl-uploader 
        :postURL="ocrUrl" 
        :postData="upData"
        :minItems="1" 
        :maxItems="1"
        :showHttpMessages = "false"
        headerMessage=""
        fileNameMessage="文件名"
        fileSizeMessage="文件大小"
        totalFileMessage="总文件数"
        totalUploadSizeMessage="总大小"
        removeFileMessage="移除文件"
        dropAreaPrimaryMessage="先选择要识别债券的一张图片"
        dropAreaSecondaryMessage="点击上传或将图片拖入到这里"
        uploadButtonMessage="开始识别"
        cancelButtonMessage="取消"
        errorMessagePath=""
        successMessagePath=""
        @upload-success='success_handler'
        @upload-error='upload_fail_hander'>
        </sl-uploader>
      </div>
        <button class="sl-btn primary" v-if="ocr_result.length>0" style="margin-bottom:10px;"
        v-clipboard:copy="dataclip"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">点击复制识别结果</button>
      <div class="flex-column flex-middle flex-center" style="margin:5px 20px;">  
        <div class="ocr_bond flex-item-6">
          <ol>
            <div v-for="r in ocr_result" >
                <div v-for="bond in r.bonds" style="margin-top:2px;">
                  <li v-if="bond.bondid">
                    <a style="margin-right:20px;margin-left:5px;" target="_blank" 
                    :href="'http://b.idbhost.com/oauth-provider/qbapi/bondinforByBondKey/'+bond.bondkey">{{bond.shortname}}</a>  
                    <span style="margin-right:20px;">{{bond.bondid}}</span>
                    <span v-if="upData.engine=='all'" class="sl-label-disabled"> 来自{{bond.engine}}</span>
                  </li>
                </div>
            </div>
          </ol>

        </div>
        <div class="flex-item-18">
          <img style="margin-top:20px;" border=0 :src="ocr_img" />
        </div>
      </div>
    </div>


     <h1><a href=# @click="showNCDPanel">NCD报价识别程序</a></h1>
     <div v-if="showNCD">
        <div class="flex-column mb20">
            <div class="flex-item-24">
              <textarea v-model="t" placeholder="输入一条聊天消息或任意语句" class="sl-input" rows=5 style="width:90%"></textarea>
            </div>
        </div> 
        <div class="flex-column flex-end flex-right mb20">
            <button class="sl-btn primary mr10" @click="shibie">词组识别</button>
            <button v-if="isExec" class="sl-btn primary mr10" @click="shibie_ok">识别正确</button>
            <button v-if="isExec" class="sl-btn fatal mr10" @click="shibie_fail">识别错误</button>
        </div>
        <div v-if="isok">    
          <h4>识别结果 <span class='sl-label-disabled' v-if="time>0"> [ 费时：{{time}} 毫秒 ]</span></h4>
          <div v-for="r in result">
            <div><span class="sl-label-yellow">原文：</span>{{r.yw}}
            &nbsp;&nbsp;<span v-html="pretty(r.termList)"></span>
            </div>
            
          </div>
        </div>
        <div v-if="!isok">
          <div class="flex-row mb20">
            <h1>请输入正确的识别结果</h1>
            <div class="flex-item-24">
              <textarea v-model="result_jz"  class="sl-input" rows=5 style="width:90%"></textarea>
            </div>
            <div class="flex-item-24 flex-rioght flex-center mb20">
              <p><button class="sl-btn primary" @click="jiuzheng">提交纠正</button>
              注：dict：方向，term：期限，pj：评级，pri：价格，vol：数量，如输入：1M/term等</p>
              
            </div> 
          </div> 

        </div>  
    </div>

    <h1><a href=# @click="showTTSPanel">语音合成</a></h1>
    <div v-if="showTTS">
      <div class="flex-column mb20">
        <sl-radio value="ai" v-model="tts.engine">腾讯AI</sl-radio>&nbsp;&nbsp;
        <sl-radio value="yt" v-model="tts.engine">优图引擎</sl-radio>

        <sl-radio value="1" v-model="tts.speaker">男声</sl-radio>&nbsp;&nbsp;
        <sl-radio value="2" v-model="tts.speaker">女声</sl-radio>
        
        <button class="sl-btn primary" style="margin-left:40px;" @click="ttsIt">开始合成</button>
      </div>
      <div class="flex-column mb20">
        <!--<span class="sl-label2" style="margin-left:20px">语音速度：</span>
        <input class="sl-input" style="width:50px" v-model="tts.speed" /><span class="sl-label2">最高100</span> -->
        
      </div>
      <div class="flex-column mb20">
            <div class="flex-item-24">
              <textarea v-model="tts.text" placeholder="输入一条文本，限150字内" class="sl-input" rows=5 style="width:90%"></textarea>
            </div>
      </div> 
      
      <div class="flex-column mb20">
        <audio v-if="tts_url!=''" autoplay="autoplay"
            controls="controls"
            preload="auto"
            :src="tts_url">
        </audio>
        <p>
          <a v-if="tts_url!=''" target="_blank" :href="tts_url">音频文件下载</a>
        </p>
      </div>  

    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Config from '../router/config.js';

Vue.use(VueClipboard)

export default {
  name: 'sumslack_fenci',
  data(){
  	return {
        showNCD:false,
        showTTS:false,
        tts:{text:"211 32 taken",speaker:"1",engine:"ai",speed:100},
        tts_url:"",
        upData:{engine:"t",type: 'ocrtype_tencent'},
        //ocrUrl:"https://wx.sumslack.com/microteam/wx/upload",
        //uploadBasePath:"https://wx.sumslack.com/microteam/upload/",
        ocrUrl:"http://localhost:6080/wx/upload",
        uploadBasePath:"http://localhost:6080/upload/",
        //NB
        //ocrUrl:"http://wstest.idbhost.com/ocr/wx/upload",
        //uploadBasePath:"http://wstest.idbhost.com/ocr/upload/",
        
        t:"1）兴业一个月4.35 三个月4.35 六个月4.4 九个月4.45 一年4.45\r\n9个月 4.60%",
        time:0,
        result:[],

        dataclip:"",

        ocr_result:[],
        ocr_img:"",


        result_jz:"",
        isExec:false,
        token:"",
        issubmit:{},
        isok:true //结果是否识别准确
  	}
  },
  watch:{
    t(val){
      this.isExec = false;
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

     //自动跳转
     //  location.href = "http://wstest.idbhost.com/act/fenci/xx";

  },
  methods:{
    showNCDPanel(){
      this.showNCD = !this.showNCD;
    },
    showTTSPanel(){
      this.showTTS = !this.showTTS;
    },
    onCopy(){
      this.$modal.alert("复制成功");
    },
    onError(e){
      // 不支持复制  
      this.$modal.alert('该浏览器不支持自动复制')  
    },

    upload_fail_hander(){
      this.$modal.alert("服务器繁忙，请稍候重试!");  
    },
    success_handler(res) {
      res = res.data;
      if(res.res){
        var _bonds = res.ocr_r;
        if(typeof(_bonds) === "string"){
          _bonds = JSON.parse(_bonds);
        }
        this.ocr_result = _bonds;
        this.ocr_img = this.uploadBasePath +res.ocr_url;
        //console.log("_bonds:",_bonds)
        this.dataclip = "";
        this.ocr_result.forEach((n,index) => {
            if(typeof(n) === "string"){
              n = JSON.parse(n);
              Vue.set(this.ocr_result, index, n)
              console.log(n)
              if(typeof(n.bonds) === "string"){
                n.bonds = JSON.parse(n.bonds);
              }
            }
            if(n.bonds && n.bonds.length>0){
              n.bonds.forEach(nn => {
                if(nn.bondid)
                  this.dataclip += nn.bondid + "\t" + nn.shortname + "\r\n";
              });
            }
        });
      }
    },
    shibie(){
        //this.t = this.t.replace(/\r/g,"");
        //this.t = this.t.replace(/\n/g,"");
        this.t = this.t.trim();
        this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/fc/learning-ncd",{
          t:encodeURIComponent(this.t)
        }).then(data => {
            var ret = data.data;
            this.isExec = true;
            this.isok = true;
            this.time = ret.time;
            this.result = ret.ci;
        });
    },
    ttsIt(){
        this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/fc/tts",{
          text:encodeURIComponent(this.tts.text),
          engine:this.tts.engine,
          speaker:this.tts.speaker
        }).then(data => {
            var ret = data.data;
            //console.log(ret)
            if(ret.ret == 0){
              this.tts_url = ret.path;
              //this.$modal.alert("语音合成成功，请点击播放预览!");  
            }else{
              this.$modal.alert("语音合成失败，请重试!");  
            }
        });
    },
    jiuzheng(){
        this.result_jz = this.result_jz.replace(/\r/g,"");
        this.result_jz = this.result_jz.replace(/\n/g,"");
        this.result_jz = this.result_jz.trim();
        this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/fc/add-learning",{
          yw:this.t,
          t:this.result_jz
        }).then(data => {
            var ret = data.data;
            if(ret.ret){
              this.$modal.alert("已提交纠正并进行了学习，请重新识别!");  
            }else{
              this.$modal.alert("提交纠正是被!");  
            }
        });
    },
    prettyNature(n){
      if(n === "dict"){
        return "<span class='sl-label'>方向</span>";
      }else if(n === "term"){
        return "<span class='sl-label'>期限</span>";
      }else if(n === "pj"){
        return "<span class='sl-label'>评级</span>";
      }else if(n === "pri"){
        return "<span class='sl-label'>价格</span>";
      }else if(n === "vol"){
        return "<span class='sl-label'>数量</span>";
      }else if(n === "bank"){
        return "<span class='sl-label'>机构</span>";
      }else{
        return n;
      }
    },
    prettyNatureS(n){
      if(n === "dict"){
        return "<span class='sl-label-disabled'>方向</span>";
      }else if(n === "term"){
        return "<span class='sl-label-disabled'>期限</span>";
      }else if(n === "pj"){
        return "<span class='sl-label-disabled'>评级</span>";
      }else if(n === "price"){
        return "<span class='sl-label-disabled'>价格</span>";
      }else if(n === "shibor"){
        return "<span class='sl-label-disabled'>浮息价格</span>";
      }else if(n === "vol"){
        return "<span class='sl-label-disabled'>数量</span>";
      }else if(n === "bank"){
        return "<span class='sl-label-disabled'>机构</span>";
      }else{
        return "";
      }
    },
    pretty(r){
      var str = "";
      var res = {};
      if(r && r.forEach){
        r.forEach(item => {
          if(typeof res[item.nature] == "undefined"){
              res[item.nature] = new Array();
          }
          if(this.isValid(item))
            res[item.nature].push(this.formatTerm(item));
        });
        if(r.length == 0){
          str = "<span class='sl-label-disabled'>WARNING:无法识别到有效的结构化数据</span>";
        }else{
            str = "<span class='sl-label-yellow'>识别结果：</span>";
            for(var k in res){
              str += this.prettyNature(k)+"：<span class='sl-label2'>" + res[k].join(",") + "</span> ";
            }
        }
      }
      return str;
    },
    isValid(item){
      if(item.nature === "term"){
        if(item.word.indexOf("日")>=0 && item.word.indexOf("月")>=0){
          return false;
        }
      }
      return true;
    },
    formatTerm(item){
      if(item.nature === "term"){  //格式化成XXD,XXM，XXY
        if(item.word.indexOf("月")>0){
          return this.chinese2Number(item.word.replace(/个?月/g,"")) + "M";
        }else if(item.word.indexOf("年")>0){
          return this.chinese2Number(item.word.replace(/年/g,"")) + "Y";
        }else if(item.word.indexOf("天")>0 || item.word.indexOf("日")>0){
          return this.chinese2Number(item.word.replace(/[天|日]/g,"")) + "D";
        }
      }
      return item.word;
    },
    prettyJZ(r){
      var str = "";
      if(r.termList && r.forEach){
        r.forEach(item => {
          str += item.word + "/" + item.nature + " ";
        });
      }
      return str;
    },
    shibie_ok(){
        this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/fc/ok",{
        }).then(data => {
            var ret = data.data;
            this.isok = true;
            if(ret.ret){
              this.$modal.alert("已上报!");  
            }else{
              this.$modal.alert("上报失败!");  
            }
        });
    },
    shibie_fail(){
        if(typeof this.issubmit[this.t] === "undefined"){
          this.$ajax.get2(Config.Ajax.actBaseUrl,"wx/fc/fail",{
          }).then(data => {
              var ret = data.data;
              this.isok = false;
          });
          this.result_jz = this.prettyJZ(this.result);
        }
        this.issubmit[this.t] = true;
    },
    chinese2Number(chnStr){
      if(!/[零|一|二|三|四|五|六|七|八|九|十]/.test(chnStr)) return chnStr;
      var chnNumChar = {
        "零":0,
        "一":1,
        "二":2,
        "三":3,
        "四":4,
        "五":5,
        "六":6,
        "七":7,
        "八":8,
        "九":9
      };
      var chnNameValue = {
        "十":{value:10, secUnit:false},
        "百":{value:100, secUnit:false},
        "千":{value:1000, secUnit:false},
        "万":{value:10000, secUnit:true},
        "亿":{value:100000000, secUnit:true}
      };

      var rtn = 0;
      var section = 0;
      var number = 0;
      var secUnit = false;
      var str = chnStr.split('');
      for(var i = 0; i < str.length; i++){
          var num = chnNumChar[str[i]];
          console.log("num:",num)
          if(typeof num !== 'undefined'){
            number = num;
            if(i === str.length - 1){
              section += number;
            }
          }else{
            var unit = chnNameValue[str[i]].value;
            secUnit = chnNameValue[str[i]].secUnit;
            if(secUnit){
              section = (section + number) * unit;
              rtn += section;
              section = 0;
            }else{
              section += (number * unit);
            }
            number = 0;
          }
      }
      return rtn + section;
    }
  }
 }
</script>
<style scoped>
    h1 {
        text-align: center;
        font-size:16px;
    }
    .container {
        margin:4px;
    }
    .mr10{
        margin-right: 10px;
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
    .uploadBox {
      background-color:#0a0f0e;
    }
    .dropAreaDragging{
      background-color:#0a0f0e;
    }
    button.btn-round {
      background-color:#0a0f0e;
      color:black;
    }
</style>
