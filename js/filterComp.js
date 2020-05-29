let search = {
  props: [],

  data() {
    return {
      userSearch: '',
    }
  },

  methods: {
    filter() {
      let regExp = new RegExp(this.userSearch, 'i');
      this.$parent.filtered = this.$parent.products.filter(el => regExp.test(el.product_name));
    }
  },

  template: `
    <form action="#" class="search-form" @submit.prevent="filter">
      <input type="text" class="search-field" v-model="userSearch">
      <input type="button" value="Search" class="search-button">
    </form>
  `
}