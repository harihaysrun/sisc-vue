<template>

    <div class="main-container">

      <div class="container">

        <button class="back-btn" v-if="tab === 'productInfo'" v-on:click="backToProducts">
          <svg viewBox="0 0 43.75 15.99">
            <g>
              <polyline class="st0" points="8.07,14.68 1.39,7.99 8.07,1.31 	"/>
              <line class="st0" x1="1.39" y1="7.99" x2="42.37" y2="7.99"/>
            </g>
          </svg>
          Back
        </button>

        <button class="back-btn" v-if="tab === 'editThisProduct'" v-on:click="backToProduct">
          <svg viewBox="0 0 43.75 15.99">
            <g>
              <polyline class="st0" points="8.07,14.68 1.39,7.99 8.07,1.31 	"/>
              <line class="st0" x1="1.39" y1="7.99" x2="42.37" y2="7.99"/>
            </g>
          </svg>
          Back
        </button>
      
      </div>
        
      <ReviewsList v-if="tab === 'viewAllProducts'" v-on:view-product="viewProduct"/>
      <ReviewInfo v-if="tab === 'productInfo'" v-on:edit-product="editProduct" v-bind:productId="productViewing"/>


    </div>
    
</template>

<script>

import ReviewsList from '@/components/review-list';
import ReviewInfo from '@/components/review-info';

export default {
  components: {
    ReviewsList, ReviewInfo
  },
  mounted: function(){
    document.title = "Reviews"
  },
  data: function(){
    return{
      'tab': 'viewAllProducts'
    }
  },
  methods:{
    backToProducts: function(){
      this.tab = "viewAllProducts";
      document.title = "Reviews";
    },
    backToProduct: function(){
      this.tab = "productInfo"
    },
    viewProduct:function(productId){
      this.tab = "productInfo";
      this.productViewing = productId;
      // console.log(this.productViewing)
    },
    editProduct: function(productId){
      this.tab = "editThisProduct";
      this.productEditing = productId;
      // console.log(this.productEditing)
    }
  }
}
</script>

<style scoped>

button{
  margin-top:35px;
  margin-bottom:35px;
}

</style>
