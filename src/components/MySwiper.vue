<template>
  <div class="my-swiper">
    <div class="swiper">
      <a-carousel
        autoplay
        :arrows="arrows"
        :dots="dots"
      >
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
        <div class="swiper-news" v-for="item in news" :key="item">
          <img v-if="item.detail?.newsPic" :src="item.detail?.newsPic" alt="" />
          <img v-if="!item.detail?.newsPic" src="@/assets/test.jpg" alt="" />
          <div v-if="showBottom" class="container">
            <div class="swiper-news-item">
              {{ item.title }}
              {{ console.debug("11",item) }}
              {{ console.debug(news.length) }}
            </div>
          </div>
        </div>
      </a-carousel>
    </div>
  </div>
</template>
<script>
import { Carousel } from "ant-design-vue";
import SvgIcon from "./SvgIcon.vue";
export default {
  name: "mySwiper",
  components: {
    ACarousel: Carousel,
    SvgIcon,
  },
  data() {
    return {
      defaultImg: '@/assets/test.png'
    }
  },
  props: ["news", "arrows", "dots",'showBottom'],
};
</script>
<style lang="scss" scoped>
.my-swiper { 
   height: 700px;
  .swiper {
    width: 100%;
    height: 100%;
    :deep(.slick-slide > div) {
      height: 700px;
      overflow: hidden;
    }
  }
}
.normal {
  width: 790px;
  height: 400px;
  flex-shrink: 1;
  .swiper {
    width: 100%;
    height: 100%;
    :deep(.slick-slide > div) {
      height: 400px;
      overflow: hidden;
    }
  }
}
.swiper-news {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  &:hover {
    filter: brightness(1.11);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .container {
    width: 100%;
    height: 50px;
    background: rgba($color: #000000, $alpha: 0.5);
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    .swiper-news-item {
      height: 20px;
      padding-left: 16px;
      padding-right: 35%;
      color: white;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}
</style>