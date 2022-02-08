<template>

      <div class="details-container container">

        <div class="img-container">
          <img v-bind:src="product_image">
        </div>

        <div class="text-container">
        
          <h1>Edit {{product_brand}} {{product_name}}</h1>

          <input type="date" name="" id="" v-model="date_posted">
          {{date_posted}}

          <div id="success-message" v-if="editSuccess === 'Yes'">Successfully edited product information!</div>

          <div>
            <span class="details-tag">Brand</span>
            <input type="text" v-model="product_brand" />
          </div>
          
          <div>
            <span class="details-tag">Product Name</span>
            <input type="text" v-model="product_name" />
          </div>
          
          <div>
            <span class="details-tag">Product Image</span>
            <input type="text" v-model="product_image" />
          </div>

          <div>
            <span class="details-tag">Quantity</span>
            <select name="" id="" v-model="product_quantity">
              <option value="" disabled>Select One</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="Others">Others</option>
            </select>

            <input class="specify" type="text" v-model="product_quantity_box" v-if="product_quantity === 'Others'" />
          </div>

          <div>
            <span class="details-tag">Product Size</span>
            <select name="" id="" v-model="product_size">
              <option value="" disabled>Select One</option>
              <option value="Sample">Sample</option>
              <option value="Mini">Mini</option>
              <option value="Full">Full</option>
            </select>

            <input class="specify" type="text" v-model="product_size_ml" placeholder="Specify product in ml"/>
          </div>

          <div>
            <span class="details-tag">Product Description</span>
            <textarea name="" id="" cols="30" rows="10" v-model="product_description"></textarea>
          </div>

          <hr>

          <div class="edit-buttons">
            <button v-on:click="editProduct">Done</button>
            <button class="delete-product-btn" v-on:click="removeProduct">Delete Product</button>
          </div>

          <div id="danger-message" v-if="deleteMsg === 'Yes'">
            Are you sure you want to delete this product?
            <button class="message-btn" v-on:click="remove(productId)">Delete Product</button>
          </div>

        </div>

      </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-skincare-api.herokuapp.com/";

export default {
  created: async function(){
    // console.log(this.productId)
    let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
    this.product_condition = response.data.productCondition;
    this.product_brand = response.data.productBrand;
    this.product_name = response.data.productName;
    this.product_image = response.data.productImage;
    this.product_quantity = response.data.productQuantity;
    this.product_quantity_box = response.data.productQuantityBox;
    this.product_size = response.data.productType;
    this.product_size_ml = response.data.productSize;
    this.product_description = response.data.productDescription;
    this.comments = response.data.comments;

  },
  props: ['productId'],
  data: function(){
    return{
      'date_posted': '',
      'product_condition': '',
      'product_brand': '',
      'product_name': '',
      'product_image': '',
      'product_quantity': '',
      'product_quantity_box': '',
      'product_size': '',
      'product_size_ml': '',
      'product_description': '',
      'id': '',
      'editSuccess': '',
      'deleteMsg': ''
    }
  },
  methods:{
    'editProduct': async function(){

      await axios.patch(BASE_API_URL + 'requested-products/' + this.productId, {
        'datePosted': this.date_posted,
        'productCondition': this.product_condition,
        'productBrand': this.product_brand,
        'productName': this.product_name,
        'productImage': this.product_image,
        'productQuantity': this.product_quantity,
        'productQuantityBox': this.product_quantity_box,
        'productType': this.product_size,
        'productSize': this.product_size_ml,
        'productDescription': this.product_description
      });

      this.editSuccess = "Yes";
      window.scrollTo(0, 0);

    },
    'removeProduct': function(){
      this.deleteMsg = "Yes";
    },
    'remove': async function(productId){

      await axios.post(BASE_API_URL + 'requested-products/' + this.productId + '/delete',{
        '_id': productId
      });

      window.scrollTo(0, 0);
      this.$emit('back-to');


    }
  }
}
</script>

<style scoped>

.text-container div{
  margin-bottom:25px;
}

</style>
