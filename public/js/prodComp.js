let product = {
  props: ['product', 'img',],
  
  template:`
    <div class="product_item">
      <div id=product_img class="product-img">
        <img :src="img" alt="Картинка товара">
      </div>
      <h3 id="product_name" class="product-name"> {{ product.product_name }} </h3>
      <span id="product_price" class="product-price"> {{ product.price }} руб.</span>
      <button class="buy-button" 
         @click="$root.$refs.cart.addProduct(product)">Купить</button>
    </div>
  `
}

let products = {
  props: [], 

  data() {
    return {
      filtered: [],
      products: [],
      // imgCatalog: './images/product_101.jpg',
      catalogUrl: '/catalog.json',
    }
  },
  
  methods: {},
  
  template: `
    <div id="products" class="products">
      <product
        v-for="product of filtered"
        :key="product.id_product"
        :img="product.image"
        :product="product">
      </product>
    </div>
  `, 

  components: {
    product
  },

  mounted() {
    this.$parent.getJSON(`/api/products`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filtered.push(el);
        }
      })
  } 
}