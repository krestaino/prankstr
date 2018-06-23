<template>
  <div id="app">
    <form>
      <label>Phone number</label>
      <input type="text" v-model="phoneNumber" required>
      <label>Message</label>
      <input type="text" v-model="message" required>
      <input
        type="button"
        value="Call"
        @click.prevent="call"
      >
    </form>
    <div class="status">
      <div v-if="response">
        <div>{{ response.message }}</div>
        <audio controls :src="`/mp3/${response.hash}.mp3`"></audio>
      </div>
      <div>{{ error }}</div>
    </div>
  </div>
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
#app {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100vh;
  color: #2c3e50;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

form {
  max-width: 400px;
  width: 100%;

  label {
    display: block;
    margin-bottom: 0.5rem;

    &:not(:first-child) {
      margin-top: 1rem;
    }
  }

  label,
  input {
    width: 100%;
  }

  input[type="button"] {
    margin-top: 1rem;
  }
}

.status {
  margin-top: 1rem;

  audio {
    margin-top: 1rem;
  }
}
</style>
