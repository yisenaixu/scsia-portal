<template>
  <div class="search">
    <div class="ba-img">
        <img src="@/assets/img/banner.png" alt="">
      </div>
    <div class="container">
      <LeftSider 
        title="全局搜索" 
        :to="$route.path" 
        :links="links"
        :handleClick="handleClick"
      >
      <div class="nav search-nav">
             当前搜索
             <div class="nav-search" :class="{active:inputFocus}">
              <svg-icon symbolId="icon-search" className="svgIcon" color="black"></svg-icon>
              <div class="search"> 
                <input 
                  v-model="value" 
                  type="text" 
                  @keyup.enter="() => handleSearch()"
                  @blur="inputFocus = false"
                  @focus="inputFocus = true" 
                  >
             </div>
            </div>
        </div>
      </LeftSider>
      <div class="info">
        <div class="crumb-nav">
          <router-link class="crumb-nav-home" to="/">
            <svg-icon symbolId="icon-home" className="svgIcon"></svg-icon> 首页</router-link>
            &nbsp;
            >
            &nbsp;
          <div class="crumb-nav-item">
            <span  class="active">搜索</span>
          </div>
         </div>
        <router-view v-if="hasResult" :key="$route.query.key"></router-view>
        <div v-else class="noRes">
          <svg-icon symbolId="icon-search" className="svgIcon" color="black"></svg-icon>
          没有找到相关新闻
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { search } from "../api/router";
import SvgIcon from "../components/SvgIcon.vue";
import LeftSider from '../components/LeftSider.vue';
export default {
  name: "search",
  components: {SvgIcon, LeftSider},
  mounted() {
    search(this.$route.query.key).then((res) => {
      console.log(res);
      this.hasResult = res.data.length > 0; 
      this.highLight(res.data);
      this.setSearchList(this.classLists[this.$route.params.path])
    });
  },
  data() {
    return {
      list: [],
      isShow: false,
      inputFocus: false,
      hasResult: true,
      value: this.$route.query.key,
    };
  },
  computed: {
    ...mapState(['searchResult']),
    rex() {
      return new RegExp(this.$route.query.key, "g");
    },
    classLists() {
      return  this.list.reduce((classLists, list) => {
          if (!classLists[list.naviName]) {
            classLists[list.naviName] = [];
          }
          classLists[list.naviName].push(list);
          return classLists;
        }, {})
    },
    navs() {
      return Object.keys(this.classLists)
    },
    active() {
      return this.$route.path.includes(nav)
    },
    links() {
      return this.navs.map(item => {
        return {
          title: item,
          to: `/search/${item}?key=${this.$route.query.key}`
        }
      })
    }
  },
  methods: {
    ...mapMutations(['setSearchList','setSearchResult']),
    handleSearch() {
      if(this.value) {
        search(this.value).then((res) => {
         this.setSearchResult(res.data)  
         this.setSearchList([])
         this.setSearchList(this.classLists[this.$route.params.path])
         this.$router.push({path: `/search/${res.data[0]?.naviName}`,query:{key:this.value}})
       });
      }
    },
    handleClick(nav) {
      this.setSearchList(this.classLists[nav])
    },
    formatTime(time) {
      return time.split(" ")[0];
    },
    highLight(data) {
      console.debug("highlight");
      console.debug(this.$route.query.key);
      console.debug(data)
      this.list = data.map((item) => {
        item.newsTitle = item.newsTitle.replace(
          this.rex,
          `<span style="color: red">${this.$route.query.key}</span>`
        );
        return item;
      });
      console.debug(this.list)
    },
  },
  watch: {
    "$route.query.key"(val) {
      console.debug(val);
      this.value = val
      search(this.$route.query.key).then((res) => {
        console.log(res);
        this.hasResult = res.data.length > 0;
        this.highLight(res.data);
        this.setSearchList([])
        this.setSearchList(this.classLists[this.$route.params.path])
      });
    },
    "$route.params.path"(val) {
      this.setSearchList(this.classLists[this.$route.params.path])
    }
  },
};
</script>

<style lang="scss" scoped>
.search {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  .noRes {
    margin-top: 24px;
    min-height: 600px;
    border: 1px solid rgba(0, 0, 0, 0.33);
    border-radius: 4px;
    box-sizing: border-box;
    padding: 8px 0;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ba-img {
    left: 0;
    width: 100%;
    position: absolute;
    z-index: 0;
    img {
      width:100%;
      height: 160px;
    }
  }
  .container {
    display: flex;
    justify-content: space-around;
    // align-items: center;
    margin-top: 130px;
    .info {
        margin-top: 30px;
        width: 80%;
        min-height: 600px;
        position: relative;;
        .crumb-nav {
          display: flex;
          align-items: center;
          position: absolute;
          top: 2px;
          left: 4px;
          font-size: 14px;
          font-weight: 200;
          .crumb-nav-home {
            display: flex;
            align-items: center;
          }
          .crumb-nav-item {
            .active {
            color: #1538D6;
          }
          }
        }
    }
      .nav {
        cursor: pointer;
        padding: 16px 16px;
        text-align: center;
        font-size: 16px;
        border-bottom: 1px solid rgba($color: #fff, $alpha: .7);
        transition: .3s;
        position: relative;
        &:hover {
          background: #fff;
        }
        .icon {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          transition: all 1.1s;
        } 
      }
      .search-nav {
        font-size: 18px;
        font-weight: 600;
        &:hover {
          background: #f2f2f2;
        }
        cursor: default;
        .active {
      background: rgba(189, 207, 255, 0.55);
      .svgIcon {
        color:  #007aff !important;
      }
    }
        .nav-search {
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0 8px;
        margin-top: 4px;
        background: rgba(189, 207, 255, 0.28);
        border-radius: 8px;
        .search{
          margin-left: 8px;
          input {
             width: 80px;
             font-size: 16px;
             font-weight: 500;
             border: none;
             background: transparent;
             &:focus-visible {
              outline: none;
             }
         }
      } 
    }
      }
      .active {
        background: #fff;
        .icon {
          transform: translateY(-50%) rotateY(180deg);
        } 
      }
      .big {
        font-size: 22px;
        font-weight: 600;
        background: #0a6fdb;
        display: flex;
        cursor: default;
        justify-content: space-around;
        align-items: center;
        color: white;
        &:hover {
          background: #0a6fdb;
        }
      }
    }
  }
</style>