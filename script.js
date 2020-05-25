const API_URL = 'https://raw.githubusercontent.com/Vogusov/store_API/master';
const image = 'https://place-hold.it/200x200';
const cartImage = 'https://place-hold.it/100x100';


let app = new Vue ({
  el: '#app',
  data: {
    catalogUrl: '/catalog.json',
    userSearch: '',
  },

  methods: {
    getJSON(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      console.log(`Product id_${product.id_product} was added to your cart`);
    },
    filter() {
      let regExp = new RegExp(this.userSearch, 'i');
      this.filtered = this.products.filter(el => regExp.test(el.product_name));
    }
    
  },

  mounted() {
    this.getJSON(`${API_URL + this.catalogUrl}`)
      .then(data => {
        console.log(data);
        for (let el of data) {
          this.products.push(el);
          this.filtered.push(el);
          console.log(el);
        }
      })
  }
})






// let cart = document.getElementById('cart');
// let products_list = document.getElementById('products_list');
// let cart_button = document.getElementById('cart_button');

// let toggle_cart = function() {
//     cart.classList.toggle('invisible')
// }
// cart_button.addEventListener('click', toggle_cart);



// let goods = document.querySelectorAll('.product-item');
// console.log('goods: ', goods);
// let goodsList = ['mouse', 'house'];

// goods.forEach((el, i) => el.setAttribute('data-product-name', i));
// console.log('goods: ', goods);

// goods.forEach(el => console.log('el has data-product-name: ' + el.getAttribute('data-product-name')))



// let addToBasket = function() {
//     let elm = event.target.closest('*[data-product-name]');
//     console.log(elm.dataset.productName + " product was added; " + this.tagName);
// }
// let removeFromBasket = function() {
//     console.log("product was removed");
// }

// products_list.querySelectorAll('.buy-button').forEach(el => el.addEventListener('click', addToBasket));
// cart.querySelectorAll('.remove-button').forEach(el => el.addEventListener('click', removeFromBasket));





