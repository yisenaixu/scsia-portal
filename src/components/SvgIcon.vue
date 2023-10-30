<template>
    <svg :class="className" :style="{color: color}">
       <use :href="iconName"></use>
    </svg>
</template>

<script>
  export default {
     name: 'SvgIcon',
     props: {
        symbolId: {
            type:String,
            required:true
        },
        className: {
            type: String,
            default: '',
        },
        color: {
          type: String,
          default: 'white'
        }
    },
    computed: {
        iconName() {
            return `#${this.symbolId}`
        }
    }
  }
</script>

<style lang="scss" scoped>
  .svgIcon {
    width: 15px;
    height: 15px;
    color: white;
  }
  .swiperIcon  {
    width: 25px;
    height: 25px;
    color: rgba(255, 255, 255, .55);
    background: rgba(0, 0, 0, .11);
    border-radius: 50%;
    &:hover {
      color: rgba(255, 255, 255, .99);
    background: rgba(0, 0, 0, .55);
    }
  }
</style>