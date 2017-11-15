import Modal from './Modal.vue'
import Dialog from './Dialog.vue'

const defaultComponentName = 'modal'

const Plugin = {
  install (Vue, options = {}) {
    /**
     * Makes sure that plugin can be insstalled only once
     */
    if (this.installed) {
      return
    }

    this.installed = true
    this.event = new Vue()
    /**
     * Plugin API
     */
    Vue.prototype.$modal = {
      show (name, params) {
        Plugin.event.$emit('toggle', name, true, params)
      },

      hide (name, params) {
        Plugin.event.$emit('toggle', name, false, params)
      },

      toggle (name, params) {
        Plugin.event.$emit('toggle', name, undefined, params)
      },
      
      alert (msg) {
        this.show('dialog', {
        title: '系统消息',
        text: msg,
        buttons: [
          {
            title: '确定',
            handler: () => {
              this.hide('dialog');
            }
          }
        ]
	      })
	    },
	    confirm(msg,cb){
	    	this.show('dialog', {
        title: '系统消息',
        text: msg,
        buttons: [
          {
            title: '确定',
            handler: () => {
              cb();
              this.hide('dialog');
            }
          },{
            title: '取消',
            handler: () => {
              this.hide('dialog');
            }
          }
        ]
	      })
	    },
	    prompt(params,cb){
	    	var _html = `
	    	<p>${params.msg}</p>
	    	<p>
	    		<input type='text' id='prompt_value' class='sl-input' value='${params.value || ""}' />
	    	</p>
        `;
        if (params.type && (params.type === "textarea")) {
          _html = `
            <p>${params.msg}</p>
            <p>
              <textarea id='prompt_value' rows=3 style='width:90%' class='sl-input'>${params.value || ""}</textarea>
            </p>
            `;
        }
	    	this.show('dialog', {
        title: '系统消息',
        text: _html,
        buttons: [
          {
            title: '确定',
            handler: () => {
              cb(prompt_value.value);
              this.hide('dialog');
            }
          },{
            title: '取消',
            handler: () => {
              this.hide('dialog');
            }
          }
        ]
	      })
	    },
	    dialog(title,params){
	    	this.show('dialog', {
	        title: title || '系统消息',
	        text: params.text || "沒有設置内容",
	        buttons:params.buttons 
	      })
	    }
    }
    
    /**
     * Sets custom component name (if provided)
     */
    const componentName = options.componentName || defaultComponentName
    Vue.component(componentName, Modal)
    /**
     * Registration of <Dialog/> component
     */
    if (options.dialog) {
      Vue.component('v-dialog', Dialog)
    }
  }
}

export default Plugin
