<template>

    <div>
        
      <h1>Edit {{product_brand}} {{product_name}}</h1>

      <div id="success-message">Successfully edited product information!</div>

      <!-- <div>
        <label>I'm looking to...</label>
        <input type="radio" value="sellOrGive" v-model="listing_type" /> Sell or Give this product away
        <input type="radio" value="request" v-model="listing_type" /> Request a product
      </div> -->

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
        <label>Product Category</label>
        <select name="" id="" v-model="product_category">
          <option value="" disabled>select one</option>
          <option value="First Cleanser">First Cleanser</option>
          <option value="Second Cleanser">Second Cleanser</option>
          <option value="Toner">Toner</option>
          <option value="Serum">Serum</option>
          <option value="Essence">Essence</option>
          <option value="Ampoule">Ampoule</option>
          <option value="Treatment">Treatment</option>
          <option value="Moisturiser">Moisturiser</option>
          <option value="Treatment">Treatment</option>
          <option value="Sheet Mask">Sheet Mask</option>
          <option value="Clay Mask">Clay Mask</option>
          <option value="Chemical Exfoliant">Chemical Exfoliant</option>
          <option value="Physical Exfoliant">Physical Exfoliant</option>
          <option value="Eye Cream">Eye Cream</option>
          <option value="Body">Body</option>
          <option value="Others">Others</option>
        </select>

        <input type="text" v-model="product_category_others"  placeholder="Please specify product category" v-if="product_category === 'Others'"/>
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

      <div>
        <label>Price</label>
        <select name="" id="" v-model="product_price">
          <option value="" disabled>select one</option>
          <option value="Free">Free</option>
          <option value="Specify">Specify</option>
        </select>

        <input type="text" v-model="product_price_box" placeholder="Put any value" v-if="product_price === 'Specify'"/>
      </div>

      <div>
        <label>Product Description</label>
        <textarea name="" id="" cols="30" rows="10" v-model="product_description"></textarea>
      </div>

      <div>
        <label>Suitable for skin type</label>
        <input type="checkbox" value="Dry" v-model="skin_type" /> Dry
        <input type="checkbox" value="Combination" v-model="skin_type" /> Combination
        <input type="checkbox" value="Oily" v-model="skin_type" /> Oily
      </div>

      <div>
        <label>Skin concerns:</label>
        <input type="text" v-model="skin_concerns" placeholder="Separate words with commas. E.g redness, irritation, sensitive" />
      </div>

      <div>
        <label>Is this product vegan?</label>
        <input type="radio" value="Yes" v-model="product_vegan" /> Yes
        <input type="radio" value="No" v-model="product_vegan" /> No
        <input type="radio" value="N/A" v-model="product_vegan" /> N/A
      </div>

      <div>
        <label>Is this product/brand cruelty free?</label>
        <input type="radio" value="Yes" v-model="product_cf" /> Yes
        <input type="radio" value="No" v-model="product_cf" /> No
        <input type="radio" value="N/A" v-model="product_cf" /> N/A
      </div>

      <button v-on:click="editProduct">Edit Product listing</button>
      <button v-on:click="removeProduct">Delete Product</button>

      <div id="danger-message">
        Are you sure you want to delete this product?
        <button v-on:click="remove(productId)">Delete Product</button>
      </div>
      
      <div>
        <ul>
          <!-- <li>Listing type: {{listing_type}}</li> -->
          <li>Product condition: {{product_condition}}</li>
          <li>Brand: {{product_brand}}</li>
          <li>Name of product: {{product_name}}</li>
          <li>Product image link: {{product_image}}</li>
          <li>Product quantity: {{product_quantity}}</li>
          <li>Product quantity (others): {{product_quantity_box}}</li>
          <li>Size: {{product_size}}</li>
          <li>Size in ml: {{product_size_ml}}</li>
          <li>Product price: {{product_price}}</li>
          <li>Product price in dollars: {{product_price_box}}</li>
          <li>Description: {{product_description}}</li>
          <li>Skin type: {{skin_type}}</li>
          <li>Skin concerns: {{skin_concerns}}</li>
          <li>Vegan?: {{product_vegan}}</li>
          <li>Cruelty free?: {{product_cf}}</li>
        </ul>
      </div>

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-skincare-api.herokuapp.com/";

export default {
  created: async function(){
    console.log(this.productId)
    let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
    // this.listing_type = response.data.listingType;
    this.product_condition = response.data.productCondition;
    this.product_brand = response.data.productBrand;
    this.product_name = response.data.productName;
    this.product_image = response.data.productImage;
    this.product_quantity = response.data.productQuantity;
    this.product_quantity_box = response.data.productQuantityBox;
    this.product_size = response.data.productType;
    this.product_size_ml = response.data.productSize;
    this.product_price = response.data.productPrice;
    this.product_price_box = response.data.productPriceDollars;
    this.product_description = response.data.productDescription;
    this.skin_type = response.data.skinType;
    this.skin_concerns = response.data.skinConcerns.join();
    this.product_vegan = response.data.productVegan;
    this.product_cf = response.data.productCrueltyFree;
    // this.id = response.data_id;

    console.log(response.data)

  },
  props: ['productId'],
  data: function(){
    return{
      // 'listing_type': '',
      'product_condition': '',
      'product_brand': '',
      'product_name': '',
      'product_image': '',
      'product_category': '',
      'product_category_others': '',
      'product_quantity': '',
      'product_quantity_box': '',
      'product_size': '',
      'product_size_ml': '',
      'product_price': '',
      'product_price_box': '',
      'product_description': '',
      'skin_type': 'Combination',
      'skin_concerns': [],
      'product_vegan': '',
      'product_cf': '',
      'id': ''
    }
  },
  methods:{
    'editProduct': async function(){

      const successMsg = document.getElementById("success-message");
      successMsg.style.display = "block";

      await axios.patch(BASE_API_URL + 'skincare-products/' + this.productId, {
        // 'listingType': this.listing_type,
        'productCondition': this.product_condition,
        'productBrand': this.product_brand,
        'productName': this.product_name,
        'productImage': this.product_image,
        'productCategory': this.product_category,
        'productCategoryOthers': this.product_category_others,
        'productQuantity': this.product_quantity,
        'productQuantityBox': this.product_quantity_box,
        'productType': this.product_size,
        'productSize': this.product_size_ml,
        'productPrice': this.product_price,
        'productPriceDollars': parseInt(this.product_price_box),
        'productDescription': this.product_description,
        'skinType': this.skin_type,
        'skinConcerns': this.skin_concerns.split(','),
        'productVegan': this.product_vegan,
        'productCrueltyFree': this.product_cf
      });

    },
    'removeProduct': function(){
      const dangerMsg = document.getElementById("danger-message");
      dangerMsg.style.display = "block";
    },
    'remove': async function(productId){
      // this.$emit('remove-product', productId);
      console.log("remove this product");

      await axios.post(BASE_API_URL + 'skincare-products/' + this.productId + '/delete',{
        '_id': productId
      });

      // this.$emit('delete-product', productId)


    }
  }
}
</script>

<style scoped>

</style>
