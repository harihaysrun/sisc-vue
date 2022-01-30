<template>

    <div>
        
      <h1>{{product_brand}} {{product_name}}</h1>
      <small>{{productId}}</small>
      
      <div>
        <ul>
          <li>Brand: {{product_brand}}</li>
          <li>Name of product: {{product_name}}</li>
          <li>Product image link: {{product_image}}</li>
          <li>Vegan?: {{product_vegan}}</li>
          <li>Cruelty free?: {{product_cf}}</li>
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
            <b class="c-name">{{c.commentName}}</b>
            <br>
            <span class="existingComment">
              {{c.commentText}}
            </span>
            <button v-on:click="replyComment(c.commentName, c._id)">Reply</button>
            <button v-on:click="deleteComment(c._id)">Delete</button>
          </li>
        </ol>

      </div>

      </div>

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-skincare-api.herokuapp.com/";

// async function reloadComments(){
//   let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
//   this.comments = response.data.comments;
// }

export default {
  created: async function(){
    let response = await axios.get(BASE_API_URL + 'reviews/' + this.productId);
    this.product_brand = response.data.productBrand;
    this.product_name = response.data.productName;
    this.product_image = response.data.productImage;
    this.product_vegan = response.data.productVegan;
    this.product_cf = response.data.productCrueltyFree;
    this.comments = response.data.comments;

  },
  props: ['productId'],
  data: function(){
    return{
      'product_brand': '',
      'product_name': '',
      'product_image': '',
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
      console.log(productId)
    },
    'comment': async function(productId){
      console.log(productId);
      await axios.post(BASE_API_URL + 'requested-products/' + this.productId + '/comment/add', {
        'commentName': this.comment_name,
        'commentText': this.comment_text,
      })
      
      // reloadComments();
      let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
      this.comments = response.data.comments;

      // if(!Array.isArray(this.comments)){
      //   this.comments = [];
      // }

      // this.comments.push({
      //   'commentName': this.comment_name,
      //   'commentText': this.comment_text,
      // })
      
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
          // console.log(this.comments[i]._id)
          // console.log(this.comments.indexOf(this.comments[i]));
          // let indexOfCommentToDelete = this.comments.indexOf(this.comments[i]);
          // this.comments.splice(indexOfCommentToDelete, 1);
        
          await axios.post(BASE_API_URL + 'requested-products/' + this.productId + '/comment/delete', {
            'commentId': commentId
          })
          
          // reloadComments()
          let response = await axios.get(BASE_API_URL + 'requested-products/' + this.productId);
          this.comments = response.data.comments;

        }
      }

      // await axios.post(BASE_API_URL + 'requested-products/' + this.productId + '/comment/delete', {
      //   'commentId': commentId
      // })
    }
  }
}
</script>

<style scoped>

</style>
