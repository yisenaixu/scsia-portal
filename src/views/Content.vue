<template>
  <div class="content">
    <div class="container">
      <div class="navs">
        <div class="nav big">
          <router-link :to="nav.path">{{ nav.meta.title }}</router-link>
          <svg-icon symbolId="icon-arrow-down" className="svgIcon"></svg-icon>
        </div>
        <div :class="{nav:true,active:$route.meta.title === item.meta.title}" v-for="item in nav.children" :key="item">
          <router-link :to="`${nav.path}/${item.path}`">{{
            item.meta.title
          }}</router-link>
           <div class="icon">
             <svg-icon symbolId="icon-arrow-left" className="svgIcon" color="black" ></svg-icon>
           </div>
        </div>
      </div>
      <div class="info">
        <div class="crumb-nav">
          <router-link class="crumb-nav-home" to="/">
            <svg-icon symbolId="icon-home" className="svgIcon"></svg-icon> 首页</router-link>
            >
          <router-link class="active" :to="$route.path">{{ $route.name }}</router-link>
         </div>
        <router-view :key="$route.name + $route.params"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import SvgIcon from '../components/SvgIcon.vue';
export default {
  components: { SvgIcon },
  name: "Content",
  data() {
    return {
      current: [this.$route.path],
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    parentId() {
      return this.$route.meta.parentId;
    },
    nav() {
      return this.routes.find((item) => item.id === this.parentId);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
  overflow: hidden;
  .container {
    display: flex;
    justify-content: space-around;
    // align-items: center;
    margin-top: 50px;
    .info {
        width: 80%;
        min-height: 600px;
        position: relative;;
        .crumb-nav {
          display: flex;
          align-items: center;
          position: absolute;
          top: 2px;
          left: 4px;
          font-size: 14px;
          font-weight: 200;
          .crumb-nav-home {
            display: flex;
            align-items: center;
          }
          .active {
            color: #1538D6;
          }
        }
    }
    .nav-big {
      font-size: 36px;
    }
    .navs {
        width: 15%;
        background: #f2f2f2;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
        background: #0a6fdbd5;
        display: flex;
        cursor: default;
        justify-content: space-around;
        align-items: center;
        a {
          color: white;
        }
        &:hover {
          background: #0a6fdbd5;
        }
      }
    }
  }
}
</style>