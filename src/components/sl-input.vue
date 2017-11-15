<template>
    <input type="text" :placeHolder="placeHolder" :class="'text-input '+icon" :value="value" />
</template>
<script>
export default {
  props: {
    value: {
      type: String
    },
    icon: {
      type: String
    },
    placeHolder: {
      type: String
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
/* input */
.text-input::-webkit-input-placeholder { /* WebKit browsers */
    color: @text-color;
}
.text-input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: @text-color;
}
.text-input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: @text-color;
}
.text-input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: @text-color;
}
.text-input {
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
    &:focus {
         background-color: @input-focus-bg;
     }
    &[disabled] {
         background-color: @input-disabled-bg;
         box-shadow: none;
     }
    &.search {
     .input-icon-left("../img/search.png";
         4px center);
     }
    &.date {
         color: @text-color;
         background-color: @date-input-bg;
     .input-icon-right("../img/calendar.png";
         top 2px right 2px);
         width: 130px;
     }
}
</style>