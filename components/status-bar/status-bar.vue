<template>
  <view class="bar" :style="{'background-color': backgroundColor,'width': '100vw','height': 'var(--status-bar-height)'}">
    <!-- 这里是状态栏占位 -->
  </view>
</template>
<script>
export default {
  name: "status-bar",
  props: {
    backgroundColor: {
      type: String,
      default: '#fff'
    }
  },

  // data() {
  //   return {
  //     backgroundColor: this.backgroundColor
  //   }
  // }
}
</script>
<style scoped lang="scss">
	.bar{
		
	}
	@media (prefers-color-scheme: dark) {
	  .bar {
	    background-color: #1F1F1F;
	  }
	  /* DarkMode 下的样式 end */
	}
</style>