<template>
  <Nav></Nav>
  <div class="body">
    <router-view
      v-if="$route.meta.keepAlive"
      v-slot="{ Component }"
      :key="$route.path"
    >
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <router-view v-if="!$route?.meta.keepAlive"></router-view>
  </div>
  <Footers />
  <a-back-top />
</template>

<script>
import NavButton from './components/NavButton.vue'
import Nav from './components/Nav.vue'
import Footers from './components/Footers.vue'
import { BackTop } from 'ant-design-vue'
export default {
  name: 'app',
  components: { NavButton, Nav, Footers, ABackTop: BackTop },
}
</script>

<style lang="scss" scoped>
.body {
  position: relative;
  min-height: calc(100vh - 64px);
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}
</style>
