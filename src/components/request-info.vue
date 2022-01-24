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
          <li v-if="product_quantity != 'Others'">Product quantity: {{product_quantity}}</li>
          <li v-if="product_quantity === 'Others'">Product quantity (others): {{product_quantity_box}}</li>
          <li>Size: {{product_size}}</li>
          <li>Size in ml: {{product_size_ml}}</li>
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
const BASE_API_URL = "https://3000-harihaysrun-skincareapi-99ltz4b52lr.ws-us27.gitpod.io/";

export default {
  created: async function(){
    let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
    this.listing_type = response.data.listingType;
    this.product_condition = response.data.productCondition;
    this.product_brand = response.data.productBrand;
    this.product_name = response.data.productName;
    this.product_image = response.data.productImage;
    this.product_quantity = response.data.productQuantity;
    this.product_quantity_box = response.data.productQuantityBox;
    this.product_size = response.data.productType;
    this.product_size_ml = response.data.productSize;
    this.comments = response.data.comments;

  },
  props: ['productId'],
  data: function(){
    return{
      'listing_type': '',
      'product_condition': '',
      'product_brand': '',
      'product_name': '',
      'product_image': '',
      'product_quantity': '',
      'product_quantity_box': '',
      'product_size': '',
      'product_size_ml': '',
      'id': '',
      'comment_name':'',
      'comment_text': '',
      'comments': []
    }
  },
  methods:{
    'edit': function(productId){
      this.$emit('edit-product', productId)
      console.log(productId)
    },
    'comment': async function(productId){
      console.log(productId);
      await axios.post(BASE_API_URL + 'requested-products/' + this.productId + '/comment/add', {
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

      await axios.post(BASE_API_URL + 'requested-products/' + this.productId + '/comment/delete', {
        'commentId': commentId
      })
    }
  }
}
</script>

<style scoped>

</style>
