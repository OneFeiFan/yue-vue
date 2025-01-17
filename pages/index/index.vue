<template>
	<view class="content">
    <uni-nav-bar :border="false" leftWidth="50rpx" rightWidth="50rpx" class="nav">
      <view slot="left">
        <view class="nav-text" @click="showMenu = true">
          <uni-icons type="bars" size="48rpx"/>
        </view>
      </view>
      <view class="input-view">
        <uni-icons class="input-uni-icon" type="search" size="36rpx"/>
        <input confirm-type="search" class="nav-bar-input" :class="{'nav-bar-input-active': searchValue}" type="text" placeholder="输入搜索关键词" v-model="searchValue"
               @confirm="confirm" />
        <uni-icons v-if="searchValue" class="clear-uni-icon" type="clear" size="36rpx" @click="clearInput"/>
      </view>
      <view slot="right">
        <view class="nav-text">
          搜索
        </view>
      </view>
    </uni-nav-bar>
    <y-tabs v-model="activeIndex" @click="tabClick"  @change="tabChange" :swipeable="true">
      <y-tab class="y-tab-virtual" v-for="tab in tabs" :key="tab.title" :title="tab.title">
        <view class="content-wrap"> 内容 {{tab.title}} </view>
      </y-tab>
    </y-tabs>
    <hqs-popup v-model="showMenu" from="left" round="5" width="75vw">
      <view class="menu-content">
        <header class="menu-header menu-card">

        </header>
        <view class="menu-mid menu-card">

        </view>
        <view class="menu-bottom menu-card">

        </view>
      </view>
    </hqs-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
        searchValue:'',
        showMenu: false,
        activeIndex: 0,
        tabs:Array.from({ length: 5 }, (o, i) => ({title: '标签' + (i + 1)})),
			}
		},
		onLoad() {

		},
		methods: {
      clearInput(){
        this.searchValue = '';
      },
      // 标签点击事件
      tabClick(index, item) {
        console.log("tabClick", index, item);
      },
      // 标签切换事件
      tabChange(index, item) {
        console.log("tabChange", index, item);
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
  }

  .input-uni-icon {
    position: absolute;
    line-height: $nav-height;
    left: 15rpx;
  }
  .clear-uni-icon{
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
  .nav-bar-input-active{
    padding-left: 60rpx;
    padding-right: 60rpx;
  }
  .menu-card{
    background-color: #fff;
  }
  .menu-content{
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .menu-header{
      padding: 30% 50%;
      border-radius: 10rpx;
    }
    .menu-mid{
      padding: 55% 50%;
      border-radius: 10rpx;
    }
    .menu-bottom{
      padding: 35% 50%;
      border-radius: 10rpx;
    }
  }
  .content-wrap{
    /* #ifndef H5 */
    height: calc(100vh - 44px);
    /* #endif */
    /* #ifdef H5 */
    height: calc(100vh - 88px);
    /* #endif */
  }
  @media (prefers-color-scheme: dark) {
    .menu-card{
       background-color: #414141;
    }
    /* DarkMode 下的样式 end */
  }
</style>
