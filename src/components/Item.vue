<template>
   <div class="title">
     <img src="@/assets/icon-arrowsBlueRight.png" alt="" />
     <div v-html="item.newsTitle"></div>
     <button class="top" v-if="item.newsIsTop">置顶</button>
   </div>
   <div class="time">{{ formatTime(item.newsTime) }}</div> 
</template>
<script>
export default {
  name: 'item',
  props: {
    item: {
      type: Object,
      requried: true,
    }
  },
  methods: {
    formatTime(time) {
      return time.split(' ')[0];
    } 
  },
}
</script>
<style lang="scss" scoped>
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 16px;
          font-weight: 300;
          cursor: pointer;
          flex: 6;
          display: flex;
          align-items: center;
          img {
            margin-right: 4px;
          }
          .top {
          font-size: 10px;
          border: 1px solid red;
          color: red;
          background: white;
          padding: 2px 1px;
          margin-left: 4px;
        }
        }
        .time {
          flex: 1;
          display: flex;
          justify-content: right;
          font-size: 12px;
          font-weight: 200;
        }
</style>