<template>

    <div>
      <h1>Rules</h1>
          
      <ol>
          <li>Samples must be free</li>
      </ol>

        <ProductsList page-title="Recently Added" max="4" display="none"/>
        <a v-on:click="changetoSkincareProductsPage('sellGive')">View all</a>
        
        <RequestsList page-title="Recent Requests" max="4" display="none"/>
        <a v-on:click="changetoRequestsPage('requests')">View all</a>

    </div>
    
</template>

<script>

import ProductsList from '@/components/products-list';
import RequestsList from '@/components/request-list';

export default {
  name: 'HelloWorld',
  components: {
    ProductsList, RequestsList
  },
  methods:{
    changetoSkincareProductsPage: function(typeOfPage){
      // this.pageType = "sellGive"
      console.log("click to view all")
      // productsTab = "sellGive"
      console.log('typeOfPage: ' + typeOfPage)
      this.$emit("view-all", typeOfPage);
    },
    changetoRequestsPage: function(typeOfPage){
      // let pageType = "requests";
      console.log("click to view requests")
      console.log('typeOfPage: ' + typeOfPage)
      this.$emit("view-requests", typeOfPage);
      // console.log("click to view requests " + pageType)
    },
    // viewProduct:function(productId){
    //   this.tab = "productInfo";
    //   // console.log(this.tab)
    //   this.productViewing = productId;
    //   console.log(this.productViewing)
    // }
  }
}
</script>

<style scoped>

</style>
