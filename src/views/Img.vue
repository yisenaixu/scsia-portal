<template>
  <div class="img" v-if="!showDetail">
    <div v-for="img in _imgs" :key="img" class="img-item">
      <div
        class="img-container"
        @click="
          $router.push({
            name: `${$route.name}详情`,
            params: { id: img?.id },
          })
        "
      >
        <a-image-preview-group>
          <div class="imgs">
            <a-image
              v-for="src in img.srcs"
              :key="src"
              :src="src"
              :preview="false"
            />
          </div>
        </a-image-preview-group>
      </div>
      <div class="title">
        <span
          @click="
            $router.push({
              name: `${$route.name}详情`,
              params: { id: img?.id },
            })
          "
        >
          {{ img.title }}</span
        >
      </div>
    </div>
  </div>
  <router-view v-show="showDetail"></router-view>
</template>
<script>
import { getPictures } from '../api/router'
import { Image, ImagePreviewGroup } from 'ant-design-vue'
export default {
  name: 'Img',
  components: {
    AImage: Image,
    AImagePreviewGroup: ImagePreviewGroup,
  },
  data() {
    return {
      imgs: [],
    }
  },
  computed: {
    _imgs() {
      return this.imgs?.map(item => {
        return {
          srcs: item.picUrl.split(','),
          title: item.picTitle,
          id: item.id,
        }
      })
    },
    src() {
      return this.imgs[1]?.picUrl
    },
    showDetail() {
      return this.$route.params.id ? true : false
    },
  },
  mounted() {
    console.debug(this.$route.params.id)
    console.debug(this.$route)
    getPictures(this.$route.meta.id).then(res => {
      this.imgs = res.data
    })
  },
}
</script>

<style scoped lang="scss">
.img {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 32px;
  .img-item {
    width: 100%;
    padding: 0 24px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .img-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      .imgs {
        cursor: pointer;
        height: 150px;
        overflow: hidden;
      }
      :deep(img) {
        border-radius: 4px;
      }
      :deep(.ant-image .ant-image-img) {
        width: 100%;
        height: 150px;
      }
      :deep(.ant-image-mask) {
        border-radius: 4px;
      }
    }
    .title {
      font-weight: 500;
      margin-top: 8px;
      width: 220px;
      height: 20px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      span {
        width: auto;
        cursor: pointer;
        &:hover {
          border-bottom: 1px solid rgba(0, 0, 0.6);
        }
      }
    }
  }
}
</style>
