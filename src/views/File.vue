<template>
  <div class="file">
    <div class="container">
      <div class="list">
        <div class="list-item">
          <div class="name">名称</div>
          <div class="link">下载链接</div>
        </div>
        <div class="list-item" v-for="file in files" :key="file">
          <div class="name">{{ file?.fileTitle }}</div>
          <div class="link">
            <a :href="`/dev-api${file.fileUrl}`" download> 点击下载 </a>
          </div>
        </div>
      </div>
      <div v-if="total > 0" class="pagination">
        <a-pagination
          v-model:current="current"
          v-model:page-size="pageSize"
          show-quick-jumper
          :total="total"
          :show-total="total => `共有${total}条`"
          show-less-items
        />
      </div>
    </div>
  </div>
</template>
<script>
import { baseURL } from '../utils/request'
import { getFiles } from '../api/router'
import { Pagination } from 'ant-design-vue'
export default {
  name: 'File',
  components: { APagination: Pagination },
  mounted() {
    getFiles(this.$route.meta.id).then(res => {
      this.files = res.rows
      this.total = res.total
    })
  },
  data() {
    return {
      files: '',
      current: 1,
      pageSize: 10,
      total: 0,
    }
  },
  computed: {
    baseURL() {
      return baseURL
    },
  },
}
</script>
<style lang="scss" scoped>
.file {
  margin-top: 24px;
  .container {
    .list {
      border: 1px solid rgba(0, 0, 0, 0.15);
      .list-item {
        height: 50px;
        display: flex;
        border-bottom: 1px solid rgba(0, 0, 0, 0.15);
        &:last-child {
          border-bottom: none;
        }
        &:nth-child(2n + 1) {
          background: #f9f9f9;
        }
        &:first-child {
          background: #eaeaea;
        }
        .name {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid rgba(0, 0, 0, 0.15);
        }
        .link {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          a {
            color: #1538d6;
          }
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
