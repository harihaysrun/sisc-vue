<template>

    <div>
        
      <h1>{{product_brand}} {{product_name}}</h1>
      <small>{{productId}}</small>
      
      <div>
        <ul>
          <li>Listing type: {{listing_type}}</li>
          <li>Product condition: {{product_condition}}</li>
          <li>Brand: {{product_brand}}</li>
          <li>Name of product: {{product_name}}</li>
          <li>Product image link: {{product_image}}</li>
          <li v-if="product_category != 'Others'">Product category: {{product_category}}</li>
          <li v-if="product_category === 'Others'">Please specify category: {{product_category_others}}</li>
          <li v-if="product_quantity != 'Others'">Product quantity: {{product_quantity}}</li>
          <li v-if="product_quantity === 'Others'">Product quantity (others): {{product_quantity_box}}</li>
          <li>Size: {{product_size}}</li>
          <li>Size in ml: {{product_size_ml}}</li>
          <li v-if="product_price != 'Specify'">Product price: {{product_price}}</li>
          <li v-if="product_price === 'Specify'">Product price in dollars: {{product_price_box}}</li>
          <li>Description: {{product_description}}</li>
          <li>Skin type:
              <span style="padding:5px 10px; background-color:pink;border-radius:25px;margin-right:10px" v-for="type in skin_type" v-bind:key="type._id">
                {{type}}
              </span>
          </li>
          <li>Skin concerns:
              <span style="padding:5px 10px; background-color:lavender;border-radius:25px;margin-right:10px" v-for="concern in skin_concerns" v-bind:key="concern._id">
                {{concern}}
              </span>
              <!-- {{skin_concerns}} -->
          </li>
          <li>Vegan?: {{product_vegan}}</li>
          <li>Cruelty free?: {{product_cf}}</li>
        </ul>
      </div>

      <button v-on:click="edit(productId)">Edit Product</button>

      <div>
        <h1>Comments section</h1>

      <div>

        <div>
          <label for="">Name</label>
          <input type="text" v-model="comment_name"/>
        </div>
        <div>
          <textarea v-model="comment_text" id="" cols="30" rows="10" placeholder="type comment here"></textarea>
        </div>

        <button v-on:click="comment(productId)">Post Comment</button>

      </div>

      <p>
        Name: {{comment_name}}
        <br>
        Comment: {{comment_text}}
      </p>

      <div>
        <!-- There are no comments -->

        <ol reversed>
          <li v-for="c in comments" v-bind:key="c._id">
            <!-- <input value="commentName" v-model="c_name" disabled/> -->
            <b class="c-name">{{c.commentName}}</b>
            <br>
            <span class="existingComment">
              {{c.commentText}}
            </span>
            <button v-on:click="replyComment(c.commentName)">Reply</button>
            <button v-on:click="deleteComment(c._id)">Delete</button>
            <!-- <button v-on:click="edit(p._id)">Edit</button> -->
            <!-- <a v-on:click="edit(p._id)">Edit</a> -->
          </li>
        </ol>

      </div>

      </div>

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-skincare-api.herokuapp.com/";

export default {
  created: async function(){
    let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
    this.listing_type = response.data.listingType;
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
    this.skin_concerns = response.data.skinConcerns;
    this.product_vegan = response.data.productVegan;
    this.product_cf = response.data.productCrueltyFree;
    this.id = response.data_id;
    this.comments = response.data.comments;

    // console.log(response.data)

  },
  props: ['productId'],
  data: function(){
    return{
      'listing_type': '',
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
      'skin_type': [],
      'skin_concerns': [],
      'product_vegan': '',
      'product_cf': '',
      'id': '',
      'comment_name':'',
      'comment_text': '',
      'comments': []
    }
  },
  methods:{
    'edit': function(productId){
      this.$emit('edit-product', productId)
      // console.log(listing_type)
    },
    'comment': async function(productId){
      console.log(productId);
      await axios.post(BASE_API_URL + 'skincare-products/' + this.productId + '/comment/add', {
        'commentName': this.comment_name,
        'commentText': this.comment_text,
      })

      console.log(Array.isArray(this.comments))

      // if product doesn't have any comments yet, make this.comments ana array
      if(!Array.isArray(this.comments)){
        this.comments = [];
      }

      this.comments.push({
       'commentName': this.comment_name,
       'commentText': this.comment_text,
     })
    },
    'replyComment': function(commentName){
      console.log(commentName)
      this.comment_text = "@" + commentName;
    },
    'deleteComment': async function(commentId){
      console.log(commentId);

      for (let i=0; i< this.comments.length; i++){
        
        if(this.comments[i]._id === commentId){
          // console.log(this.comments[i]._id)
          // console.log(this.comments.indexOf(this.comments[i]));
          let indexOfCommentToDelete = this.comments.indexOf(this.comments[i]);
          this.comments.splice(indexOfCommentToDelete, 1);
        
          await axios.post(BASE_API_URL + 'skincare-products/' + this.productId + '/comment/delete', {
            'commentId': commentId
          });
        }
      }

    }
  }
}
</script>

<style scoped>

</style>
