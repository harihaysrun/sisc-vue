<template>

    <div>
        
      <h1>{{product_brand}} {{product_name}}</h1>
      <small>{{productId}}</small>
      
      <div>
        <ul>
          <li>Brand: {{product_brand}}</li>
          <li>Name of product: {{product_name}}</li>
          <li>Product image link: {{product_image}}</li>
          <li>Category: {{product_category}}</li>
          <li>Vegan?: {{product_vegan}}</li>
          <li>Cruelty free?: {{product_cf}}</li>
        </ul>
      </div>

      <!-- <button v-on:click="edit(productId)">Edit Product</button> -->

      <div>
        <h1>Comments section</h1>

      <div>

        <div>
          <label for="">Name</label>
          <input type="text" v-model="comment_name"/>
        </div>
        <div>
          <label for="">My rating</label>
          <select name="" id="" v-model="my_rating">
            <option value="" disabled>select one</option>
            <option value="☆☆☆☆☆">0 Stars</option>
            <option value="★☆☆☆☆">1 Stars</option>
            <option value="★★☆☆">2 Stars</option>
            <option value="★★★☆☆">3 Stars</option>
            <option value="★★★★☆">4 Stars</option>
            <option value="★★★★★">5 Stars</option>
          </select>
        </div>
        <div>
          <label>My skin type:</label>
          <input type="radio" value="Dry" v-model="my_skin_type" /> Dry
          <input type="radio" value="Combination" v-model="my_skin_type" /> Combination
          <input type="radio" value="Oily" v-model="my_skin_type" /> Oily
        </div>
        <div>
          <textarea v-model="comment_text" id="" cols="30" rows="10" placeholder="type comment here"></textarea>
        </div>
        <div>
          <label for="">Will I repurchase this?</label>
          <select name="" id="" v-model="repurchase">
            <option value="" disabled>select one</option>
            <option value="Will repurchase">Yes</option>
            <option value="Won't repurchase">No</option>
          </select>
        </div>

        <button v-on:click="comment(productId)">Post Comment</button>

      </div>

      <p>
        Name: {{comment_name}}
        <br>
        Stars: {{my_rating}}
        <br>
        Skin Type: {{my_skin_type}}
        <br>
        Comment: {{comment_text}}
        <br>
        Stars: {{repurchase}}
        <br>
        Number of reviews: {{ratings}}
      </p>

      <div>
        <!-- There are no comments -->

        <ol>
          <li v-for="c in comments" v-bind:key="c._id">
            <b class="c-name">{{c.commentName}}</b>
            <div class="review-rating">
              {{c.rating}}
              <!-- <ol>
                <li v-for="star in rating" v-bind:key="star._id">
                    A
                </li>
              </ol> -->
            </div>
            <br>
            {{c.skinType}}
            <br>
            {{c.repurchase}}
            <br>
            <span class="existingComment">
              {{c.commentText}}
            </span>
            <!-- <button v-on:click="deleteComment(c._id)">Delete</button> -->
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
    let response = await axios.get(BASE_API_URL + 'reviews/' + this.productId);
    this.product_brand = response.data.productBrand;
    this.product_name = response.data.productName;
    this.product_image = response.data.productImage;
    this.product_category = response.data.productCategory;
    this.product_vegan = response.data.productVegan;
    this.product_cf = response.data.productCrueltyFree;
    this.comments = response.data.reviews;

  },
  props: ['productId'],
  data: function(){
    return{
      'product_brand': '',
      'product_name': '',
      'product_image': '',
      'product_category': '',
      'product_vegan': '',
      'product_cf': '',
      'id': '',
      'comment_name':'',
      'comment_text': '',
      'comments': [],
      'my_rating': '',
      'my_skin_type':'',
      'rating': '',
      'repurchase': '',
      'ratings': ''
    }
  },
  methods:{
    'edit': function(productId){
      this.$emit('edit-product', productId)
      console.log(productId)
    },
    'comment': async function(productId){
      console.log(productId);

      // let response = await axios.get(BASE_API_URL + 'reviews/' + this.productId);
      // this.comments = response.data.reviews;


      // if(Array.isArray(this.comments)){
      //   this.ratings = this.comments.length + 1;
      //   console.log("number of reviews: " + this.ratings)
      // }
      
      if(!Array.isArray(this.comments)){
        this.comments = []
      }
      console.log(this.comments.length)

      this.ratings = this.comments.length + 1;

      await axios.post(BASE_API_URL + 'reviews/' + this.productId + '/comment/add', {
        'commentName': this.comment_name,
        'commentText': this.comment_text,
        'rating': this.my_rating,
        'skinType': this.my_skin_type,
        'repurchase': this.repurchase,
        'noOfReviews': this.ratings,
      })
      
      // reloadComments();
      let response = await axios.get(BASE_API_URL + 'reviews/' + this.productId);
      this.comments = response.data.reviews;

      // console.log("number of reviews: " + this.comments.length);
      // let noOfReviews = this.comments.length;
      // console.log(noOfReviews)

      // await axios.post(BASE_API_URL + 'reviews/' + this.productId + '/comment/add', {
      //   'noOfReviews': noOfReviews,
      // })

      // this.$emit('review-count', noOfReviews);

      // let starRatings = document.querySelectorAll(".review-rating");
      // console.log(starRatings.length)
      // for (let i=0; i<starRatings.length; i++){
      //   starRatings.innerHTML = "HELLO"
      // }
      
    },
    // 'deleteComment': async function(commentId){
    //   console.log(commentId);

    //   for (let i=0; i< this.comments.length; i++){
        
    //     if(this.comments[i]._id === commentId){
        
    //       await axios.post(BASE_API_URL + 'requested-products/' + this.productId + '/comment/delete', {
    //         'commentId': commentId
    //       })
          
    //       let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
    //       this.comments = response.data.comments;

    //     }
    //   }

    // }
  }
}
</script>

<style scoped>

</style>
