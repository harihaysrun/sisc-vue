<template>
      
      <div class="inner-container">
      
        <div class="details-container">

          <div class="img-container">
            <img v-bind:src="product_image" alt="">
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

        <button class="edit-btn" v-on:click="edit(productId)">Edit Product</button>

        <div>

          <div class="comments-container">
            <h1>Comments section</h1>

            <div>
              <label for="">Name</label>
              <input type="text" v-model="comment_name"/>
            </div>
            <div>
              <label for="">Comment</label>
              <textarea v-model="comment_text" id="" cols="30" rows="10" placeholder="type comment here"></textarea>
            </div>

            <button v-on:click="comment(productId)">Post Comment</button>

          </div>

          <div>
            <!-- There are no comments -->

            <div class="each-comment" v-for="c in comments" v-bind:key="c._id">

              <div>
                <b class="c-name">{{c.commentName}}</b>
              </div>

              <div>
                <span class="existingComment">
                  {{c.commentText}}
                </span>
              </div>

              <div class="comment-buttons">
                <button v-on:click="replyComment(c.commentName)">Reply</button>
                <button v-on:click="deleteComment(c._id)">Delete</button>
              </div>

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
    let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
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

      let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
      this.comments = response.data.comments;

    },
    'replyComment': function(commentName){
      console.log(commentName)
      this.comment_text = "@" + commentName;
    },
    'deleteComment': async function(commentId){
      console.log(commentId);

      for (let i=0; i< this.comments.length; i++){
        
        if(this.comments[i]._id === commentId){
        
          await axios.post(BASE_API_URL + 'skincare-products/' + this.productId + '/comment/delete', {
            'commentId': commentId
          });

          let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
          this.comments = response.data.comments;

        }
      }

    }
  }
}
</script>

<style scoped>

h1, h2, h3, h4{
  margin:0;
  padding:0;
}

.inner-container{
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

/* .img-container{
  background-color:pink;
} */

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

.vegan, .cruelty-free{
  padding:5px 15px;
  background-color:rgb(218, 255, 218);
  border-radius:15px;
  margin-right:10px;
  color:rgb(65, 153, 65);
}

.cruelty-free{
  background-color:mistyrose;
  color:palevioletred;
}

.comments-container{
  margin-top:50px;
  background-color: rgba(0,0,0,0.05);
  padding:25px 35px;
  border-radius: 15px;
  margin-bottom:50px;
}

input[type="text"], textarea{
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
    flex:2;
  }

  .edit-btn{
    padding:15px 25px;
    margin-left:auto;
  }

  input[type="text"]{
    width:250px;
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
    flex:1;
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
