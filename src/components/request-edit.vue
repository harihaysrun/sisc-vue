<template>

    <div>
        
      <h1>Edit {{product_brand}} {{product_name}}</h1>

      <div id="success-message">Successfully edited product information!</div>

      <div>
        <label>Product condition</label>
        <input type="radio" value="New" v-model="product_condition" /> Brand New
        <input type="radio" value="Used" v-model="product_condition" /> Used
        <div class="reminder-message" v-if="product_condition === 'Used'">Please remember to sanitize any used products before handing them off to someone else!</div>
      </div>

      <div>
        <label>Brand</label>
        <input type="text" v-model="product_brand" />
      </div>
      
      <div>
        <label>Product Name</label>
        <input type="text" v-model="product_name" />
      </div>
      
      <div>
        <label>Product Image</label>
        <input type="text" v-model="product_image" />
        <div id="previewPic">
          <img v-bind:src="product_image">
        </div>
      </div>

      <div>
        <label>Quantity</label>
        <select name="" id="" v-model="product_quantity">
          <option value="" disabled>select one</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="Others">Others</option>
        </select>

        <input type="text" v-model="product_quantity_box" v-if="product_quantity === 'Others'" />
      </div>

      <div>
        <label>Product Size</label>
        <select name="" id="" v-model="product_size">
          <option value="" disabled>select one</option>
          <option value="Sample">Sample</option>
          <option value="Mini">Mini</option>
          <option value="Full">Full</option>
        </select>

        <input type="text" v-model="product_size_ml" />
      </div>

      <button v-on:click="editProduct">Edit Product listing</button>
      <button v-on:click="removeProduct">Delete Product</button>

      <div id="danger-message">
        Are you sure you want to delete this product?
        <button v-on:click="remove(productId)">Delete Product</button>
      </div>
      
      <div>
        <ul>
          <li>Product condition: {{product_condition}}</li>
          <li>Brand: {{product_brand}}</li>
          <li>Name of product: {{product_name}}</li>
          <li>Product image link: {{product_image}}</li>
          <li>Product quantity: {{product_quantity}}</li>
          <li>Product quantity (others): {{product_quantity_box}}</li>
          <li>Size: {{product_size}}</li>
          <li>Size in ml: {{product_size_ml}}</li>
        </ul>
      </div>

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://3000-harihaysrun-skincareapi-99ltz4b52lr.ws-us28.gitpod.io/";

export default {
  created: async function(){
    console.log(this.productId)
    let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
    this.product_condition = response.data.productCondition;
    this.product_brand = response.data.productBrand;
    this.product_name = response.data.productName;
    this.product_image = response.data.productImage;
    this.product_quantity = response.data.productQuantity;
    this.product_quantity_box = response.data.productQuantityBox;
    this.product_size = response.data.productType;
    this.product_size_ml = response.data.productSize;
    this.comments = response.data.comments;
  
    console.log(response.data)

  },
  props: ['productId'],
  data: function(){
    return{
      'product_condition': '',
      'product_brand': '',
      'product_name': '',
      'product_image': '',
      'product_quantity': '',
      'product_quantity_box': '',
      'product_size': '',
      'product_size_ml': '',
      'id': ''
    }
  },
  methods:{
    'editProduct': async function(){

      const successMsg = document.getElementById("success-message");
      successMsg.style.display = "block";

      await axios.patch(BASE_API_URL + 'requested-products/' + this.productId, {
        'productCondition': this.product_condition,
        'productBrand': this.product_brand,
        'productName': this.product_name,
        'productImage': this.product_image,
        'productQuantity': this.product_quantity,
        'productQuantityBox': this.product_quantity_box,
        'productType': this.product_size,
        'productSize': this.product_size_ml
      });

    },
    'removeProduct': function(){
      const dangerMsg = document.getElementById("danger-message");
      dangerMsg.style.display = "block";
    },
    'remove': async function(productId){
      
      console.log("remove this product");

      await axios.post(BASE_API_URL + 'requested-products/' + this.productId + '/delete',{
        '_id': productId
      });


    }
  }
}
</script>

<style scoped>

</style>
