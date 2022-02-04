<template>

    <div class="inner-container">
      
      <div class="details-container">
          
        <div class="img-container">
          <img v-bind:src="product_image" alt="">
            <div class="user">
              <div class="user-icon">

                <svg viewBox="0 0 50 50">
                <g>
                  <path class="st0" d="M9.28,41.45c0-8.68,7.04-15.72,15.72-15.72h0c8.68,0,15.72,7.04,15.72,15.72H9.28z"/>
                  <circle class="st0" cx="25" cy="17.14" r="8.59"/>
                </g>
                </svg>

              </div>
              <div class="user-text">Requested by {{poster_name}}</div>
            </div>
        </div>
        
        <div class="text-container">
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

      <button class="edit-btn" v-on:click="edit(productId)">
        <svg viewBox="0 0 50 50">
          <g>
            <path class="st0" d="M37.67,10.4L37.67,10.4c1.69,1.69,1.69,4.44,0,6.13L18.94,35.26c-0.44,0.44-1.01,0.74-1.63,0.86l-4.54,0.86
              c-1,0.19-1.88-0.69-1.69-1.69l0.86-4.54c0.12-0.62,0.42-1.18,0.86-1.63L31.53,10.4C33.23,8.71,35.97,8.71,37.67,10.4z"/>
            <line class="st1" x1="10.54" y1="40.87" x2="39.46" y2="40.87"/>
          </g>
        </svg>
        Edit Product
      </button>

      <div class="comments-container">
        <h1>Comments section</h1>

        <div class="name-offer">
          <div class="comment-input">
            <label for="">Name</label>
            <input type="text" v-model="comment_name"/>
          </div>
          <div class="comment-input">
            <label for="">Offer</label>
            <input type="text" v-model="comment_offer" placeholder="Free or amount in SGD"/>
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
    
    document.title = this.product_brand + ' ' + this.product_name;

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

h3{
  color:mediumslateblue;
}

input[type="text"], textarea{
    background-color:white;
}

@media screen  and (min-width:768px){


  .text-container{
    flex:3;
  }
  
  .name-offer div:nth-child(2){
    margin-left: 25px;
  }

}

</style>
