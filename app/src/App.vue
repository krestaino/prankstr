<template>
  <el-container>
    <el-main id="app">
      <form @submit.prevent="call">
        <i class="el-icon-phone"></i>
        <el-row>
          <el-input
            v-model="phoneNumber"
            autofocus
            placeholder="Phone number"
            required
            type="text"
          ></el-input>
        </el-row>
        <el-row>
          <el-input
            v-model="message"
            placeholder="Message"
            required
            rows="5"
            type="textarea"
          ></el-input>
        </el-row>
        <el-row>
          <el-button native-type type="primary">Call</el-button>
        </el-row>
      </form>
      <div class="status">
        <div v-if="response">
          <div>{{ response.message }}</div>
          <audio controls :src="`/mp3/${response.hash}.mp3`"></audio>
        </div>
        <div>{{ error }}</div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      error: null,
      message: null,
      phoneNumber: null,
      response: null
    }
  },
  methods: {
    call () {
      axios.post('/api/v1/json', {
        message: this.message,
        phoneNumber: this.phoneNumber
      })
        .then(response => {
          this.response = response.data
        })
        .catch(error => {
          this.error = error.data
        })
    }
  }
}
</script>

<style lang="scss">
.el-main {
  margin: auto;
  max-width: 400px;
}

.el-icon-phone {
  color: #888;
  display: block;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.el-row {
  margin-bottom: 1rem;
}

.el-button {
  width: 100%;
}

.el-textarea__inner {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
}
</style>
