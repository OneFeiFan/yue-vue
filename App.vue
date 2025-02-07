<script>
import NMP from 'NeteaseCloudMusicApi'
import NeteaseMusic from './model/NeteaseApi'
import YueService from './service/YueService'
import Vue from 'vue'

export default {

  onThemeChange() {
    console.log('themeChange');
  },
  onLaunch: function () {


    const yueService = new YueService();

// 将 YueService 实例注册为全局属性
    Vue.prototype.$yueService = yueService;
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show11111')
    // console.log(uni.createSelectorQuery())
    // console.log(user_detail)
    // let {user_detail} = NMP
    // console.log(user_detail, NMP)

    // console.log(NeteaseMusic.getSongListDetail)
    // NeteaseMusic.getSongListDetail('649445015').then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
    // NeteaseMusic.getSong([2668587376]).then(res => {
    //   console.log(res)
    // })
    // NeteaseMusic.getSongUrl(28461163).then(res => {
    //   console.log(res)
    // })
    //https://music.163.com/playlist?id=649445015&uct2=U2FsdGVkX18KVsgNPym2ejqUgVhCxWRtC0lJcNORF9M=
    // NMP.user_detail({uid:'32953014'}).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
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

.nav-bar-input {
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

.input-view {
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
    color: #bdc7c8 !important;
  }
  .input-view {
    background-color: #2d2d35;
    color: white;
  }
  .qs-con {
    background: #29292c !important;
  }
  /* DarkMode 下的样式 end */
}
</style>
