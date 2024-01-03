<template>
  <header>
      <Nav></Nav>
  </header>
  <router-view v-if="$route.meta.keepAlive" v-slot="{ Component } " :key="$route.path"> 
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
  </router-view>
<div v-if="!$route?.meta.keepAlive" class="body">
  <router-view ></router-view>
</div>
  <Footer></Footer>
  <a-back-top />
</template>

<script >
import { RouterLink, RouterView } from 'vue-router'
import NavButton from './components/NavButton.vue';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import { BackTop } from 'ant-design-vue';
export default {
  name: 'app',
  components: { NavButton, Nav, Footer, ABackTop:BackTop },
  mounted() {
    console.log(this.$route.path);
 }
}
</script>


<style lang="scss" scoped>

.body {
  padding: 0 10vw;
  position: relative;
  min-height:  calc(100vh - 64px);
  // box-sizing: border-box;
  margin-top: 64px;
  display: flex;
  justify-content: center;
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
