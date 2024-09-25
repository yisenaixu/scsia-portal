<template>
  <div
    class="nav-button"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="extar-buttons" v-if="routeUrl.length !== 0">
      <div
        class="extar-buttons-item"
        v-show="isHover"
        v-for="u in urls"
        :key="u.title"
      >
        <a v-if="u.type === 'out'" :href="u.url" target="_blank">{{
          u.title
        }}</a>
        <router-link v-if="u.type === 'in'" :to="`${routeUrl}/${u.url}`">
          {{ u.title }}
        </router-link>
      </div>
    </div>
    <div class="button">
      <a v-if="type === 'out'" :href="routeUrl" target="_blank">
        {{ routeName }}
      </a>
      <router-link v-else class="link" :to="routeUrl">
        {{ routeName }}
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavButton',
  props: ['routeName', 'routeUrl', 'urls', 'type'],
  data() {
    return {
      isHover: false,
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.nav-button {
  // padding: 24px;
  font-size: 18px;
  font-weight: 600;
  z-index: 999;
  position: relative;
  .button {
    position: relative;
    user-select: none;
    cursor: pointer;
    min-width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      color: #000;
    }
    // border-bottom: 1px solid black;

    &:hover a {
      color: #007aff;
    }
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      right: 50%;
      bottom: 0;
      border-bottom: 4px solid #007aff;
      transition: all 0.5s;
    }
    &:hover::after {
      left: 25%;
      right: 25%;
    }
  }
  .extar-buttons-item {
    background: rgba(255, 255, 255, 0.8);
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

    &:hover a {
      font-weight: 600;
      color: #007aff;
    }
  }
  .extar-buttons {
    padding-top: 40px;
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
