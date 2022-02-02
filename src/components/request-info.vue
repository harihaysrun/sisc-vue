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

        </div>
      </div>

      <button class="edit-btn" v-on:click="edit(productId)">Edit Product</button>

      <div class="comments-container">
        <h1>Comments section</h1>

        <div class="name-offer">
          <div>
            <label for="">Name</label>
            <input type="text" v-model="comment_name"/>
          </div>
        <div>
          <label for="">Offer</label>
          <input type="text" v-model="comment_offer" placeholder="Free or amount in dollars"/>
        </div>
        </div>
        <div>
          <label for="">Comment</label>
          <textarea v-model="comment_text" id="" cols="30" rows="10" placeholder="Type comment here"></textarea>
        </div>

        <button v-on:click="comment(productId)">Post Comment</button>

        <p>
          Name: {{comment_name}}
          <br>
          Offer: {{comment_offer}}
          <br>
          Comment: {{comment_text}}
        </p>

      </div>

      <div>
        <!-- There are no comments -->

          <div class="each-comment" v-for="c in comments" v-bind:key="c._id">
            
            <div class="offer">
              <b class="c-name">{{c.commentName}}</b>
              <span class="details-tag">offer:</span>
              <span v-if="c.commentOffer != 'Free'">${{c.commentOffer}}</span>
              <span v-else>{{c.commentOffer}}</span>
            </div>

            <div class="existingComment">
              {{c.commentText}}
            </div>

            <div class="comment-buttons">
              <button v-on:click="replyComment(c.commentName, c._id)">Reply</button>
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
    let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
    this.poster_name = response.data.posterName;
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
      'poster_name': '',
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
      
    },
    'replyComment': function(commentName, commentId){
      console.log(commentName)
      console.log(commentId);
      this.comment_text = "@" + commentName;
    },
    'deleteComment': async function(commentId){
      console.log(commentId);

      for (let i=0; i< this.comments.length; i++){
        
        if(this.comments[i]._id === commentId){

          await axios.post(BASE_API_URL + 'requested-products/' + this.productId + '/comment/delete', {
            'commentId': commentId
          })
          
          let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
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
  padding:35px 0;
  width:80%;
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

.offer{
  display:flex;
  flex-direction: column;
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
    margin-left:auto;
  }

  .name-offer{
    display:flex;
    flex-direction:row;
  }
  
  .name-offer div:nth-child(2){
    margin-left: 25px;
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
