<template>
    <div class="newsDetail" v-if="isLoad">
         <div class="title">{{ newsDetail?.newsTitle }}</div>
         <div class="time"> 发布时间:{{ newsDetail?.newsTime?.split(' ')[0] }}</div>
         <div v-html="htmlRegex" class="html"></div>
         <div class="attach">
           <div class="title"> 附件:</div>
           <div v-for="at in attachments" :key="at.url">
            <a :href="`/dev-api${at.url}`" download >
               {{ at.name }}  
            </a>
           </div>
         </div>
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
      },
       attachments() {
        return JSON.parse(this.newsDetail.newsAttachment)
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
    .attach {
      margin-left: 24px;
      .title {
        font-size: 16px;
        font-weight: 200;
        text-align: left;
        margin-bottom: 8px;
      }
      a {
        margin-left: 4px;
        font-size: 14px;
        color: rgba(0,0,0,.5);
      }
    }
  }
</style>