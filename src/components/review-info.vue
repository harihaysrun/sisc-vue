<template>

    <div class="inner-container">

      <div class="details-container">
          
        <div class="img-container">
          <img v-bind:src="product_image" alt="">
        </div>

        <div class="text-container">
          <h3>{{product_brand}}</h3>
          <h1>{{product_name}}</h1>

          <p>
            <span class="details-tag">Category:</span>
            {{product_category}}
          </p>

          <p>
            <span v-if="product_vegan === 'Yes'" class="vegan">Vegan Product</span>
            <span v-if="product_cf === 'Yes'" class="cruelty-free">Cruelty Free brand</span>
          </p>

        </div>
        
      </div>

      <!-- <button v-on:click="edit(productId)">Edit Product</button> -->

      <div class="comments-container">
        <h1>Reviews</h1>


        <div class="name-offer">
          <div class="comment-input">
            <label for="">Name</label>
            <input class="name" type="text" v-model="comment_name"/>
          </div>

          <div class="comment-input">
            <label for="">Age</label>
            <div class="age-range">
              <select class="age" name="" id="" v-model="my_age">
                <option value="" disabled>Select One</option>
                <option value="15-20">15-20 Years Old</option>
                <option value="21-25">21-25 Years Old</option>
                <option value="26-30">26-30</option>
                <option value="31-35">31-35</option>
                <option value="36-40">36-40</option>
                <option value="41-45">41-45</option>
                <option value="Others">Others</option>
              </select>

              <input class="specify" type="text" v-model="my_age_others" placeholder="Age" v-if="my_age === 'Others'"/>
            </div>
          </div>

          <div class="comment-input">
            <label for="">My rating</label>
            <select class="rating" name="" id="" v-model="my_rating">
              <option value="" disabled>Select One</option>
              <option value="☆☆☆☆☆">0 Stars</option>
              <option value="★☆☆☆☆">1 Stars</option>
              <option value="★★☆☆">2 Stars</option>
              <option value="★★★☆☆">3 Stars</option>
              <option value="★★★★☆">4 Stars</option>
              <option value="★★★★★">5 Stars</option>
            </select>
          </div>

        </div>

        <div class="skin-types">
          <span>My skin type:</span>
          <input type="radio" value="Dry" v-model="my_skin_type" id="skin-dry"/> <label for="skin-dry">Dry</label>
          &nbsp;&nbsp;
          <input type="radio" value="Normal" v-model="my_skin_type" id="skin-normal"/> <label for="skin-normal">Normal</label>
          &nbsp;&nbsp;
          <input type="radio" value="Combination" v-model="my_skin_type" id="skin-combo"/> <label for="skin-combo">Combination</label>
          &nbsp;&nbsp;
          <input type="radio" value="Oily" v-model="my_skin_type" id="skin-oily"/> <label for="skin-oily">Oily</label>
        </div>

        <div class="comment-input">
          <textarea v-model="comment_text" id="" cols="30" rows="10" placeholder="type comment here"></textarea>
        </div>

        <div class="comment-input">
          <label for="">Will I repurchase this?</label>
          <select class="repurchase" name="" id="" v-model="repurchase">
            <option value="" disabled>Select One</option>
            <option value="Will Repurchase">Yes</option>
            <option value="Won't Repurchase">No</option>
            <option value="Might Repurchase">Maybe</option>
          </select>
        </div>

        <button class="review-btn" v-on:click="comment(productId)">Post Review</button>


      </div>

      <div>
        <!-- There are no comments -->

        <div class="each-comment" v-for="c in comments" v-bind:key="c._id">

          <div class="offer">
              <b>{{c.commentName}}</b>
                <span class="details-tag">{{c.age}} {{c.ageOthers}} years old</span>
                <span class="details-tag">{{c.skinType}} Skin</span>
          </div>

          <div class="existingComment">
            {{c.rating}}
            <p>{{c.commentText}}</p>
            <span class="repurchase-status green" v-if="c.repurchase === 'Will Repurchase'">Will Repurchase</span>
            <span class="repurchase-status red" v-if="c.repurchase === `Won't Repurchase`">Won't Repurchase</span>
            <span class="repurchase-status" v-if="c.repurchase === `Might Repurchase`">{{c.repurchase}}</span>
          </div>

          <div class="comment-buttons">
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
              <!-- <img src="@/assets/images/delete.png" alt=""> -->
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
    let response = await axios.get(BASE_API_URL + 'reviews/' + this.productId);
    this.product_brand = response.data.productBrand;
    this.product_name = response.data.productName;
    this.product_image = response.data.productImage;
    this.product_category = response.data.productCategory;
    this.product_vegan = response.data.productVegan;
    this.product_cf = response.data.productCrueltyFree;
    if (Array.isArray(response.data.reviews)){
      this.comments = response.data.reviews.reverse();
    }
    
    document.title = this.product_brand + ' ' + this.product_name;

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
      'my_age': '',
      'my_age_others': '',
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

      if(!Array.isArray(this.comments)){
        this.comments = []
      }
      // console.log(this.comments.length)

      this.ratings = this.comments.length + 1;
      console.log(this.ratings)

      await axios.post(BASE_API_URL + 'reviews/' + this.productId + '/comment/add', {
        'commentName': this.comment_name,
        'age': this.my_age,
        'ageOthers': this.my_age_others,
        'rating': this.my_rating,
        'skinType': this.my_skin_type,
        'commentText': this.comment_text,
        'repurchase': this.repurchase,
        'noOfReviews': this.ratings,
      })
      
      let response = await axios.get(BASE_API_URL + 'reviews/' + this.productId);
      this.comments = response.data.reviews.reverse();

      this.comment_name = "";
      this.my_age = "";
      this.my_age_others = "";
      this.my_rating = "";
      this.my_skin_type = "";
      this.comment_text = "";
      this.repurchase = "";
      this.ratings = "";

    },
    'deleteComment': async function(commentId){
      console.log(commentId);

      this.ratings = this.comments.length - 1;
      console.log(this.ratings)

      await axios.post(BASE_API_URL + 'reviews/' + this.productId + '/comment/delete', {
            'commentId': commentId,
            'noOfReviews': this.ratings,
          })
          
      let response = await axios.get(BASE_API_URL + 'reviews/' + this.productId);
      this.comments = response.data.reviews.reverse();

    }
  }
}
</script>

<style scoped>

h3{
  color:mediumslateblue;
}

input[type="text"], textarea, select{
    background-color:white;
}

.repurchase-status{
  background-color:#eeeeee;
  color:gray;
  text-transform: uppercase;
  font-size:13px;
  letter-spacing:1px;
  padding: 5px 20px;
  margin-top:25px;
  border-radius:15px;
}

.green, .red{
  padding:5px 15px;
  background-color:rgb(218, 255, 218);
  border-radius:15px;
  margin-right:10px;
  color:rgb(65, 153, 65);
}

.red{
  background-color:mistyrose;
  color:red;
}

.skin-types{
    margin-bottom:15px;
}

.skin-types span{
  display:block;
}

.delete-btn{
  width:100%;
}

.review-btn{
  width:100%;
}

@media screen  and (min-width:768px){

  .text-container{
    flex:4;
  }

  input[type="text"].specify{
    margin:0 !important;
  }

  .each-comment div:first-child,.each-comment div:nth-child(3){
    flex:1.5;
  }

}

@media screen  and (min-width:1024px){

.name-offer{
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
  }

  .name-offer .comment-input{
    margin-right: 25px;
  }

  .name, .rating, .repurchase{
     width:150px !important;
  }

  .age-range{
    display:flex;
    flex-direction: row;
    /* background-color:pink; */
  }

  .age{
    width:150px !important;
    margin-right:0 !important;
  }

  input[type="text"].specify{
    width:150px !important;
    margin-left:15px !important;
  }

  .delete-btn{
    width:auto;
  }

  .review-btn{
    width:auto;
    padding:20px 35px;
  }

}

@media screen  and (min-width:1440px){

  .name, .age, input[type="text"].specify, .rating, .repurchase{
     width:200px !important;
  }

}

</style>
