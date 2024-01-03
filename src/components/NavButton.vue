<template>
    <div class="nav-button"
         @mouseenter="isHover = true"
         @mouseleave="isHover = false">
         <div 
       class="extar-buttons"
       v-if="routeUrl.length !== 0"
       >
        <TransitionGroup
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp" >
        <div class="extar-buttons-item" 
          v-show="isHover" 
          v-for="u in urls" 
          :key="u.title">
            <a v-if="u.type === 'out'" :href="u.url" target="_blank" >{{ u.title }}</a> 
            <router-link v-if="u.type === 'in'" :to="`${routeUrl}/${u.url}`">
              {{ u.title }}
           </router-link>
          </div>
        </TransitionGroup>
       </div>  
       <div class="button">
        <router-link 
         class="link" 
         :to="routeUrl">
         {{ routeName }}
        </router-link>
       </div>
    </div>
</template>
<script>
import SvgIcon from './SvgIcon.vue';

  export default {
  components: { SvgIcon },
    name: 'NavButton',
    props: ['routeName', 'routeUrl', 'urls'],
    data() {
        return {
            isHover: false,
        };
    },
    methods: {},
    
}

</script>
<style lang="scss" scoped>
.animate__fadeInDown,
.animate__fadeOutUp {
  animation-duration: .3s;
}
    .nav-button {
      // padding: 24px;
      margin: 0 16px;
      font-size: 18px;
      font-weight: 600;
      z-index: 999;
      position: relative;
      .button {
        position: relative;
        user-select: none;
        cursor: pointer;
        min-width: 80px;
        height: 40px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        a {
          color: #000;
        }
        // border-bottom: 1px solid black;
        
        &:hover a{
          color: #007aff;
        }
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          right: 50%;
          bottom: 0;
          border-bottom: 4px solid #007aff;
          transition: all .5s;
        }
        &:hover::after {
          left: 25%;
          right: 25%;
        }
      }
      .extar-buttons-item {
        font-size: 18px;
        font-weight: 500;
        position: relative;
        user-select: none;
        cursor: pointer;
        // min-width: 80px;
        height: 40px;
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        a {
          color: #000;
        }
        // border-bottom: 1px solid black;
        
        &:hover a{
          font-weight: 600;
          color: #007aff;
        }
      }
      .extar-buttons {
        padding-top: 80px;
        position: absolute;
        width: 200px;
        left: 50%;
        margin-left: -100px;
        &:hover + .button::after {
          left: 25%;
          right: 25%;
        }
      }
    }
    @media (max-width: 1440px) {
  .nav-button {
    font-size: 16px;
    .extar-buttons-item {
      font-size: 16px;
    }
  }
}
</style>