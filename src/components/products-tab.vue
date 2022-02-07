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
        
        <ProductsList page-title="View All Skincare Products" v-if="tab === 'viewAllProducts'" v-on:view-product="viewProduct"/>
        <ProductInfo v-if="tab === 'productInfo'" v-on:edit-product="editProduct" v-bind:productId="productViewing"/>
        <EditProduct v-if="tab === 'editThisProduct'" v-on:remove-product="removeProduct" v-bind:productId="productEditing" v-on:back-to="backToProducts"/>


    </div>
    
</template>

<script>

import ProductsList from '@/components/products-list';
import ProductInfo from '@/components/product-info';
import EditProduct from '@/components/product-edit';

export default {
  components: {
    ProductsList, ProductInfo, EditProduct
  },
  mounted: function(){
    document.title = "Product Marketplace"
  },
  props:['viewThisProduct'],
  data: function(){
    return{
      'pageType': 'sellGive',
      'products': [],
      // 'tab': '',
      'tab': 'viewAllProducts',
      'thisProduct': this.viewThisProduct,
      // 'changeTo': this.changeToTab
      // 'productEditing': productEditing
    }
  },
  methods:{
    // changeToTab: function(){
    //   this.tab = "productInfo";
    //   // this.productViewing = productId;
    // },
    backToProducts: function(){
      console.log("viewing all products now")
      this.tab = "viewAllProducts"
      console.log(this.tab)
      document.title = "Product Marketplace"
    },
    backToProduct: function(){
      this.tab = "productInfo"
    },
    viewProduct:function(productId){
      this.tab = "productInfo";
      // this.tab = changeTo;
      // console.log('changeTo: ' + this.changeTo)
      // this.changeTo = "productInfo";
      // console.log(this.tab)
      this.productViewing = productId;
      // this.thisProduct = productId

      // if (this.thisProduct === productId){
      //   console.log("hello from home!")
      // }
      // console.log(this.productViewing)
      // console.log("thisProduct: " + this.thisProduct)
      // console.log("changeTo: " + this.changeTo)
    },
    editProduct: function(productId){
      this.tab = "editThisProduct";
      this.productEditing = productId;
      console.log(this.productEditing)
    },
    removeProduct: function(productId){
      this.tab = "viewAllProducts";
      // console.log(this.tab)
      this.productToRemove = productId;
      console.log(this.productToRemove)
    },
    viewProducts: function(){
      this.pageType = "sellGive"
    },
    viewRequests: function(){
      this.pageType = "requests"
    }
  }
}
</script>

<style scoped>

/* .main-container{
  padding:35px 0;
} */

button{
  margin-top:35px;
  margin-bottom:35px;
}

</style>
