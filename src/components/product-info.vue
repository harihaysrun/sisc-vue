<template>
      
      <div class="container">
      
        <div class="details-container">

          <div class="img-container">
            <img v-bind:src="product_image" alt="">

            <div class="user">
              <div class="user-icon">
                <img src="@/assets/images/user.png" alt="">
              </div>
              <div class="user-text">Sold by {{poster_name}}</div>
            </div>

          </div>

          <div class="text-container">
        
            <h3>{{product_brand}}</h3>
            <h1>{{product_name}}</h1>

            <p>
              <span class="details-tag">Product condition:</span>
              {{product_condition}}
            </p>

            <p v-if="product_category != 'Others'">
              <span class="details-tag">Category: </span>
              {{product_category}}
            </p>
            <p v-if="product_category === 'Others'">
              <span class="details-tag">Please specify category: </span>
              {{product_category_others}}
            </p>

            <p v-if="product_quantity != 'Others'">
              <span class="details-tag">Quantity: </span>
              {{product_quantity}}
            </p>
            <p v-if="product_quantity === 'Others'">
              <span class="details-tag">Quantity (others): </span>
              {{product_quantity_box}}
            </p>

            <p>
              <span class="details-tag">Size:</span>
              {{product_size}}, {{product_size_ml}}ml
            </p>

            <p v-if="product_price != 'Specify'">
              <span class="details-tag">Price: </span>
              {{product_price}}
            </p>
            <p v-if="product_price === 'Specify'">
              <span class="details-tag">Price: </span>
              ${{product_price_box}}
            </p>
            
            <p>
                <span class="details-tag">Recommended skin type:</span>
                {{skin_type.join(', ')}}
            </p>
            <p>
                <span class="details-tag">Skin concerns:</span>
                {{skin_concerns.join(', ')}}
            </p>

            <p>
              <span class="details-tag">Description: </span>
              {{product_description}}
            </p>

            <p>
              <span v-if="product_vegan === 'Yes'" class="vegan">Vegan Product</span>
              <span v-if="product_cf === 'Yes'" class="cruelty-free">Cruelty Free brand</span>
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

        <div>

          <div class="comments-container">
            <h1>Comments section</h1>

            <div class="comment-input">
              <label for="">Name</label>
              <input type="text" v-model="comment_name"/>
            </div>
            <div class="comment-input">
              <label for="">Comment</label>
              <textarea v-model="comment_text" id="" placeholder="type comment here"></textarea>
            </div>

            <button class="postcmt-btn" v-on:click="comment(productId)">Post Comment</button>

          </div>

          <div>

            <p class="no-comments" v-if="!Array.isArray(comments) || comments.length === 0">There are no comments</p>

            <div class="each-comment" v-for="c in comments" v-bind:key="c._id">

              <div>
                <b class="c-name" v-if="!c.commentName">{{c.commentName}}</b>
                <b class="c-name" v-else-if="c.commentName.toLowerCase() === poster_name.toLowerCase() || poster_name.toLowerCase().includes(c.commentName.toLowerCase())">[OP] {{c.commentName}}</b>
                <b class="c-name" v-else>{{c.commentName}}</b>
              </div>

              <div>
                  {{c.commentText}}
              </div>

              <div class="comment-buttons">
                <button class="reply-btn" v-on:click="replyComment(c.commentName)">
                  <img src="@/assets/images/reply.png" alt="">
                  Reply
                </button>
                <button class="delete-btn" v-on:click="deleteComment(c._id)">
                  <svg viewBox="0 0 35.83 41.57">
                    <g>
                      <path class="st0" d="M28.31,39.27H7.51c-1.5,0-2.72-1.22-2.72-2.72v-25h26.23v25C31.03,38.06,29.81,39.27,28.31,39.27z"/>
                      <path class="st0" d="M31.75,11.56H4.08c-1.09,0-1.97-0.88-1.97-1.97v-1.5c0-1.09,0.88-1.97,1.97-1.97h27.66
                        c1.09,0,1.97,0.88,1.97,1.97v1.5C33.71,10.68,32.83,11.56,31.75,11.56z"/>
                      <path class="st0" d="M23.18,6.13H12.65V5.01c0-1.5,1.22-2.72,2.72-2.72h5.1c1.5,0,2.72,1.22,2.72,2.72V6.13z"/>
                      <g>
                        <line class="st1" x1="11.55" y1="15.43" x2="11.55" y2="35.41"/>
                        <line class="st1" x1="17.91" y1="15.43" x2="17.91" y2="35.41"/>
                        <line class="st1" x1="24.27" y1="15.43" x2="24.27" y2="35.41"/>
                      </g>
                    </g>
                  </svg>
                  Delete
                </button>
              </div>

            </div>
  
          </div>

        </div>
      </div>
    
</template>

<script scoped>


</script>


<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-skincare-api.herokuapp.com/";

export default {
  created: async function(){
    let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
    this.poster_name = response.data.posterName;
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
    // this.is_product_sold = response.data.markAsSold;
    
    document.title = this.product_brand + ' ' + this.product_name;
  },
  props: ['productId'],
  data: function(){
    return{
      'poster_name': '',
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
      'comments': [],
      // 'is_product_sold': ''
    }
  },
  methods:{
    'edit': function(productId){
      this.$emit('edit-product', productId)
    },
    'comment': async function(productId){
      await axios.post(BASE_API_URL + 'skincare-products/' + this.productId + '/comment/add', {
        'commentName': this.comment_name,
        'commentText': this.comment_text,
      })

      let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
      this.comments = response.data.comments;

    },
    'replyComment': function(commentName){
      this.comment_text = "@" + commentName;
    },
    'deleteComment': async function(commentId){
        
      await axios.post(BASE_API_URL + 'skincare-products/' + this.productId + '/comment/delete', {
        'commentId': commentId
      });

      let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
      this.comments = response.data.comments;

    }
  }
}
</script>

<style scoped>

h3{
  color:mediumslateblue !important;
}

.inner-container{
  padding:0;
}

input[type="text"], textarea{
    background-color:white;
}

@media screen  and (min-width:768px){

  input[type="text"]{
    display:block;
    width:250px !important;
  }

}

</style>
