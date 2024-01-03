<template>
    <div class="newsDetail" v-if="isLoad">
         <div class="title">{{ newsDetail?.newsTitle }}</div>
         <div class="time"> 发布时间:{{ newsDetail?.newsTime?.split(' ')[0] }}</div>
         <div v-html="htmlRegex" class="html"></div>
    </div>
</template>
<script>
import { transformHtml} from '../utils/common'
import { getSingleNews } from '../api/router';
export default {
    name: 'newsDetail',
    data() {
      return {
        isLoad: false,
        newsDetail: ''
      }
    },
    computed: {
        htmlRegex() {
          return transformHtml(this.newsDetail?.newsContent);
      }
    },
    mounted() {
      window.scrollTo(0, 0);
      console.debug('mounted');
        getSingleNews(this.$route.params.id).then(res => {
         console.log(res);
         this.newsDetail = res.data
         this.isLoad = true
      })
    },
}
</script>
<style lang="scss" scoped>
  .newsDetail {
    margin: 0 auto;
    width: 100%;
    padding: 8px;
    .title {
      font-size: 32px;
      font-weight: 600;
      text-align: center;
    }
    .time {
      font-size: 14px;
      font-weight: 200;
      text-align: center;
      margin: 16px 0;
    }
    .html {
      :deep(p) {
        text-indent: 2em;
      }
    }
  }
</style>