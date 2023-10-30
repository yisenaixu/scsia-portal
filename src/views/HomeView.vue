<template>
  <div class="home">
    <swiper-slides :slides="slide" :arrows="true" :dots="true" :showBottom="false"></swiper-slides>
    <div class="body">
      <div class="news">
        <div class="swiper">
          <swiper-news
          :showBottom="true"
          :news="news"
          :arrows="false"
          :dots="true"
          class="normal"
          ></swiper-news>
        </div>
        <div class="news-list">
          <div v-for="item in news" :key="item" class="item"
          @click="
          () => {
            $router.push({ name: 'newsDetail', params: { id: item.id } })
            }"
            >
            <div class="time">
              <div class="day">{{ item.time?.day}}</div>
              <div class="ym"> <span>{{ item.time?.year}}</span>-<span>{{ item.time?.month }}</span></div>
            </div>
            <div class="title-box">
              <div class="title">{{ item.title }}</div>
              <div class="description">{{ item.title }}</div>
            </div>
          </div>
          <div class="more"
               @mouseenter="isMoreHover = true"
               @mouseleave="isMoreHover = false"
               @click="$router.push({path: this.main_url})">
               更多
            <svg-icon :symbolId="isMoreHover ? 'icon-right': 'icon-arrow-right'" className="svgIcon" color="black"></svg-icon>     
          </div>
        </div>
      </div>
      <div class="service">
        <div class="ser-container">
          <div class="ser-con-item button">加入软协</div>
          <div class="ser-con-item button">软件企业评估</div>
          <div class="ser-con-item button">软件产品评估</div>
          <div class="ser-con-item">
            <Block :news="sub_New[0]" ></Block>
          </div>
          <div class="ser-con-item">
            <Block :news="sub_New[1]"></Block>
          </div>
          <div class="ser-con-item">
            <Block :news="sub_New[2]"></Block>
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
          <div class="imgs" v-for="src in news" :key="src">
            <div class="container">
              <div class="img">
                <img src="@/assets/test.jpg" alt="" />
              </div>
              <div class="img">
                <img src="@/assets/test.jpg" alt="" />
              </div>
              <div class="img">
                <img src="@/assets/test.jpg" alt="" />
              </div>
              <div class="img">
                <img src="@/assets/test.jpg" alt="" />
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
import SwiperNews from "../components/SwiperNews.vue";
import SwiperSlides from "../components/SwiperSlides.vue";
import SvgIcon from "../components/SvgIcon.vue";
import { fetchMainNewsList, fetchSubNewsList, homeNaviIds } from "../utils/home";
import { getSlides } from '../api/router';
export default {
  components: { SwiperNews, Block, ACarousel: Carousel,SvgIcon, SwiperSlides },
  name: "home",
  async mounted() {
    console.log(this.$route);
    console.log(this.$router);
    // fetchMainNewsList().then(res => this.news = res);
    console.debug(this.sub_New.length);
    getSlides().then(res => {
      console.debug(res);
      this.slide = res.rows.map( item => {
        return {
          url: item.slidUrl,
          src: item.slidPic,
          id: item.id
        }
      })
    })
    if(this.sub_New.length === 0) {
    this.news = await fetchMainNewsList();
    Promise.all([fetchSubNewsList(homeNaviIds['sub_1']),
                                       fetchSubNewsList(homeNaviIds['sub_2']),
                                       fetchSubNewsList(homeNaviIds['sub_3'])]).then(
                                         res => {
                                          console.debug(res);
                                          this.sub_New = res;
                                         }
                                       );
    }
    console.debug(this.sub_New)
    this.main_url = this.$router.getRoutes().find(item => item.meta.id === homeNaviIds['main']).path;
    console.debug(this.main_url);
  },
  data() {
    return {
      slides: [],
      news: [{}, {}, {}, {}, {},],
      sub_New: [],
      main_url: '',
      isMoreHover: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
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
            color:#389af0;
          }
        }
        .item {
          display: flex;
          justify-content: space-around;
          cursor: pointer;
          margin-bottom: 24px;
          width: 100%;
          // border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
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
      background-image: url('@/assets/introduce-bg.png');
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
          display: flex;
          justify-content: space-around;
          .img {
            width: 20%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

</style>
