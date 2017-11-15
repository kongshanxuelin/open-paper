<template>
    <button @click="doClick" class="btn">{{value}}</button>
</template>
<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    doClick: function () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/css/core.less";
/* button */
.btn {
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    .control-size(@font-size-base;
    @line-height-base;
    @btn-padding-base-vertical;
    @btn-padding-base-horizontal;
    @input-border-color;
    @border-radius-base);
    color: @btn-text-color;
    background-color: @btn-bg;
    .user-select(none);
    &:hover {
         background-color: @btn-hover-bg;
    }
    &:active {
         background-color: @btn-active-bg;
    }
    &[disabled] {
         color: @btn-disabled-text-color;
         background-color: @btn-disabled-bg;
    }
    a& {
        &:hover {
             color: @btn-text-color;
             text-decoration: none;
        }
        &:active {
             color: @btn-text-color;
        }
        &.disabled {
             color: @btn-disabled-text-color;
             background-color: @btn-disabled-bg;
             cursor: default;
        }
    }
}
</style>