<template>
  <div class="about">
    <div class="container">
      <div class="title">{{ title }}</div>
      <div v-html="htmlRegex"></div>
    </div>
  </div>
</template>
<script>
import { getAbout } from '../api/router';
import { transformHtml } from '../utils/common';
export default {
  name: 'About',
  data() {
    return {
      html: '',
      title: '',
    }
  },
  computed: {
    htmlRegex() {
      return transformHtml(this.html);
    },
  },
  mounted() {
    console.debug(this.$route.meta.id);
    getAbout(this.$route.meta.id).then(res => {
      console.debug(res.data);
      this.html = res.data?.abouContent;
      this.title = res.data?.abouTitle
    })
  },
}
</script>

<style lang="scss" scoped>

  .about {
    color: #000;
    margin-top: 24px;
    min-height: 600px;
    // border: 1px solid rgba(0, 0, 0, .2);
    .container {
      padding: 4px;
      .title {
        text-align: center;
        font-size: 24px;
        font-weight: 600;
      }
    }
  }
</style>
