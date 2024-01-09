<template>
  <div class="nav">
    <nav>
      <div class="nav-left">
        <div class="img">
          <img src="@/assets/img/logo.png" alt="" />
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
        <div class="nav-search" :class="{active:inputFocus}">
           <svg-icon symbolId="icon-search" className="svgIcon" color="black"></svg-icon>
           <div class="search"> 
            <input 
              v-model="value" 
              type="text" 
              @keyup.enter="() => handleSearch()"
              @blur="inputFocus = false"
              @focus="inputFocus = true" 
              >
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
import { mapMutations, mapState } from "vuex";
import { search } from "../api/router";
export default {
  components: { NavButton, SvgIcon},
  name: "Nav",
  mounted() {
    console.log(this.$route);
    console.debug(this.navs);
  },
  data() {
    return {
      value: '',
      isShow: false,
      inputFocus: false,
      show: '',
    };
  },
  computed: {
    ...mapState(['navs']),
    maxNavChildrenHeight() {
      return this.navs.reduce((max,cur) => {
        const length = cur?.children?.length ?? 0;
        return length > max ? length : max;
      },0)
    }
  },
  methods: {
    ...mapMutations(['setSearchResult','setSearchList']),
    handleSearch() {
      console.log(this.value);
      if(this.value) {
        search(this.value).then((res) => {
         this.setSearchResult(res.data)  
         this.$router.push({path: `/search/${res.data[0]?.naviName}`,query:{key:this.value}})
       });
      }
    }
  },
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
    .active {
      background: rgba(189, 207, 255, 0.55);
      .svgIcon {
        color:  #007aff !important;
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