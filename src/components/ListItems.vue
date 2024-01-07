<template>
  <div class="list">
    <div
          v-for="item in list"
          :key="item"
          class="list-item"
          @click="
            () => {
              $router.push({ name: `${$route.name}详情`,params: {id:item.id},query: {key: $route.query.key}});
            }
          "
        >
      <Item :item="item" />    
    </div>
  </div>    
</template>
<script>
import Item from './Item.vue';
export default {
    name: 'listItems',
    components: {Item},
    props: {
      list: {
        type: Array,
        requried: true
      },
    },
}
</script>
<style lang="scss" scoped>
.list {
      .list-item {
        padding: 12px 24px;
        padding-right: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dotted rgba(0, 0, 0, 0.33);
        &:hover {
            color: #0a6fdb
          }
          &:last-child {
          border: none;
        }
    }
}
</style>