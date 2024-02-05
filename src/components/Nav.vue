<template>
  <div class="nav-top">
    <div class="nav-left">
      <div class="img">
        <img src="@/assets/img/logo1.png" alt="" />
      </div>
    </div>
    <div class="nav-right">
      <div class="login-button">
        <button>
          <a href="http://man.dkelab.cn/login">登录</a>
        </button>
        <button>
          <a href="http://man.dkelab.cn/register">注册</a>
        </button>
      </div>
      <div class="nav-search" :class="{ active: inputFocus }">
        <svg-icon
          symbolId="icon-search"
          className="svgIcon"
          color="black"
        ></svg-icon>
        <div class="search">
          <input
            v-model="value"
            type="text"
            placeholder="搜索"
            @keyup.enter="() => handleSearch()"
            @blur="inputFocus = false"
            @focus="inputFocus = true"
          />
        </div>
      </div>
    </div>
  </div>
  <div
    class="nav-bottom"
    @mouseenter="$refs.bg.style.height = `${maxNavChildrenHeight * 45}px`"
    @mouseleave="$refs.bg.style.height = 0"
  >
    <div class="container">
      <nav-button
        v-for="nav in navs"
        :key="nav"
        :routeName="nav.title"
        :routeUrl="nav.url"
        :urls="nav?.children"
      ></nav-button>
      <div ref="bg" :class="{ bg: true, bgHover: isShow }"></div>
    </div>
  </div>
</template>
<script>
import SvgIcon from './SvgIcon.vue'
import NavButton from './NavButton.vue'
import { mapMutations, mapState } from 'vuex'
import { search } from '../api/router'
export default {
  components: { NavButton, SvgIcon },
  name: 'Nav',
  data() {
    return {
      value: '',
      isShow: false,
      inputFocus: false,
      show: '',
    }
  },
  computed: {
    ...mapState(['navs']),
    maxNavChildrenHeight() {
      return this.navs.reduce((max, cur) => {
        const length = cur?.children?.length ?? 0
        return length > max ? length : max
      }, 0)
    },
  },
  methods: {
    ...mapMutations(['setSearchResult', 'setSearchList']),
    handleSearch() {
      console.log(this.value)
      if (this.value) {
        search(this.value).then(res => {
          this.setSearchResult(res.data)
          this.$router.push({
            path: `/search/${res.data[0]?.naviName}`,
            query: { key: this.value },
          })
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.nav-top {
  position: relative;
  display: flex;
  padding: 0 17vw;
  @media screen and (min-width: 1440px) {
    padding: 0 15vw;
  }
  justify-content: center;
  height: 100px;
}
.nav-left,
.nav-right {
  flex: 1;
  display: flex;
  align-items: center;
}
.nav-left {
  justify-content: start;
  .img {
    height: 65px;
    width: 340px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.nav-bottom {
  position: -webkit-sticky;
  position: sticky;
  z-index: 9999;
  height: 40px;
  width: 100%;
  top: 0;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background: rgba(244, 244, 244, 1);
  .container {
    display: flex;
    justify-content: center;
    width: 100%;
    .bg {
      position: absolute;
      width: 100%;
      height: 0;
      top: 40px;
      transition: height 0.4s;
      background: rgba(255, 255, 255, 0.8);
    }
    .bgHover {
      height: 400px;
    }
  }
}
.nav-right {
  justify-content: end;
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
    .search {
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
      color: #007aff !important;
    }
  }
}
</style>
