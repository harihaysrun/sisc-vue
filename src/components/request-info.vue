<template>

    <div class="inner-container">
      
      <div class="details-container">
          
        <div class="img-container">
          <img v-bind:src="product_image" alt="">
        </div>
        
        <div class="text-container">
          {{poster_name}} is looking for
          <h3>{{product_brand}}</h3>
          <h1>{{product_name}}</h1>

          <p v-if="product_quantity != 'Others'">
            <span class="details-tag">Quantity:</span>
            {{product_quantity}}
          </p>
          <p v-if="product_quantity === 'Others'">
            <span class="details-tag">Quantity (others):</span>
            {{product_quantity_box}}
          </p>

          <p>
            <span class="details-tag">Size:</span>
            {{product_size}}
          </p>
          <p>
            <span class="details-tag">Size in ml:</span>
            {{product_size_ml}}
          </p>

          <p>
            <span class="details-tag">Description: </span>
            {{product_description}}
          </p>

        </div>
      </div>

      <button class="edit-btn" v-on:click="edit(productId)">Edit Product</button>

      <div class="comments-container">
        <h1>Comments section</h1>

        <div class="name-offer">
          <div class="comment-input">
            <label for="">Name</label>
            <input type="text" v-model="comment_name"/>
          </div>
          <div class="comment-input">
            <label for="">Offer</label>
            <input type="text" v-model="comment_offer" placeholder="Free or amount in dollars"/>
          </div>
        </div>
        <div class="comment-input">
          <label for="">Comment</label>
          <textarea v-model="comment_text" id="" cols="30" rows="10" placeholder="Type comment here"></textarea>
        </div>

        <button class="postcmt-btn" v-on:click="comment(productId)">Post Comment</button>

      </div>

      <div>
        <!-- There are no comments -->

          <div class="each-comment" v-for="c in comments" v-bind:key="c._id">
            
            <div class="offer">
              <b class="c-name">{{c.commentName}}</b>
              <div v-if="c.commentOffer">
                <span class="details-tag">offer:</span>
                <span v-if="c.commentOffer != 'Free'">${{c.commentOffer}}</span>
                <span v-else>{{c.commentOffer}}</span>
              </div>
            </div>

            <div class="existingComment">
              {{c.commentText}}
            </div>

            <div class="comment-buttons">
              <button v-on:click="replyComment(c.commentName, c._id)">
                <img src="@/assets/images/reply.png" alt="">
                Reply
              </button>
              <button class="delete-btn" v-on:click="deleteComment(c._id)">
                <img src="@/assets/images/delete.png" alt="">
                Delete
              </button>
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
    let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
    this.poster_name = response.data.posterName;
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
      'poster_name': '',
      'product_brand': '',
      'product_name': '',
      'product_image': '',
      'product_quantity': '',
      'product_quantity_box': '',
      'product_size': '',
      'product_size_ml': '',
      'product_description': '',
      'id': '',
      'comment_name':'',
      'comment_text': '',
      'comment_offer': '',
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
        'commentOffer': this.comment_offer
      })
      
      let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
      this.comments = response.data.comments;

      this.comment_name = "";
      this.comment_offer = "";
      this.comment_text = "";
      
    },
    'replyComment': function(commentName, commentId){
      console.log(commentName)
      console.log(commentId);
      this.comment_text = "@" + commentName;
    },
    'deleteComment': async function(commentId){
      console.log(commentId);

      await axios.post(BASE_API_URL + 'requested-products/' + this.productId + '/comment/delete', {
        'commentId': commentId
      })
      
      let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
      this.comments = response.data.comments;

    }
  }
}
</script>

<style scoped>

input[type="text"], textarea{
    background-color:white;
}

@media screen  and (min-width:768px){

  
  .name-offer div:nth-child(2){
    margin-left: 25px;
  }

}

</style>
