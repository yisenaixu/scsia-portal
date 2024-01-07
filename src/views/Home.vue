<template>
  <div class="home">
    <Swipers 
          :showBottom="true"
            :items="slides"
            :arrows="false"
            :dots="true"
            position="top"
            height="70vh"
    />
    <div class="body">
      <div class="news">
        <div class="swiper">
          <Swipers 
            :showBottom="true"
            :items="news"
            :arrows="false"
            :dots="true"
            width="790px"
            height="400px"
          />
        </div>
        <div class="news-list">
          <div
            v-for="item in homeData.mainNews"
            :key="item"
            class="item"
            @click="
              () => {
                $router.push({ name: `${homeNewsNavis[0].title}详情`, params: { id: item.id } });
              }
            "
          >
            <div class="time">
              <div class="day">{{ item.time?.day }}</div>
              <div class="ym">
                <span>{{ item.time?.year }}</span
                >-<span>{{ item.time?.month }}</span>
              </div>
            </div>
            <div class="title-box">
              <div class="title">
                <button class="top" v-if="item.isTop">置顶</button>
                {{ item.title }}
              </div>
              <div class="description">{{ item.title }}</div>
            </div>
          </div>
          <div
            class="more"
            @mouseenter="isMoreHover = true"
            @mouseleave="isMoreHover = false"
            @click="$router.push({ path: this.main_url })"
          >
            更多
            <svg-icon
              :symbolId="isMoreHover ? 'icon-right' : 'icon-arrow-right'"
              className="svgIcon"
              color="black"
            ></svg-icon>
          </div>
        </div>
      </div>
      <div class="service">
        <div class="ser-container">
          <div class="ser-con-item button">加入软协</div>
          <div class="ser-con-item button">软件企业评估</div>
          <div class="ser-con-item button">软件产品评估</div>
          <div class="ser-con-item">
            <Block :news="homeData.subNews_1" :title="homeNewsNavis[1].title"></Block>
          </div>
          <div class="ser-con-item">
            <Block :news="homeData.subNews_2" :title="homeNewsNavis[2].title"></Block>
          </div>
          <div class="ser-con-item">
            <Block :news="homeData.subNews_3" :title="homeNewsNavis[3].title"></Block>
          </div>
        </div>
      </div>
      <div class="introduce-bg">
        <div class="item">
          <div class="count">504</div>
          <div class="title">普通会员</div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="count">106</div>
          <div class="title">理事单位</div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="count">38</div>
          <div class="title">常务理事单位</div>
        </div>
        <div class="line"></div>
        <div class="item">
          <div class="count">50</div>
          <div class="title">副理事单位</div>
        </div>
      </div>
      <div class="member">
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
          <div class="imgs" v-for="link in homeData.links" :key="link">
            <div class="container">
              <div class="img" v-for="item in link" :key="item.id">
                <a :href="item.url">
                  <img :src="item.src" alt="" />
                  <div class="name">{{ item.name }}</div>
                </a>
              </div>
            </div>
          </div>
        </a-carousel>
      </div>
    </div>
  </div>
</template>
<script >
import { Carousel } from "ant-design-vue";
import Block from "../components/Block.vue";
import SvgIcon from "../components/SvgIcon.vue";
import { mapActions, mapState } from "vuex";
import Swipers from '../components/Swipers.vue';
export default {
  components: { Block, ACarousel: Carousel, SvgIcon, Swipers },
  name: "home",
  computed: {
    ...mapState(["homeData", "homeNewsNavis"]),
    slides() {
      return this.homeData.slides?.map( slide => {
        return {
          id:slide.id,
          picUrl: slide.src,
          title: slide.title,
          href: slide.url,
        }
      })
    },
    news() {
      return this.homeData.mainNews?.map( news => {
        return {
          id: news.id,
          picUrl: news.detail.newsPic,
          title: news.title,
        }
      })
    }
  },
  methods: {
    ...mapActions([
      "fetchSubNews",
      "fetchMainNews",
      "fetchSlides",
      "fetchLinks",
    ]),
  },
  created() {
    console.log(this.$route);
    console.log(this.$router);
    this.fetchSlides();
    this.fetchMainNews();
    this.fetchSubNews();
    this.fetchLinks();
    this.main_url = this.$router
      .getRoutes()
      .find((item) => item.meta.id === this.homeNewsNavis[0].id).path;
  },
  data() {
    return {
      main_url: "",
      isMoreHover: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  margin-top: 50px;
  .body {
    margin: 36px auto;
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    .news {
      width: 100%;
      display: flex;
      user-select: none;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 36px;
      .swiper {
        position: relative;
        :deep(.slick-dots) {
          justify-content: right;
          margin-right: 20px;
        }
      }
    }
    .news-list {
      flex: 1;
      width: 360px;
      margin-left: 24px;
      position: relative;
      padding: 20px 0;
      .more {
        display: flex;
        align-items: center;
        position: absolute;
        font-size: 12px;
        font-weight: 500;
        right: 10px;
        bottom: 3px;
        cursor: pointer;
        &:hover {
          color: #389af0;
        }
      }
      .item {
        display: flex;
        justify-content: space-around;
        cursor: pointer;
        margin-bottom: 24px;
        width: 100%;
        // border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
        &:hover .title-box  {
          color: #72beff;
        }
        .title-box {
          width: 320px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            font-size: 20px;
            font-weight: 600;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            &:hover {
              color: #72beff;
            }
            .top {
              font-size: 10px;
              border: 1px solid red;
              color: red;
              background: white;
              padding: 2px 1px;
              transform: translateY(-4px);
            }
          }
          .description {
            font-size: 12px;
            font-weight: 200;
            text-indent: 10px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
        }
        .time {
          font-size: 14px;
          font-weight: 200;
          margin-right: 8px;
          box-sizing: border-box;
          height: 50px;
          width: 50px;
          background: #389af0;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          .day {
            font-size: 20px;
            font-weight: 600;
            color: white;
          }
          .ym {
            font-size: 12px;
            color: white;
          }
        }
      }
    }
  }
  .introduce-bg {
    width: 100%;
    padding: 24px;
    margin-top: 48px;
    background-image: url("@/assets/introduce-bg.png");
    display: flex;
    justify-content: space-around;
    align-items: center;
    .line {
      width: 1px;
      height: 100px;
      background: white;
    }
    .item {
      height: 120px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      color: white;
      .count {
        font-size: 32px;
        font-weight: 600;
      }
      .title {
        font-size: 14px;
      }
    }
  }
  .service {
    width: 100%;
    margin-top: 36px;
    .ser-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 36px;
      .button {
        height: 86px;
        background: #72beff;
        font-size: 28px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        &:hover {
          background: #389af0;
        }
      }
      .ser-con-item {
      }
    }
  }
  .member {
    margin-top: 48px;
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
          .name {
            text-align: center;
            margin-top: 8px;
            font-size: 14px;
            font-weight: 600;
            color: black;
          }
        }
      }
    }
  }
}
</style>
