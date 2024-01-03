<template>
  <div class="content">
    <div class="ba-img">
        <img src="@/assets/banner.png" alt="">
      </div>
    <div class="container">
      <div class="navs">
        <router-link :to="nav.path">
         <div class="nav big">
          {{ nav.meta.title }}
          <svg-icon symbolId="icon-arrow-down" className="svgIcon"></svg-icon>
         </div>
        </router-link>
        <router-link :to="`${nav.path}/${item.path}`"  v-for="item in nav.children" :key="item">
         <div :class="{nav:true,active:$route.meta.title === item.meta.title}">
           {{ item.meta.title}}
           <div class="icon">
             <svg-icon symbolId="icon-arrow-left" className="svgIcon" color="black" ></svg-icon>
           </div>
         </div>
        </router-link>
      </div>
      <div class="info">
        <div class="crumb-nav">
          <router-link class="crumb-nav-home" to="/">
            <svg-icon symbolId="icon-home" className="svgIcon"></svg-icon> 首页</router-link>
            &nbsp;
            >
            &nbsp;
          <div class="crumb-nav-item"  v-for="(item, index) in this.$route.matched" :key="item" v-show="index!==0">
            <router-link v-if="!item.path.includes(':')" :to="item.path" :class="{active: index === this.$route.matched.length-1}">{{ item.name }}</router-link>
            <span v-else :class="{active: index === this.$route.matched.length-1}">详情</span>
            <span v-show="index !== this.$route.matched.length-1">
              &nbsp;
              >
              &nbsp;
            </span>
          </div>
          <!-- <router-link class="active" :to="$route.path"> {{ $route.name }} </router-link> -->
         </div>
        <router-view :key="$route.path"></router-view>
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
  // margin: 50px auto;
  overflow: hidden;
  .ba-img {
    left: 0;
    width: 100%;
    position: absolute;
    z-index: 0;
    img {
      width:100%;
      height: 160px;
    }
  }
  .container {
    display: flex;
    justify-content: space-around;
    // align-items: center;
    margin-top: 130px;
    .info {
        margin-top: 30px;
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
          .crumb-nav-item {
            .active {
            color: #1538D6;
          }
          }
        }
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
        background: #0a6fdb;
        display: flex;
        cursor: pointer;
        justify-content: space-around;
        align-items: center;
        color: white;
        &:hover {
          background: #0a6fdb;
        }
      }
    }
  }
}
</style>