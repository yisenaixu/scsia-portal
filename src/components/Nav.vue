<template>
  <div class="nav">
    <nav>
      <div class="nav-left">
        <div class="img">
          <img src="@/assets/logo.png" alt="" />
        </div>
      </div>
      <div
        class="nav-middle"
        @mouseenter="$refs.bg.style.height = `${maxNavChildrenHeight*45}px` "
        @mouseleave="$refs.bg.style.height = 0"
      >
        {{ console.log(navs)
         }}
         <nav-button 
         v-for="nav in navs" 
         :key="nav" 
         :routeName="nav.title" 
         :routeUrl="nav.url" 
         :urls="nav?.children" ></nav-button>
      </div>
      <div class="nav-right">
        <div class="nav-search">
           <svg-icon symbolId="icon-search" className="svgIcon" color="black"></svg-icon>
           <div class="search"> 
            <input type="text">
           </div>
        </div>
        <div class="login-button">
          <button>
            <a href="http://man.dkelab.cn/login">登录</a>
          </button>
          <button>
            <a href="http://man.dkelab.cn/register">注册</a>
          </button>
        </div>
      </div>
    </nav>
    <div ref="bg" :class="{bg: true, bgHover:isShow}"></div>
  </div>
</template>
<script>
import SvgIcon from "./SvgIcon.vue";
import NavButton from "./NavButton.vue";
import { mapGetters } from "vuex";
export default {
  components: { NavButton, SvgIcon},
  name: "Nav",
  mounted() {
    console.log(this.$route);
    console.debug(this.navs);
  },
  data() {
    return {
      isShow: false,
      show: '',
      urls: [
        { name: "活动通知", path: "/notic" },
        { name: "活动报告", path: "/report" },
        { name: "公示公告", path: "/public" },
        { name: "行业资讯", path: "/news" },
      ],
      urls_1: [{ name: "联系我们", path: "/connect" }],
    };
  },
  computed: {
    ...mapGetters(['navs']),
    maxNavChildrenHeight() {
      return this.navs.reduce((max,cur) => {
        const length = cur?.children?.length ?? 0;
        return length > max ? length : max;
      },0)
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: auto;
  background: rgba(255, 255, 255, .75);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.11);
  transition: height 2.1s;
  nav {
    background: var(--main-bac);
    width: 100%;
    display: flex;
    justify-content: space-between;
    .nav-left,
    .nav-middle,
    .nav-right {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .nav-left {
      justify-content: start;
      .img {
        margin-left: 30px;
        height: 64px;
        width: 117px;
        img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      }
    }
    .nav-middle {
      flex: 2;
      justify-content: center;
      position: relative;
    }
    .nav-right {
      .login-button {
        margin-right: 16px;
         button {
          margin-right: 4px;
          background: rgba(189, 207, 255, 0.28);
          padding: 4px 8px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
         }
      }
      .nav-search {
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0 8px;
        margin-right: 20px;
        background: rgba(189, 207, 255, 0.28);
        border-radius: 8px;
        .search{
          margin-left: 8px;
          input {
             width: 80px;
             font-size: 16px;
             font-weight: 500;
             border: none;
             background: transparent;
             &:focus-visible {
              outline: none;
             }
         }
      } 
    }
      justify-content: right;
    }
  }
  .bg {
    width: 100%;
    height: 0;
    transition: height 0.4s;
  }
  .bgHover {
    height: 400px;
  }
}
</style>