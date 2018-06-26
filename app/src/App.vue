<template>
  <el-container>
    <el-main id="app">
      <form @submit.prevent="call">
        <img class="logo" src="@/assets/icons/phone.svg">
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
      <div class="status" v-loading="loading">
        <el-row>
          <div class="audio-player" :class="{ visible: response.status === 'success' }">
            <audio :src="`/mp3/${response.hash}.mp3`"></audio>
          </div>
        </el-row>
        <el-row>
          <el-alert
            v-if="response.status"
            center
            :title="response.message"
            :type="response.status"
            show-icon>
          </el-alert>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

export default {
  name: 'app',
  data () {
    return {
      loading: false,
      options: ['play', 'progress', 'current-time', 'mute', 'volume'],
      error: null,
      message: null,
      phoneNumber: null,
      response: {
        hash: null,
        message: null,
        status: null
      }
    }
  },
  methods: {
    call () {
      this.loading = true
      this.response = {
        hash: null,
        message: null,
        status: null
      }

      axios.post('/api/v1/json', {
        message: this.message,
        phoneNumber: this.phoneNumber
      })
        .then(response => {
          setTimeout(() => {
            this.loading = false
            this.response.hash = response.data.hash
            this.response.message = response.data.message
            this.response.status = response.data.status
          }, 666)
        })
        .catch(() => {
          setTimeout(() => {
            this.loading = false
            this.response.message = 'Something went wrong. Please try again.'
            this.response.status = 'error'
          }, 666)
        })
    }
  },
  mounted () {
    // eslint-disable-next-line
    new Plyr('audio', {
      controls: this.options
    })
  }
}
</script>

<style lang="scss">
$accent-color: #409EFF;

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.el-main {
  margin: auto;
  max-width: 400px;
}

.logo {
  display: block;
  height: 2rem;
  margin: 0 auto 1rem auto;
}

.el-row {
  margin-bottom: 1rem;
}

.el-button {
  width: 100%;
}

.el-textarea__inner {
  font-family: inherit;
  font-size: 14px;
}

.audio-player {
  visibility: hidden;

  &.visible {
    visibility: visible;
  }
}

.plyr__control:hover {
  background: $accent-color !important;
}

.plyr--full-ui input[type=range] {
  color: $accent-color !important;
}
</style>
