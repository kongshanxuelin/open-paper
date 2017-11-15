<template>
  <modal name="dialog"
         height="auto"
         :classes="['v--modal', 'vue-dialog', this.params.class]"
         :width="width"
         :pivot-y="0.3"
         :adaptive="true"
         :clickToClose="clickToClose"
         :transition="transition"
         draggable=".dialog-c-title"
         @before-open="beforeOpened"
         @before-close="beforeClosed"
         @opened="$emit('opened', $event)"
         @closed="$emit('closed', $event)">
      <div class="dialog-c-title"
             v-if="params.title"
             v-html="params.title || ''"></div>
			<div class="dialog-content">
        <div class="dialog-c-text"
             v-html="params.text || ''"></div>
      </div>
      <div class="dialog-buttons" v-if="buttons">
        <button v-for="(button, i) in buttons"
                :style="buttonStyle"
                :key="i"
                v-html="button.title"
                @click.stop="click(i, $event)">
          {{button.title}}
        </button>
      </div>
      <div v-else class="dialog-buttons-none"></div>
  </modal>
</template>
<script>
  export default {
    name: 'Dialog',
    props: {
      width: {
        type: [Number, String],
        default: 400
      },
      clickToClose: {
        type: Boolean,
        default: true
      },
      transition: {
        type: String,
        default: 'fade'
      }
    },
    data () {
      return {
        params: {},
        defaultButtons: [{ title: 'CLOSE' }]
      }
    },
    computed: {
      buttons () {
        return this.params.buttons || this.defaultButtons
      },
      /**
       * Returns FLEX style with correct width for arbitrary number of
       * buttons.
       */
      buttonStyle () {
        return {
          flex: `1 1 ${100 / this.buttons.length}%`
        }
      }
    },
    methods: {
      beforeOpened (event) {
        this.params = event.params || {}
        this.$emit('before-opened', event)
      },
      beforeClosed (event) {
        this.params = {}
        this.$emit('before-closed', event)
      },
      click (i, event) {
        let button = this.buttons[i]

        if (typeof button.handler === 'function') {
          return button.handler(i, event)
        } else {
          this.$modal.hide('dialog')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
		@import "../../assets/css/core.less";
	  .sl-input {
	  	background-color:#999;
		  .control-size(@font-size-base;
		  @line-height-base;
		  @padding-base-vertical;
		  @padding-base-horizontal;
		  @input-border-color;
		  @border-radius-base);
		  background-color: @input-bg;
		  color: @input-text-color;
		  box-shadow: @input-box-shadow;
		  outline: none;
		  width:120px;
		  &:focus {
		    background-color: @input-focus-bg;
		    color:#000;
		  }
		  &[disabled] {
		    background-color: @input-disabled-bg;
		    box-shadow: none;
		  }
	 }
</style>

<style>
  .vue-dialog {
    font-size: 14px;
    background:#0a0f0e;
		border:1px solid #193d37;
  }

  .vue-dialog div {
    box-sizing: border-box;
  }

  .vue-dialog .dialog-flex {
    width: 100%;
    height: 100%;
  }

  .vue-dialog .dialog-content {
    flex: 1 0 auto;
    width: 100%;
    padding: 0px;
  }

  .vue-dialog .dialog-c-title {
    font-weight: 600;
    padding: 5px;
    background-color: rgb(25,61,55);
    cursor: move;
  }

  .vue-dialog .dialog-c-text {
  	padding:10px;
  }
  

  .vue-dialog .dialog-buttons {
	  text-align: right;
    
    font-size: 12px;
    margin-top:20px;
    margin-bottom: 20px;
    margin-right: 20px;
  }

  .vue-dialog .dialog-buttons-none {
    
    padding-bottom: 15px;
  }

  .vue-dialog button {
    background: #136c5e;
    padding: 0;
    margin-left: 10px;
    border: 0;
    border-radius: 2px;
    cursor: pointer;
    box-sizing: border-box;
    line-height: 44px;
    width:70px;
    height: 24px;

  /*  text-transform: uppercase; */
  /*  letter-spacing: 1px; */

    color:inherit;
    font:inherit;
  }

  .vue-dialog button:hover {
    background: rgba(19, 110, 101, 0.5);
  }

  .vue-dialog button:active {
    background: rgba(19, 110, 101, 0.7);
  }

  .vue-dialog button:not(:first-of-type) {
    border-left: 1px solid #323634;
  }
</style>
