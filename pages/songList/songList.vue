<template>
  <view class="page">
    <status-bar :backgroundColor="color"/>
    <uni-nav-bar left-icon="left" :border="false" @clickLeft="back" :style="{'background-color': color}"/>
    <view class="background" :style="{ backgroundImage: `url(${backgroundImage})` }"/>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="song-scroll" @scrolltoupper="upper"
                 @scrolltolower="loadMore" @scroll="scroll">
      <view class="item" v-for="(_song,key) in songs" :key="key" @loadstart="printItem(key)">
        <image class="icon" :src="_song.getCover()" mode="aspectFill"></image>
        <view class="text-content">
          <text class="name">
            {{ _song.getName() }}
          </text>
<!--          <view class="desc">-->
<!--            歌单：{{ songs.size }}首-->
<!--          </view>-->
        </view>
      </view>
<!--      <view v-if="loading" class="loading">加载中...</view>-->
    </scroll-view>
  </view>
</template>

<script>
import Song from "@/model/Song";
import StatusBar from "@/components/status-bar/status-bar.vue";
import UniNavBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
let songsId = null;
const base = new Song('-1', '默认歌曲', [], '-1', '', 0, 0, '', '', '');
export default {
  components: {
    UniNavBar,
    StatusBar,
    // BcakColor
  },
  data() {
    return {
      backgroundImage: '',
      color: 'rgba(255,255,255,0)',
      songs: {},
      songList: null,
      scrollTop: 0,
      old: {
        scrollTop: 0
      },
      pageSize: 20,
      currentPage: 1,
      loading: false
    };
  },
  onLoad(options) {
    const { id,color } = options;
    if (id !== 'undefined' && id !== null && id !== '') {
      this.songList = this.$yueService.getSongListService().getSongList(id);
      this.backgroundImage = this.songList.getCover();
      this.color = color;
      songsId = this.songList.getAllSongs();
      this.loadSongs();
      // setTimeout(() => {
      //   this.open(this.backgroundImage).then(() => {
      //     console.log('图片加载成功');
      //   });
      // }, 150);
    }
  },
  onReady() {


  },
  // computed:{
  //   songs_(){
  //     console.log(this.loading);
  //     return this.songs;
  //   }
  // },
  methods: {
    printItem(key) {
      console.log(key);
      return Date.now();
    },
    back() {
      uni.navigateBack();
    },
    upper(e) {
      console.log(e);
    },
    scroll(e) {
      this.old.scrollTop = e.detail.scrollTop;
    },
    loadSongs() {
      this.loading = true;

      for (let i = 0; i < this.pageSize; i++) {
        const index = (this.currentPage - 1) * this.pageSize + i;
        if (index >= songsId.length) break;
        const songsIdElement = songsId[index];
        const song = this.$yueService.getSongService().getSongById(songsIdElement) || base;
        this.$set(this.songs, songsIdElement, song);
      }
      console.log(this.songs);
      this.loading = false;
    },
    loadMore() {
      if (!this.loading) {
        this.currentPage++;
        this.loadSongs();
      }
    },

  }
};
</script>

<style lang="scss">
.page {
  height: 100vh;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  filter: blur(30rpx);
  z-index: -1;
}

.song-scroll {
  height: calc(100vh - var(--status-bar-height) - 44px);
}

.item {
  height: 150rpx;
  display: flex;
  align-items: center;
  transition: background-color 0.5s ease;

  &:active {
    background-color: #f0f0f0;
  }

  .icon {
    height: 125rpx;
    width: 125rpx;
    border-radius: 50%;
    margin: 0 20rpx;
  }

  .text-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    /* 强制不换行 */
    white-space: nowrap;
    /* 隐藏超出部分 */
    overflow: hidden;

    .name {
      overflow: hidden;
      /* 用省略号代替剩余内容 */
      text-overflow: ellipsis;
      font-size: 30rpx;
      color: white;
    }

    .desc {
      margin-top: 10rpx;
      font-size: 20rpx;
      color: white;
      line-height: 20rpx;
    }
  }
}

.loading {
  text-align: center;
  padding: 20rpx;
}
</style>
