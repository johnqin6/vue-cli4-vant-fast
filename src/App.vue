<template>
  <div id="app">
    <van-tabs v-model="active" @click="changeTab">
      <van-tab 
        v-for="(tab,index) in tabList" 
        :title="tab.title" 
        :key="index">
        {{ tab.title}}
      </van-tab>
    </van-tabs>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      tabList: [
        { title: '首页' },
        { title: '接口测试' },
        { title: '提示测试' },
        { title: '其他' }
      ],
    }
  },
  methods: {
    changeTab() {
      switch(this.active) {
        case 0:
          this.goPage('home');
          break;
        case 1:
          this.goPage('apiDemo');
          break;
        case 2:
          this.goPage('about');
          break;
        case 3:
          this.goPage();
          break;
      }
    },
    goPage(pathName) {
      this.$router.push({
        name: pathName
      })
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
