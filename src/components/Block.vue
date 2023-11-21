<template>
  <div class="block">
    <div class="title-box">
                <div class="title">
                  {{ news?.title }}
                </div>
                <div class="line"></div>
    </div>
    <div class="img">
      <img :src="news?.news[0].detail.newsPic" alt="">
    </div>
    <div class="list">
                <div v-for="it in news?.news" :key="it" class="list-item"
                @click="
                    () => {
                          $router.push({ name: `${type}详情`, params: { id: it.id } })
                          }">
                  {{ it.title }}
                </div>
     </div>
  </div>
</template>
<script>
export default {
    name: 'block',
    props: ['news','type'],
}
</script>
<style lang="scss" scoped>
.block {
    width:100%;
    .title-box {
              width:100%;
              display: flex;
              align-items: center;
              position: relative;
              margin-bottom: 8px;
              .title {
                font-size: 20px;
                font-weight: 600;
                margin-right: 8px;
              }
              .line {
                background: blue;
                height: 2px;
                width: 50%;
              }
            }
            .img {
              width: 100%;
              height: 240px;
              margin-bottom: 8px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .list {
              width:100%;
              display: flex;
              flex-direction: column;
              .list-item {
                &:first-child {
                  font-weight: 600;
                }
                &:hover {
                  border-bottom: 1px solid rgba(0,0,.6);
                }
                height: 16px;
                cursor: pointer;
                box-sizing: border-box;
                margin-bottom: 8px;
                font-weight: 400;
                font-size: 14px;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
            }
}
</style>