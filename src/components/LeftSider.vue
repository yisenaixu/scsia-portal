<template>
  <div class="rightSider">
    <Link classNames="big" :title="title" :to="to" />
    <slot></slot>
    <Link
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      :title="link.title"
      :classNames="
        $route.meta.title === link.title ||
        decodeURIComponent($route.path).includes(link.title)
          ? 'active'
          : ''
      "
      @click="() => handleClick(link.title)"
    />
  </div>
</template>
<script>
import Link from './Link.vue'
export default {
  name: 'leftSider',
  props: {
    title: {
      type: String,
    },
    to: {
      type: String,
    },
    links: {
      type: Object,
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
  components: { Link },
}
</script>
<style lang="scss" scoped>
.rightSider {
  width: 15%;
  min-width: 180px;
  background: #f2f2f2;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
