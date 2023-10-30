<template>
    <div class="img">
      <div v-for="img in _imgs" :key="img" class="img-item">
        <div class="img-container">
          <a-image
        width="300"
        height="300"
        :src="img.srcs[0]"/>
        </div>
        <div class="title">{{ img.title }}</div>
      </div>
    </div>
  </template>
  <script>
  import { getPictures } from '../api/router';
  import {baseURL} from '../utils/request'
  import {Image} from 'ant-design-vue'
  export default {
    name: 'Img',
    components: {AImage:Image},
    data() {
      return {
        imgs: []
      }
    },
    computed: {
      _imgs() {
        return this.imgs?.map(item => {
            return {
              srcs: item.picUrl.split(','),
              title: item.picTitle
            }
        })
      },
      src() {
        return this.imgs[1]?.picUrl
      }
    },
    mounted() {
      getPictures(this.$route.meta.id).then(res => {
        console.debug(res.data[0]);
        this.imgs = res.data;
      })}
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
          :deep(img) {
            border-radius: 4px;
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
  