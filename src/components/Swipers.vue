<template>
  <div class="swiper" :style="{ width }">
    <a-carousel autoplay :arrows="arrows" :dots="dots">
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
      <div
        class="swiper-container"
        v-for="item in items"
        :key="item"
        @click="() => go(item?.href, item.id)"
      >
        <a :href="item?.href">
          <div class="content" :style="{ width, height }">
            <img
              v-show="item.picUrl"
              :src="item.picUrl"
              alt=""
              loading="lazy"
            />
            <img
              v-show="!item.picUrl"
              src="@/assets/img/test.jpg"
              alt=""
              loading="lazy"
            />
            <div v-if="showBottom" class="container" :class="position">
              <div class="title">
                {{ item.title }}
              </div>
            </div>
          </div>
        </a>
      </div>
    </a-carousel>
  </div>
</template>
<script>
import { Carousel } from 'ant-design-vue'
import SvgIcon from './SvgIcon.vue'
export default {
  name: 'Swipers',
  components: {
    ACarousel: Carousel,
    SvgIcon,
  },
  data() {
    return {
      defaultImg: '@/assets/test.png',
    }
  },
  methods: {
    go(href, id) {
      if (!href) this.$router.push({ name: '行业资讯详情', params: { id: id } })
    },
  },
  props: {
    items: {
      required: true,
      type: Array,
    },
    arrows: {
      type: Boolean,
      default: true,
    },
    dots: {
      type: Boolean,
      default: true,
    },
    showBottom: {
      type: Boolean,
      default: true,
    },
    // 轮播图宽度
    width: {
      type: String,
      default: '100%',
    },
    //轮播图高度
    height: {
      type: String,
      default: '100%',
    },
    //底部标题位置
    position: {
      type: String,
      default: 'left', // left || top
    },
  },
}
</script>
<style lang="scss" scoped>
.swiper-container {
  position: relative;
  &:hover {
    filter: brightness(1.05);
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
    display: flex;
    align-items: center;
    .title {
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
  .left {
    bottom: 0;
  }
  .top {
    width: 40%;
    height: 30px;
    bottom: 35px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
