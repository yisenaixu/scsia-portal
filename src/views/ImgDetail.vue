<template>
  <div class="imgDetail" v-if="isLoad">
    <div class="title">{{ imgDetail?.picTitle }}</div>
    <div class="imgs-layout">
      <a-carousel autoplay :dots="false" :arrows="true">
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
            <svg-icon
              symbolId="icon-arrow-left"
              className="swiperIcon"
            ></svg-icon>
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <svg-icon
              symbolId="icon-arrow-right"
              className="swiperIcon"
            ></svg-icon>
          </div>
        </template>
        <div class="imgs" v-for="img in imgs" :key="img">
          <div class="container">
            <div class="img" v-for="item in img" :key="item.id">
              <img :src="item" alt="" />
            </div>
          </div>
        </div>
      </a-carousel>
    </div>
    <div v-html="htmlRegex" class="html"></div>
  </div>
</template>
<script>
import { transformHtml } from '../utils/common'
import { getPicContent } from '../api/router'
import { Carousel } from 'ant-design-vue'
export default {
  name: 'imgDetail',
  data() {
    return {
      isLoad: false,
      imgDetail: '',
    }
  },
  computed: {
    htmlRegex() {
      return transformHtml(this.imgDetail?.picContent)
    },
    imgs() {
      let links = this.imgDetail.picUrl?.split(',')
      let imgs = []
      for (let i = 0; i < links.length; i += 4) {
        imgs.push(links.slice(i, i + 4))
      }
      return imgs
    },
  },
  mounted() {
    getPicContent(this.$route.params.id).then(res => {
      this.imgDetail = res.data
      this.isLoad = true
    })
  },
  components: { ACarousel: Carousel },
}
</script>
<style lang="scss" scoped>
.imgDetail {
  margin: 16px auto;
  width: 100%;
  padding: 8px;
  .title {
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 12px;
  }
  .imgs-layout {
    width: 100%;
    .imgs {
      .container {
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(4, 1fr);
        padding: 0 40px;
        .img {
          width: 100%;
          img {
            width: 100%;
            height: 80%;
            object-fit: contain;
          }
        }
      }
    }
  }
  .time {
    font-size: 14px;
    font-weight: 200;
    text-align: center;
    margin: 16px 0;
  }
  .html {
    :deep(p),
    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4),
    :deep(h5),
    :deep(h6) {
      text-indent: 2em;
    }
  }
}
</style>
