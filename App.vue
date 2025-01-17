<script>
export default {
  onThemeChange() {
    console.log('themeChange');
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
$nav-height: 30px;
/*每个页面公共css */
.uni-navbar__header {
  background-color: rgba(255, 255, 255, 0) !important;
}

.uni-navbar__content {
  background-color: rgba(255, 255, 255, 0) !important;
}
//
.uni-icons {
  color: #645a5a !important;
}
.nav-bar-input{
  background-color: rgba(255, 255, 255, 0) !important;
}
.nav {
  width: 100%;
  background-color: #F7F7F7;
}

.nav-text {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  color: #666;
}
.input-view{
  background-color: #eceded;
}
@media (prefers-color-scheme: dark) {
  .nav {
    background-color: #1F1F1F;
  }
  .nav-text {
    color: white !important;
  }
  .uni-icons {
    color: #bdc7c8!important;
  }
  .input-view{
    background-color: #2d2d35;
    color: white;
  }
  .qs-con {
    background: #29292c !important;
  }
  /* DarkMode 下的样式 end */
}
</style>
