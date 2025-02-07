<template>
  <view class="content">
    <status-bar backgroundColor="#F7F7F7"/>
    <uni-nav-bar :border="false" leftWidth="50rpx" rightWidth="50rpx" class="nav">
      <view slot="left">
        <view class="nav-text" @click="showMenu = true">
          <uni-icons type="bars" size="48rpx"/>
        </view>
      </view>
      <view class="input-view">
        <uni-icons class="input-uni-icon" type="search" size="36rpx"/>
        <input confirm-type="search" class="nav-bar-input" :class="{'nav-bar-input-active': searchValue}" type="text"
               placeholder="输入搜索关键词" v-model="searchValue"
               @confirm="confirm"/>
        <uni-icons v-if="searchValue" class="clear-uni-icon" type="clear" size="36rpx" @click="clearInput"/>
      </view>
      <view slot="right">
        <view class="nav-text">
          搜索
        </view>
      </view>
    </uni-nav-bar>
    <y-tabs v-model="activeIndex" @click="tabClick" @change="tabChange" :swipeable="true">
      <y-tab class="y-tab-virtual" v-for="tab in tabs" :key="tab.title" :title="tab.title">
        <view class="song-list content-wrap" v-show="tab.title ==='歌单'">
          <scroll-view :scroll-top="scrollTop" scroll-y="true" class="song-list-scroll" @scrolltoupper="upper"
                       @scrolltolower="lower" @scroll="scroll">
            <view class="list-item" v-for="[key, _songlist] in songList" :key="key" @click="clickSongList(key)">
              <image class="list-icon" :src="_songlist.getCover()" mode="aspectFill"></image>
              <view class="text-content">
                <view class="list-name">
                  {{ _songlist.getName() }}
                </view>
                <view class="list-desc">
                  歌单：{{ _songlist.getSize() }}首
                </view>
              </view>


            </view>
          </scroll-view>
        </view>
        <view class="content-wrap" v-show="tab.title !=='歌单'"> 内容 {{ tab.title }}</view>
      </y-tab>
    </y-tabs>
    <hqs-popup v-model="showMenu" from="left" :round="5" width="75vw">
      <view class="menu-content">
        <header class="menu-header menu-card">

        </header>
        <view class="menu-mid menu-card" @click="addSongList">

        </view>
        <view class="menu-bottom menu-card">

        </view>
      </view>
    </hqs-popup>
  </view>
</template>

<script>
import YTabs from "@/uni_modules/y-tabs/components/y-tabs/y-tabs.vue";
import StatusBar from "@/components/status-bar/status-bar.vue";
import UniNavBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
import SongList from "@/model/SongList";
import UniIcons from "@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import {Image} from "image-js";

export default {
  components: {UniIcons, UniNavBar, StatusBar, YTabs},
  data() {
    return {
      saturation: 4.3,
      brightness: 0.6,
      searchValue: '',
      showMenu: false,
      activeIndex: 0,
      tabs: [{title: '歌单'}, {title: '专辑'}, {title: '歌手'}],
      songList: new Map(),
      scrollTop: 0,
      old: {
        scrollTop: 0
      }
    }
  },
  onLoad() {
    // this.$yueService.getSongListByUrl("https://music.163.com/playlist?id=2854089226&uct2=U2FsdGVkX18ld4Rc3IO/DVyoxwj5X0E/0FsVh7scZe0=")
    const songListService = this.$yueService.getSongListService();
    this.songList = songListService.getAllSongList();
  },
  onReady() {
  },
  // onShow() {
  //   const songListService = this.$yueService.getSongListService();
  //   this.songList = songListService.getAllSongList()
  //   console.log(this.songList);
  // },
  onHide() {
    console.log('onHide');
  },
  methods: {
    clickSongList(id) {
      console.log(id.split(":"));
      const songList = this.$yueService.getSongListService().getSongList(id);

        this.open(songList.getCover()).then((color) => {
          console.log(color);
          uni.navigateTo({
            url: `/pages/songList/songList?id=${id}&color=${color}`
          });
        });

    },
    async open(url) {
      try {
        // 异步加载图片
        // let start = Date.now()
        const image = await Image.load(url);
        // console.log('图片加载耗时', Date.now() - start);
        // 异步获取唯一颜色
        return this.getUniqueColor(image.data);
      } catch (error) {
        console.error('图片处理失败', error);
      }
    },
    getUniqueColor(imageData) {
      let sum_r = 0, sum_g = 0, sum_b = 0;
      let pixelCount = imageData.length / 4;

      for (let i = 0; i < imageData.length; i += 4) {
        sum_r += imageData[i];
        sum_g += imageData[i + 1];
        sum_b += imageData[i + 2];
      }

      let res_r = Math.round(sum_r / pixelCount);
      let res_g = Math.round(sum_g / pixelCount);
      let res_b = Math.round(sum_b / pixelCount);

      // 饱和度调整
      let max = Math.max(res_r, res_g, res_b);
      let min = Math.min(res_r, res_g, res_b);
      let delta = (max - min) / 255;
      let saturationFactor = 1 + (this.saturation - 1) * delta;

      res_r = Math.min(255, Math.max(0, Math.round(res_r + (res_r - 128) * saturationFactor)));
      res_g = Math.min(255, Math.max(0, Math.round(res_g + (res_g - 128) * saturationFactor)));
      res_b = Math.min(255, Math.max(0, Math.round(res_b + (res_b - 128) * saturationFactor)));

      // 亮度调整
      res_r = Math.min(255, Math.max(0, Math.round(res_r * this.brightness)));
      res_g = Math.min(255, Math.max(0, Math.round(res_g * this.brightness)));
      res_b = Math.min(255, Math.max(0, Math.round(res_b * this.brightness)));

      return `rgba(${res_r}, ${res_g}, ${res_b}, ${0.25})`;
    },
    clearInput() {
      this.searchValue = '';
    },
    // 标签点击事件
    tabClick(index, item) {
      console.log("tabClick", index, item);
    },
    // 标签切换事件
    tabChange(index, item) {
      console.log("tabChange", index, item);
    },
    confirm() {

    },
    upper(e) {
      console.log(e)
    },
    lower(e) {
      console.log(e)
    },
    scroll(e) {
      console.log(e)
      this.old.scrollTop = e.detail.scrollTop
    },
    addSongList() {
      uni.showModal({
        title: '提示',
        content: '',
        editable: true,
        success: (res) => {
          if (res.confirm) {
            //https://music.163.com/playlist?id=2854089226&uct2=U2FsdGVkX1+mh9YDffLH+/Os8HjCfKfKZI2rBT9RXqA=

            uni.showLoading({
              title: '加载中'
            });
            uni.showToast({
              title: '添加成功',
              icon: 'success'
            });
            this.$yueService.getSongListByUrl(res.content).then(res => {
              uni.hideLoading();
            }).catch(err => {
              uni.hideLoading();
              uni.showToast({
                title: '加载失败',
                icon: 'none'
              });
            });
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
$nav-height: 30px;
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.input-view {
  position: relative;
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  flex: 1;
  height: $nav-height;
  border-radius: 15px;
  flex-wrap: nowrap;
  margin: 7px 0;
  line-height: $nav-height;

  .input-uni-icon {
    position: absolute;
    line-height: $nav-height;
    left: 15rpx;
  }

  .clear-uni-icon {
    position: absolute;
    line-height: $nav-height;
    right: 15rpx;
  }

  .nav-bar-input {
    height: $nav-height;
    line-height: $nav-height;
    /* #ifdef APP-PLUS-NVUE */
    width: 370rpx;
    /* #endif */
    flex: 1;
    padding-left: 60rpx;
    font-size: 12px;
    background-color: #f8f8f8;
  }

  .nav-bar-input-active {
    padding-left: 60rpx;
    padding-right: 60rpx;
  }
}


.menu-content {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  //padding: 0 20rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .menu-header {
    height: 25%;
    padding: 0 50%;
    //border-radius: 10rpx;
  }

  .menu-card {
    background-color: #fff;
  }

  .menu-mid {
    height: 42.5%;
    padding: 0 47%;
    border-radius: 10rpx;
  }

  .menu-bottom {
    height: 30%;
    padding: 0 47%;
    border-radius: 10rpx;
  }
}

.content-wrap {
  /* #ifndef H5 */
  height: calc(100vh - 88px - var(--status-bar-height));
  /* #endif */
  /* #ifdef H5 */
  height: calc(100vh - 88px);
  /* #endif */
}

.song-list {
  display: flex;

  &-scroll {
    flex: 1;
  }

  .list-item {
    height: 150rpx;
    //background-color: #4cd964;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: background-color 0.5s ease;

    &:active {
      background-color: #f0f0f0;
    }

    .list-icon {
      height: 125rpx;
      width: 125rpx;
      border-radius: 50%;
      margin-right: 20rpx;
      margin-left: 20rpx;
    }

    .text-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .list-name {

      }

      .list-desc {
        margin-top: 10rpx;
        font-size: 20rpx;
        color: grey;
        line-height: 20rpx;
      }
    }
  }
}

@media (prefers-color-scheme: dark) {
  .menu-card {
    background-color: #414141;
  }
  /* DarkMode 下的样式 end */
}
</style>
