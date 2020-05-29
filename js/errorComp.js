let error = {
  data() {
    return {
      text:''
    }
  },

  methods: {
    setError(error) {
      console.log(11);
      this.text = error
    }
  },

  template: `
    <div class="error-block" v-if="text">
      <p class="error-msg">
        <button class="close-btn" @click="text=''">&times;</button>
        {{ text }}
      </p>
    </div>
  `
}