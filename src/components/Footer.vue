<template>
  <div class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="img">
          <img src="@/assets/img/logo.png" alt="" />
        </div>
      </div>
      <div class="footer-bottom">
        <div class="info">
          地址：四川省成都市武侯区航空路6号丰德国际A座3栋14楼 邮编：610000
        </div>
        <div class="info">
          电话：028-86623615 传真：028-86623615 邮箱：scrjxh@sina.com
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'footer',
  computed: {
    ...mapGetters(['navs']),
  },
}
</script>
<style lang="scss" scoped>
.footer {
  background: #f2f2f2;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  .container {
    width: 100%;
    max-width: 1440px;
    display: flex;
    flex-direction: column;
    .footer-top {
      width: 80%;
      margin: 16px auto;
      display: flex;
      justify-content: space-around;
      border-bottom: 2px solid rgba($color: #fff, $alpha: 0.8);
      .img {
        height: 120px;
        widows: 240px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .navs {
        display: flex;
        .nav {
          display: flex;
          flex-direction: column;
          text-align: center;
          font-size: 12px;
          .item {
            padding: 8px 16px;
          }
          .big {
            font-size: 20px;
            font-weight: 500;
          }
        }
      }
    }
    .footer-bottom {
      margin: 16px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .info {
        padding: 8px;
      }
    }
  }
}
</style>
