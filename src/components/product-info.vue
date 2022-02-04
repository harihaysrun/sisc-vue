<template>
      
      <div class="inner-container">
      
        <div class="details-container">

          <div class="img-container">
            <img v-bind:src="product_image" alt="">
            <div class="sold-by">
              <div class="sold-by-img"><img src="@/assets/images/user.png" alt=""></div>
              <div class="sold-by-text">Sold by {{poster_name}}</div>
            </div>
            <p v-if="is_product_sold === 'Yes'">Product is SOLD. Post a request for a new one!</p>
          </div>

          <div class="text-container">
        
            <h4>{{product_brand}}</h4>
            <h1>{{product_name}}</h1>

            <p>
              <span class="details-tag">Product condition:</span>
              {{product_condition}}
            </p>

            <p v-if="product_category != 'Others'">
              <span class="details-tag">Product category: </span>
              {{product_category}}
            </p>
            <p v-if="product_category === 'Others'">
              <span class="details-tag">Please specify category: </span>
              {{product_category_others}}
            </p>

            <p v-if="product_quantity != 'Others'">
              <span class="details-tag">Product quantity: </span>
              {{product_quantity}}
            </p>
            <p v-if="product_quantity === 'Others'">
              <span class="details-tag">Product quantity (others): </span>
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
                <!-- <span style="padding:5px 10px; background-color:pink;border-radius:15px;margin-right:10px" v-for="type in skin_type" v-bind:key="type._id">
                  {{type}}
                </span> -->
            </p>
            <p>
                <span class="details-tag">Skin concerns:</span>
                {{skin_concerns.join(', ')}}
                <!-- <span style="padding:5px 10px; background-color:lavender;border-radius:15px;margin-right:10px" v-for="concern in skin_concerns" v-bind:key="concern._id">
                  {{concern}}
                </span> -->
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
          <img src="@/assets/images/edit.png" alt="">
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
            <!-- There are no comments -->

            <div class="each-comment" v-for="c in comments" v-bind:key="c._id">

              <div>
                <b class="c-name">{{c.commentName}}</b>
              </div>

              <div>
                  {{c.commentText}}
              </div>

              <div class="comment-buttons">
                <button v-on:click="replyComment(c.commentName)">
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
    this.is_product_sold = response.data.markAsSold;

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
      'is_product_sold': ''
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

      let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
      this.comments = response.data.comments;

    },
    'replyComment': function(commentName){
      console.log(commentName)
      this.comment_text = "@" + commentName;
    },
    'deleteComment': async function(commentId){
      console.log(commentId);
        
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

.inner-container{
  padding:0;
}

input[type="text"], textarea{
    background-color:white;
}

.sold-by{
  margin-top:15px;
  border:1px solid black;
  color:black;
  display:flex;
  flex-direction: row;
  align-items: center;
}

.sold-by-img{
  border:0;
  width:50px;
  height:50px;
  background-color:lightgray;
  border-right:1px solid black;
  box-shadow: 0 0;
  display:flex;
  align-items:center;
  justify-content: center;
}

.sold-by-img img{
  width:20px;
  border:0;
  box-shadow: 0 0;
}

.sold-by-text{
  padding-left:20px;
}

@media screen  and (min-width:768px){

  input[type="text"]{
    display:block;
    width:250px !important;
  }

}

</style>
