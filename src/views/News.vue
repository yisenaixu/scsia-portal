<template>
  <div class="news">
    <div class="container">
      <div class="list"  v-show="!showDetail">
        <div
          v-for="item in list"
          :key="item"
          class="list-item"
          @click="
            () => {
              console.log(1);
              $router.push({ name: `${$route.name}详情`,params: {id:item.id}});
              console.debug('2222')
            }
          "
        >
          <div class="title">
            <img src="@/assets/icon-arrowsBlueRight.png" alt="" />
              {{ item.newsTitle }}
          </div>
          <div class="time">{{ formatTime(item.newsTime) }}</div>
        </div>
        <div v-if="total > 0" class="pagination">
          <a-pagination
            v-model:current="current"
            v-model:page-size="pageSize"
            show-quick-jumper
            :total="total"
            :show-total="(total) => `共有${total}条`"
            show-less-items
          />
        </div>
      </div>
      <router-view v-show="showDetail"></router-view>
    </div>
  </div>
</template>
<script>
import { getNews } from "../api/router";
import { Pagination } from "ant-design-vue";
export default {
  name: "News",
  components: { APagination: Pagination },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: "",
      list: [],
    };
  },
  computed: {
    showDetail() {
      return this.$route.params.id ? true : false
    },
  },
  methods: {
    formatTime(time) {
      return time.split(' ')[0];
    } 
  },
  watch: {
    current(newCur, oldCur) {
      if (newCur !== oldCur) {
        getNews(this.$route.meta.id, this.pageSize, newCur).then((res) => {
          console.debug(res.rows);
          this.list = res.rows;
          this.total = res.total;
        });
      }
    },
    pageSize(newPageSize, oldPageSize) {
      if (newPageSize !== oldPageSize) {
        getNews(this.$route.meta.id, newPageSize, this.current).then((res) => {
          console.debug(res.rows);
          this.list = res.rows;
          this.total = res.total;
        });
      }
    },
  },
  mounted() {
    console.debug(this.$route.meta.id);
    getNews(this.$route.meta.id).then((res) => {
      console.debug(res.rows);
      this.list = res.rows;
      this.total = res.total;
    });
  },
};
</script>

<style lang="scss" scoped>
.news {
  margin-top: 24px;
  .container {
    min-height: 600px;
    border: 1px solid rgba(0, 0, 0, 0.33);
    border-radius: 4px;
    box-sizing: border-box;
    padding: 8px 0;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    position: relative;
    .list {
      .list-item {
        padding: 12px 24px;
        padding-right: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px dotted rgba(0, 0, 0, 0.33);
        &:hover {
            color: #0a6fdb
          }
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 16px;
          font-weight: 300;
          cursor: pointer;
          flex: 6;
          display: flex;
          align-items: center;
          img {
            margin-right: 4px;
          }
        }
        .time {
          flex: 1;
          display: flex;
          justify-content: right;
          font-size: 12px;
          font-weight: 200;
        }
      }
    }
    .pagination {
      margin-top: 24px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
