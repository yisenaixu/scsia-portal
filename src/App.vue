<template>
  <header>
      <Nav></Nav>
  </header>
  <router-view v-if="$route.meta.keepAlive" v-slot="{ Component } " :key="$route.path"> 
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
  <router-view v-if="!$route?.meta.keepAlive" :key="$route.path"></router-view>
  <Footer></Footer>
</template>

<script >
import { RouterLink, RouterView } from 'vue-router'
import NavButton from './components/NavButton.vue';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
export default {
  name: 'app',
  components: { NavButton, Nav, Footer },
  mounted() {
    console.log(this.$route.path);
 }
}
</script>


<style lang="scss" scoped>

.animate__animated.animate__fadeInLeft {
  --animate-duration: .9s;
}
.body {
  padding:  16px 10vw;
  position: relative;
  min-height:  calc(100vh - 85px);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #000
}
nav {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 5vw;
  background: #000;
  .icon {
    flex: 1;
    display: flex;
    justify-content: left;
    align-items: center;
    // background: #fff;
  }
  .links {
    flex: 1;
    display: flex;
    justify-content: right;
    align-items: center;
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
