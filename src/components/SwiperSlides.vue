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
        <div class="swiper-news" v-for="item in slides" :key="item">
            <a :href='item?.url'>
              <img v-if="item?.src" :src="item?.src" alt="" loading="lazy"/>
              <img v-if="!item?.src" src="@/assets/test.jpg" alt="" loading="lazy"/>
              <div class="container">
              <div class="swiper-news-item">
                {{ item?.title }}
              </div>
            </div>
            </a>
        </div>
      </a-carousel>
    </div>
  </div>
</template>
<script>
import { Carousel } from "ant-design-vue";
import SvgIcon from "./SvgIcon.vue";
export default {
  name: "SwiperSlides",
  components: {
    ACarousel: Carousel,
    SvgIcon,
  },
  data() {
    return {
      defaultImg: '@/assets/test.png'
    }
  },
  mounted() {
    console.debug('side',this.slides)
  },
  props: ["slides", "arrows", "dots"],
};
</script>
<style lang="scss" scoped>
.my-swiper { 
   height: 70vh;
  .swiper {
    width: 100%;
    height: 100%;
    :deep(.slick-slide > div) {
      height: 70vh;
      overflow: hidden;
    }
  }
}
.swiper-news {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .container {
    width: 40%;
    height: 30px;
    background: rgba($color: #000000, $alpha: 0.5);
    position: absolute;
    bottom: 35px;
    left: 50%;
    transform: translateX(-50%);
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