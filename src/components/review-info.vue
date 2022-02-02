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
            <span class="details-tag">Vegan?</span>
            {{product_vegan}}
          </p>

          <p>
            <span class="details-tag">Cruelty free?</span>
            {{product_vegan}}
          </p>

        </div>
        
      </div>

      <!-- <button v-on:click="edit(productId)">Edit Product</button> -->

      <div class="comments-container">
        <h1>Comments section</h1>


        <div class="name-offer">
          <div>
            <label for="">Name</label>
            <input type="text" v-model="comment_name"/>
          </div>

          <div>
            <label for="">Age range</label>
            <div class="age-range">
              <select class="age" name="" id="" v-model="my_age">
                <option value="" disabled>select one</option>
                <option value="15-20">15-20 Years Old</option>
                <option value="21-25">21-25 Years Old</option>
                <option value="26-30">26-30</option>
                <option value="31-35">31-35</option>
                <option value="36-40">36-40</option>
                <option value="41-45">41-45</option>
                <option value="Others">Others</option>
              </select>

              <input class="myage-others" type="text" v-model="my_age_others" placeholder="Age" v-if="my_age === 'Others'"/>
            </div>
          </div>

          <div>
            <label for="">My rating</label>
            <select class="rating" name="" id="" v-model="my_rating">
              <option value="" disabled>select one</option>
              <option value="☆☆☆☆☆">0 Stars</option>
              <option value="★☆☆☆☆">1 Stars</option>
              <option value="★★☆☆">2 Stars</option>
              <option value="★★★☆☆">3 Stars</option>
              <option value="★★★★☆">4 Stars</option>
              <option value="★★★★★">5 Stars</option>
            </select>
          </div>

        </div>

        <div>
          <label>My skin type:</label>
          <input type="radio" value="Dry" v-model="my_skin_type" /> Dry
          <input type="radio" value="Normal" v-model="my_skin_type" /> Normal
          <input type="radio" value="Combination" v-model="my_skin_type" /> Combination
          <input type="radio" value="Oily" v-model="my_skin_type" /> Oily
        </div>

        <div>
          <textarea v-model="comment_text" id="" cols="30" rows="10" placeholder="type comment here"></textarea>
        </div>

        <div>
          <label for="">Will I repurchase this?</label>
          <select class="repurchase" name="" id="" v-model="repurchase">
            <option value="" disabled>select one</option>
            <option value="Will repurchase">Yes</option>
            <option value="Won't repurchase">No</option>
            <option value="Maybe">Maybe</option>
          </select>
        </div>

        <button v-on:click="comment(productId)">Post Comment</button>


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
            <span class="repurchase-status">{{c.repurchase}}</span>
          </div>

          <div class="comment-buttons">
            <button v-on:click="deleteComment(c._id)">Delete</button>
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
        'age': this.my_age,
        'ageOthers': this.my_age_others,
        'rating': this.my_rating,
        'skinType': this.my_skin_type,
        'commentText': this.comment_text,
        'repurchase': this.repurchase,
        'noOfReviews': this.ratings,
      })
      
      // reloadComments();
      let response = await axios.get(BASE_API_URL + 'reviews/' + this.productId);
      this.comments = response.data.reviews.reverse();

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

h1, h2, h3, h4{
  margin:0;
  padding:0;
}

.inner-container{
  padding:35px 0;
  /* width:80%; */
  display:flex;
  flex-direction: column;
}

.details-container{
  display:flex;
  flex-direction: column;
}

.text-container{
  margin-top:50px;
}

.text-container p{
  margin-bottom:25px;
}

.img-container img{
  width:100%;
  border-radius:25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.details-tag{
  text-transform: uppercase;
  display:block;
  font-size:12px;
  letter-spacing: 1px;
  color:mediumslateblue;
}

.edit-btn{
  padding:15px 25px;
}

.comments-container{
  margin-top:50px;
  background-color: rgba(0,0,0,0.05);
  padding:25px 35px;
  border-radius: 15px;
  margin-bottom:50px;
}

/* .comments-container div{
    margin-bottom:25px;
} */

input[type="text"], textarea, select{
  width:100%;
  font-family: 'Manrope', sans-serif;
  box-sizing: border-box;
  padding:15px 20px;
}

.each-comment{
  /* background-color:azure; */
  display:flex;
  flex-direction:column;
  margin:20px 0;
  padding-bottom:25px;
  border-bottom: 1px solid rgb(236, 236, 236);
}

.each-comment div{
  padding-top:10px;
}

.each-comment b{
  color:mediumslateblue;
}

.offer{
  display:flex;
  flex-direction: column;
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


@media screen  and (min-width:768px){

  .details-container{
    flex-direction: row;
  }

  .img-container{
    flex:1;
    /* background-color:pink; */
  }

  .text-container{
    /* background-color:palegoldenrod; */
    margin-left:50px;
    margin-top:0;
    flex:5;
  }

  .edit-btn{
    margin-left:auto;
  }

  .name-offer{
    display:flex;
    flex-direction:row;
  }
  
  .name-offer div{
    margin-right: 25px;
  }

  input[type="text"], .rating, .repurchase{
    width:250px;
  }

  .age-range{
    width:100% !important;
    display:flex;
    flex-direction: row;
  }

  .myage-others{
    margin-left: 25px;
    margin-right: 0;
  }

  .each-comment{
    flex-direction:row;
    margin:35px 0;
  }

  .each-comment div{
    padding-top:0px;
  }

  .each-comment div:first-child,.each-comment div:nth-child(3){
    /* background-color:pink; */
    flex:1.5;
  }

  .each-comment div:nth-child(2){
    flex:6;
  }

  .each-comment div:nth-child(3){
    display:flex;
    justify-content: flex-end;
    align-items: center;
  }

  .comment-buttons button{
    height:50px;
  }


}

</style>
