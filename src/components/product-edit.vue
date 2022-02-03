<template>

    <!-- <div class="inner-container"> -->

      <div class="details-container">

        <div class="img-container">
          <img v-bind:src="product_image">
        </div>

        <div class="text-container">

          <h1>Edit {{product_brand}} {{product_name}}</h1>

          <div id="success-message" v-if="editSuccess === 'Yes'">Successfully edited product information!</div>

          <div>
            <span class="details-tag">Product condition</span>
            <input type="radio" id="condition-new" value="New" v-model="product_condition"><label for="condition-new">Brand New</label>
            <input type="radio" id="condition-used" value="Used" v-model="product_condition"><label for="condition-used">Used</label>
            <div class="reminder-message" v-if="product_condition === 'Used'">Please remember to sanitize any used products before handing them off to someone else!</div>
          </div>

          <div>
            <label class="details-tag">Brand</label>
            <input type="text" v-model="product_brand" />
          </div>
          
          <div>
            <label class="details-tag">Product Name</label>
            <input type="text" v-model="product_name" />
          </div>
          
          <div>
            <label class="details-tag">Product Image</label>
            <input type="text" v-model="product_image" />
          </div>

          <div>
            <label class="details-tag">Product Category</label>
            <select name="" id="" v-model="product_category">
              <option value="" disabled>Select One</option>
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
              <option value="Body Cream">Body Cream</option>
              <option value="Sunscreen">Sunscreen</option>
              <option value="Others">Others</option>
            </select>

            <input class="specify" type="text" v-model="product_category_others"  placeholder="Please specify product category" v-if="product_category === 'Others'"/>
          </div>

          <div class="details-tag">
            <label class="details-tag">Quantity</label>
            <select name="" id="" v-model="product_quantity">
              <option value="" disabled>Select One</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="Others">Others</option>
            </select>

            <input class="specify" type="text" v-model="product_quantity_box" v-if="product_quantity === 'Others'" />
          </div>

          <div>
            <label class="details-tag">Product Size</label>
            <select name="" id="" v-model="product_size">
              <option value="" disabled>Select One</option>
              <option value="Sample">Sample</option>
              <option value="Mini">Mini</option>
              <option value="Full">Full</option>
            </select>

            <input class="specify" type="text" v-model="product_size_ml" />
          </div>

          <div>
            <label class="details-tag">Price</label>
            <select name="" id="" v-model="product_price">
              <option value="" disabled>Select One</option>
              <option value="Free">Free</option>
              <option value="Specify">Specify</option>
            </select>

            <input class="specify" type="text" v-model="product_price_box" placeholder="Put any value" v-if="product_price === 'Specify'"/>
            <!-- <input type="text" v-model="product_price_box" placeholder="Put any value"/> -->
          </div>

          <div>
            <label class="details-tag">Product Description</label>
            <textarea name="" id="" cols="30" rows="10" v-model="product_description"></textarea>
          </div>

          <div>
            <label class="details-tag">Suitable for skin type</label>
            <input type="checkbox" value="Dry" v-model="skin_type" id="skin-dry"/> <label for="skin-dry">Dry</label>
          &nbsp;&nbsp;
          <input type="checkbox" value="Normal" v-model="skin_type" id="skin-normal"/> <label for="skin-normal">Normal</label>
          &nbsp;&nbsp;
          <input type="checkbox" value="Combination" v-model="skin_type" id="skin-combo"/> <label for="skin-combo">Combination</label>
          &nbsp;&nbsp;
          <input type="checkbox" value="Oily" v-model="skin_type" id="skin-oily"/> <label for="skin-oily">Oily</label>
          </div>

          <div>
            <label class="details-tag">Skin concerns:</label>
            <input type="text" v-model="skin_concerns" placeholder="Separate words with commas. E.g redness, irritation, sensitive" />
          </div>

          <div>
            <label class="details-tag">Is this product vegan?</label>
          <input type="radio" value="Yes" v-model="product_vegan" id="vegan-yes" /> <label for="vegan-yes">Yes</label>
          &nbsp;&nbsp;
          <input type="radio" value="No" v-model="product_vegan" id="vegan-no" /> <label for="vegan-no">No</label>
          &nbsp;&nbsp;
          <input type="radio" value="N/A" v-model="product_vegan" id="vegan-na" /> <label for="vegan-na">N/A</label>
          </div>

          <div>
            <label class="details-tag">Is this product/brand cruelty free?</label>
          <input type="radio" value="Yes" v-model="product_cf" id="cf-yes"/> <label for="cf-yes">Yes</label>
          &nbsp;&nbsp;
          <input type="radio" value="No" v-model="product_cf" id="cf-no"/> <label for="cf-no">No</label>
          &nbsp;&nbsp;
          <input type="radio" value="N/A" v-model="product_cf" id="cf-na"/> <label for="cf-na">N/A</label> 
          </div>

          <hr>

          <div class="edit-buttons">
            <button v-on:click="editProduct">Done</button>
            <button class="delete-product-btn" v-on:click="removeProduct">Delete Product</button>
            <!-- <button v-on:click="markAsSold">Mark As Sold</button> -->
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
    console.log(this.productId)
    let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
    // this.poster_name = response.data.posterName;
    this.product_condition = response.data.productCondition;
    this.product_brand = response.data.productBrand;
    this.product_name = response.data.productName;
    this.product_image = response.data.productImage;
    this.product_category = response.data.productCategory;
    this.product_category_others = response.data.productCategoryOthers;
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
      // 'poster_name': '',
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
      'product_price_box': '0',
      'product_description': '',
      'skin_type': [],
      'skin_concerns': [],
      'product_vegan': '',
      'product_cf': '',
      'id': '',
      'sold': '',
      'editSuccess': '',
      'deleteMsg': ''
    }
  },
  methods:{
    'editProduct': async function(){

      // const successMsg = document.getElementById("success-message");
      // successMsg.style.display = "block";

      await axios.patch(BASE_API_URL + 'skincare-products/' + this.productId, {
        // 'posterName': this.formData.poster_name,
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

      this.editSuccess = "Yes";
      window.scrollTo(0, 0);


    },
    'removeProduct': function(){

      this.deleteMsg = "Yes";

    },
    'remove': async function(productId){
      console.log("remove this product");

      await axios.post(BASE_API_URL + 'skincare-products/' + this.productId + '/delete',{
        '_id': productId
      });

      window.scrollTo(0, 0);
      this.$emit('back-to');
      
    },
    markAsSold: async function(){
      this.sold = "Yes"
      console.log(this.sold)
      await axios.post(BASE_API_URL + 'skincare-products/' + this.productId + '/sold', {
        'markAsSold': this.sold,
      });
    }
  },
}
</script>

<style scoped>

.text-container div{
  margin-bottom:25px;
}

@media screen  and (min-width:768px){

  .img-container{
    flex:1;
    height:25vw;
    /* background-color:pink; */
    position:sticky;
    top: 120px;
  }

}

</style>
