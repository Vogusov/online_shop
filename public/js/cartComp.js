let cartItem = {
  props: ['img', 'cartItem'],

  template: `
    <div class="cart-item">
      <img class="cart-item__img" alt="Картинка товара"
        :src="img">
      <div class="cart-item__info">
        <h3 class="cart-item__product-name"> {{ cartItem.product_name }} </h3>       
        <span class="cart-item__quantity">Колличество: {{ cartItem.quantity }} </span>
        <span class="cart-item__product-price"> {{ cartItem.price * cartItem.quantity }} руб</span>
        <button class="remove-button"
          :data-id="cartItem.id_product"
          @click = "$parent.removeProduct(cartItem)">удалить</button>
      </div>
    </div>
  `
}



let cart = {
  props: [],

  data() {
    return {
      cartItems: [],
      cartIsVisible: false,
      cartIsEmpty: false,      
    }
  },
  
  methods: {
    addProduct(product) {
      console.log('product: ', product);
      let find = this.cartItems.find(el => el.id_product === product.id_product)
      if (find) {
        this.$parent.putJSON(`/api/cart/${find.id_product}`, {quantity: 1})
          .then(data => {
            if(data.result) {
              find.quantity++
            } 
          })
      } else {
        let prod = Object.assign({quantity: 1, sum: product.price}, product)
        console.log('product: ', product);
        this.$parent.postJSON('/api/cart', prod)
          .then(data => {
            this.cartItems.push(prod)
          })
      }
    },

    removeProduct(product) {
      console.log('delete product: ', product);
      if (product.quantity > 1) {
        this.$parent.putJSON(`/api/cart/${product.id_product}`, {quantity: -1})
          .then(data => {
            if(data.result) {
              product.quantity--
            } 
          })
        } else {
          this.$parent.deleteJSON(`/api/cart/${product.id_product}`)
            .then(data => {
              if(data.result) {
                this.cartItems.splice(this.cartItems.indexOf(product), 1)
              }
            })
        }
    },

    

    showCart() {
      this.cartIsVisible = !this.cartIsVisible
    },

    

  },

    template: `
  <div>
    
    <input id="cart_button" class="cart-button" type="button" value="Корзина" 
      @click="showCart">
    <div id="cart" class="cart"
      
      v-show="cartIsVisible">
      <div v-show="cartIsEmpty">
        Корзина пуста
      </div>       
      <cart-item
        v-for="cartItem of cartItems"
        :img="cartItem.image" 
        :key="cartItem.id_product"
        :cartItem="cartItem">
      </cart-item>
    </div>
  </div>
    
  `,

  components: {
    'cart-item': cartItem
  },

  mounted() {
    this.$parent.getJSON(`/api/cart`)
      .then(data => {
        console.log('Cart contains: ', data);
        for (let el of data.contents) {
          this.cartItems.push(el);
        }
      })
     
  } 
  
}