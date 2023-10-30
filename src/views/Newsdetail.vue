<template>
    <div class="newsDetail">
        {{ console.log($route)
         }}
         <div class="title">{{ newsDetail?.newsTitle }}</div>
         <div class="time">发布时间: {{ newsDetail?.newsTime }}</div>
         <div v-html="htmlRegex"></div>
    </div>
</template>
<script>
import { transformHtml} from '../utils/common'
import { getSingleNews } from '../api/router';
export default {
    name: 'newsDetail',
    data() {
      return {
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
      })
    },
}
</script>
<style lang="scss" scoped>
  .newsDetail {
    margin: 0 auto;
    margin-top: 70px;
    width: 100%;
    padding: 8px;
    max-width: 1280px;
    .title {
      font-size: 32px;
      font-weight: 600;
      text-align: center;
    }
    .time {
      font-size: 14px;
      font-weight: 200;
      text-align: center;
      margin-top: 16px;
    }
  }
</style>