<template>
  <div>
    <van-button @click="getInvalid">无效token</van-button>
    <van-button @click="getExpire">过期token</van-button>
    <van-button @click="postTest">post接口测试</van-button>
    <van-button @click="userTest">userTest接口测试</van-button>
  </div>
</template>
<script>
export default {
  methods: {
    async userTest() {
      try {
        const res = await this.$http.get('/api/user/test')
        console.log(res)
      } catch(err) {
        console.log(err)
        this.$toast({
          msg: err.message || err
        })
      }
    },
    async getInvalid() {
      try {
        const res = await this.$http.get('/api/demo/invalid')
        console.log(res)
      } catch(err) {
        console.log(err)
        this.$toast({
          msg: err.message || err
        })
      }
    },
    async getExpire() {
      try {
        const res = await this.$http.get('/api/demo/expire')
        console.log(res)
      } catch(err) {
        console.log(err)
        this.$toast({
          msg: err.message || err
        })
      }
    },
    async postTest() {
      try {
        const res = await this.$http.post('/api/demo/postTest', {
          name: '张三',
          age: 18
        })
        console.log(res)
      } catch(err) {
        console.log(err)
        this.$toast({
          msg: err.message || err
        })
      }
    }
  },
  
}
</script>
