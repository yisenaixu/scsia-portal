<template>
   <router-link :to="to" >
      <div class="nav" :class="classNames">
        {{ title }}
       <div class="icon">
        <svg-icon 
          className="svgIcon" 
          :symbolId=" classNames === 'big' ? 'icon-arrow-down' : 'icon-arrow-left' " 
          :color=" classNames !== 'big' ? 'black' : '' "
        />
       </div>
      </div>
   </router-link> 
</template>
<script>
import SvgIcon from './SvgIcon.vue'
export default {
  components: { SvgIcon },
    name: 'link',
    props: {
        classNames: {
            type: String
        },
        to: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
    .nav {
        cursor: pointer;
        padding: 16px 16px;
        text-align: center;
        font-size: 16px;
        border-bottom: 1px solid rgba($color: #fff, $alpha: .7);
        transition: .3s;
        position: relative;
        &:hover {
          background: #fff;
        }
        .icon {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          transition: all 1.1s;
        } 
    }
    .active {
        background: #fff;
        .icon {
          transform: translateY(-50%) rotateY(180deg);
        } 
    }
    .big {
        font-size: 22px;
        font-weight: 600;
        background: #0a6fdb;
        display: flex;
        cursor: pointer;
        justify-content: space-around;
        align-items: center;
        color: white;
        &:hover {
          background: #0a6fdb;
        }
        .icon {
            position: relative;
            right: auto;
            top: auto;
            transform: translateY(0);
        }
    }
</style>