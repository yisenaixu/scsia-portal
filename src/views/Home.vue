<template>
  <div class="home">
    <Swipers
      :showBottom="true"
      :items="slides"
      :arrows="true"
      :dots="true"
      position="top"
      height="42vh"
    />
    <div class="body">
      <div class="news">
        <div class="swiper">
          <Swipers
            :showBottom="true"
            :items="news"
            :arrows="false"
            :dots="true"
            width="28em"
            height="20em"
          />
        </div>
        <div class="right">
          <div class="news-tab" style="height: 50px">
            <template v-for="(navi, index) in homeNewsNavis" :key="navi.title">
              <div
                class="tab"
                v-if="index < 4"
                :class="{ active: currentTab === navi.title }"
                @click="currentTab = navi.title"
              >
                {{ navi.title }}
              </div>
            </template>
          </div>
          <div class="news-list">
            <div
              v-for="item in homeData[currentTab]"
              :key="item"
              class="news-item-layout"
              @click="
                () => {
                  $router.push({
                    name: `${currentTab}详情`,
                    params: { id: item.id },
                  })
                }
              "
            >
              <div class="news-item-content">
                <div class="time">
                  <div class="day">{{ item.time?.day }}</div>
                  <div class="ym">
                    <span>{{ item.time?.year }}</span
                    >-<span>{{ item.time?.month }}</span>
                  </div>
                </div>
                <div class="tit">
                  <div class="text">
                    <button class="top" v-if="item.isTop">置顶</button>
                    {{ item.title }}
                  </div>
                  <div class="button">查看</div>
                </div>
              </div>
            </div>
            <!-- <div
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
          </div> -->
          </div>
        </div>
      </div>
      <div class="service">
        <div class="ser-container">
          <a href="http://man.dkelab.cn/login">
            <div class="ser-con-item button">加入软协</div>
          </a>
          <div
            class="ser-con-item button"
            @click="$router.push('/softwareService/evaluation_1')"
          >
            软件企业评估
          </div>
          <div
            class="ser-con-item button"
            @click="$router.push('/softwareService/evaluation_2')"
          >
            软件产品评估
          </div>
          <!-- <div class="ser-con-item">
            <Block
              :news="homeData.subNews_1"
              :title="homeNewsNavis[1].title"
            ></Block>
          </div>
          <div class="ser-con-item">
            <Block
              :news="homeData.subNews_2"
              :title="homeNewsNavis[2].title"
            ></Block>
          </div>
          <div class="ser-con-item">
            <Block
              :news="homeData.subNews_3"
              :title="homeNewsNavis[3].title"
            ></Block>
          </div> -->
        </div>
      </div>
      <div class="introduce-bg">
        <template v-for="(vip, index) in vips" :key="index">
          <div class="item">
            <div class="count">{{ vip.count }}</div>
            <div class="title">{{ vip.name }}</div>
          </div>
          <div class="line" v-if="index !== vips.length - 1"></div>
        </template>
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
<script>
import { Carousel } from 'ant-design-vue'
import SvgIcon from '../components/SvgIcon.vue'
import { mapActions, mapState } from 'vuex'
import Swipers from '../components/Swipers.vue'
import { getVips } from '../api/router'
export default {
  components: { ACarousel: Carousel, SvgIcon, Swipers },
  name: 'home',
  computed: {
    ...mapState(['homeData', 'homeNewsNavis']),
    slides() {
      return (
        this.homeData.slides?.map(slide => {
          return {
            id: slide.id,
            picUrl: slide.src,
            title: slide.title,
            href: slide.url,
          }
        }) ?? []
      )
    },
    news() {
      return this.homeData[this.homeNewsNavis[0].title]?.map(news => {
        return {
          id: news.id,
          picUrl: news.picUrl,
          title: news.title,
        }
      })
    },
  },
  methods: {
    ...mapActions(['fetchNews', 'fetchSlides', 'fetchLinks']),
  },
  created() {
    this.currentTab = this.homeNewsNavis[0].title
    this.fetchSlides()
    this.fetchNews()
    this.fetchLinks()
    getVips().then(res => {
      this.vips = res.data
        .sort((a, b) => {
          return a.type - b.type
        })
        .map(i => ({
          name: this.vipTypes[i.type],
          count: i.count,
        }))
    })
    this.main_url = this.$router
      .getRoutes()
      .find(item => item.meta.id === this.homeNewsNavis[0].id).path
  },
  data() {
    return {
      main_url: '',
      isMoreHover: false,
      currentTab: undefined,
      vipTypes: {
        1: '会员单位',
        2: '理事会员',
        3: '常务理事单位',
        4: '副理事长单位',
      },
      vips: [],
    }
  },
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  font-size: 13px;
  @media screen and (min-width: 1440px) {
    font-size: 14px;
  }
  @media screen and (min-width: 1660px) {
    font-size: 18px;
  }
  .body {
    margin: 48px auto;
    padding: 0 17vw;
    @media screen and (min-width: 1440px) {
      padding: 0 15vw;
    }
    width: 100%;
    display: flex;
    flex-direction: column;
    .news {
      width: 100%;
      display: flex;
      user-select: none;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 1.5em;
      .swiper {
        position: relative;
        :deep(.slick-dots) {
          justify-content: right;
          margin-right: 20px;
        }
      }
    }
    .right {
      flex: 1;
      margin-left: 24px;
      .news-tab {
        display: flex;
        align-items: start;
        .tab {
          display: flex;
          margin-right: 1em;
          justify-content: start;
          cursor: pointer;
          align-items: center;
          height: 32px;
          border-radius: 32px;
          padding: 2px 1.5em;
          background: rgba(244, 244, 244, 0.8);
          &:hover {
            background: rgba(189, 207, 255, 0.28);
          }
        }
        .active {
          background: #007aff;
          color: white;
          &:hover {
            background: #007aff;
            color: white;
          }
        }
      }
      .news-list {
        position: relative;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1.5em 2em;
        /* .more {
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
      } */
        .news-item-layout {
          justify-content: space-around;
          padding: 1.1em;
          width: 100%;
          cursor: pointer;
          background: rgba(244, 244, 244, 0.8);
          &:hover {
            background: rgba(189, 207, 255, 0.28);
          }
          .news-item-content {
            display: flex;
            .tit {
              flex: 1;
              margin-left: 12px;
              height: 4em;
              .text {
                .top {
                  height: 14px;
                  line-height: 14px;
                  font-size: 10px;
                  border: 1px solid red;
                  color: red;
                  background: white;
                  padding: 0 1px;
                }
                line-height: 1.4;
                height: 3em;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              .button {
                text-align: right;
                font-weight: 100;
                opacity: 0.7;
              }
            }
            .time {
              font-weight: 200;
              margin-right: 8px;
              box-sizing: border-box;
              height: 4em;
              width: 4em;
              background: #389af0;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
              .day {
                font-size: 1.5em;
                font-weight: 400;
                color: white;
              }
              .ym {
                font-size: 0.8em;
                color: white;
              }
            }
          }
        }
      }
    }
  }
  .introduce-bg {
    width: 100%;
    padding: 24px;
    margin-top: 2em;
    background-image: url('@/assets/img/introduce-bg.png');
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
    margin-top: 2em;
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
    }
  }
  .member {
    margin-top: 3em;
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
            font-weight: 600;
            color: black;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
