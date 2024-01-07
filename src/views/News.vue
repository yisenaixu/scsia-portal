<template>
  <div class="news">
    <div class="container">
      <div class="content"  v-show="!showDetail">
        <ListItems :list="newsList" />
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
import ListItems from "../components/ListItems.vue";
import { mapState } from 'vuex';
export default {
  name: "News",
  components: { APagination: Pagination, ListItems },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: "",
      isSearch: false,
      list: [],
    };
  },
  computed: {
    ...mapState(['searchList']),
    newsList() {
      return this.isSearch ?  this.searchList : this.list 
    },
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
    if(!this.$route.meta.id) {
      this.isSearch = true
      console.debug(this.searchList)
    } else {
      getNews(this.$route.meta.id).then((res) => {
        this.list = res.rows
        this.total = res.total;
      });
    }
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
    .pagination {
      margin-top: 24px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
