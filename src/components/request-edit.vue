<template>

    <div class="inner-container">

      <div class="details-container">

        <div class="img-container">
          <img v-bind:src="product_image">
        </div>

        <div class="text-container">
        
          <h1>Edit {{product_brand}} {{product_name}}</h1>

          <div id="success-message">Successfully edited product information!</div>

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

          <button v-on:click="editProduct">Edit Product listing</button>
          <button v-on:click="removeProduct">Delete Product</button>

          <div id="danger-message">
            Are you sure you want to delete this product?
            <button v-on:click="remove(productId)">Delete Product</button>
          </div>

        </div>

      </div>

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-skincare-api.herokuapp.com/";

export default {
  created: async function(){
    console.log(this.productId)
    let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
    // this.poster_name = response.data.posterName;
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
  
    console.log(response.data)

  },
  props: ['productId'],
  data: function(){
    return{
      // 'poster_name': '',
      'product_condition': '',
      'product_brand': '',
      'product_name': '',
      'product_image': '',
      'product_quantity': '',
      'product_quantity_box': '',
      'product_size': '',
      'product_size_ml': '',
      'product_description': '',
      'id': ''
    }
  },
  methods:{
    'editProduct': async function(){

      const successMsg = document.getElementById("success-message");
      successMsg.style.display = "block";

      await axios.patch(BASE_API_URL + 'requested-products/' + this.productId, {
        // 'posterName': this.formData.poster_name,
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

.text-container div{
  margin-bottom:25px;
}

</style>
