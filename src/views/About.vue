<template>
  <div class="about">
    <van-button type="info" @click="showToast">显示提示按钮</van-button>
    <van-button type="info" @click="showLoading">显示加载按钮</van-button>
    <van-button type="info" @click="hideLoading">显示加载按钮</van-button>
    <van-button type="info" @click="showComfirm">显示确认选择框按钮</van-button>
  </div>
</template>
<script>

export default {
  methods: {
    showToast() {
      this.$toast({
        msg: '提示',
        type: 'loading'
      })
    },
    showLoading() {
      console.log(this.$loading);
      this.$loading.show();
      setTimeout(() => {
        this.$loading.hide();
      }, 2000)
    },
    hideLoading() {
      this.$loading.hide();
    },
    showComfirm() {
      this.$comfirm({
        title: '标题',
        text: '文本',
        confirm () {
          console.log('确定')
        },
        cancel() {
          console.log('取消')
        }
      });
    }
  }
}
</script>
