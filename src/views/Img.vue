<template>
  <div class="img">
    <div v-for="img in _imgs" :key="img" class="img-item">
      <div class="img-container">
        <a-image-preview-group>
          <div class="imgs">
            <a-image v-for="src in img.srcs" :key="src" :src="src" />
          </div>
        </a-image-preview-group>
      </div>
      <div class="title">{{ img.title }}</div>
    </div>
  </div>
</template>
<script>
import { getPictures } from '../api/router'
import { Image, ImagePreviewGroup } from 'ant-design-vue'
export default {
  name: 'Img',
  components: { AImage: Image, AImagePreviewGroup: ImagePreviewGroup },
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
        }
      })
    },
    src() {
      return this.imgs[1]?.picUrl
    },
  },
  mounted() {
    getPictures(this.$route.meta.id).then(res => {
      this.imgs = res.rows
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
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .img-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      .imgs {
        height: 200px;
        overflow: hidden;
      }
      :deep(img) {
        border-radius: 4px;
      }
      :deep(.ant-image .ant-image-img) {
        width: 100%;
        height: 200px;
      }
      :deep(.ant-image-mask) {
        border-radius: 4px;
      }
    }
    .title {
      width: 220px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
}
</style>
