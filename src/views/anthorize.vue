<template>
  <div>正在加载中...</div>
</template>
<script>
export default {
  created() {
    this.$http.get('/token').then(res => {
      this.$store.dispatch('user/setToken', res.data)
      this.$router.replace({
        name: 'home'
      });
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>