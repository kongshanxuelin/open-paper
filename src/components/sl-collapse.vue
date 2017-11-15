<template>
  <div class="collapse" :class="{ open: open }" :style="{textAlign:align}">
    <div class="toggle" @click="open = !open">{{ title }} <span class="icon">▼</span></div>
    <div class="content" style="text-align:left;" v-if="open"><slot/></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    align: {
      type: String,
      required: false,
      default:"right"
    }
  },

  data () {
    return {
      open: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.toggle {
  cursor: pointer;
  user-select: none;
  color: orange;
  height:32px;
  line-height: 32px;
  .icon {
    display: inline-block;
    transition: transform .3s ease-in-out;
    transform-origin: center 10px;
    font-size:14px;
    height:32px;
    line-height: 18px;
  }

  &:hover {
    color:#ffda9a;
    background: #121a19;
  }
}

.open {
  .toggle {
    .icon {
      transform: rotate(180deg);
    }
  }
}
</style>