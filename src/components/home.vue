<template>

    <div>
      <h1>Rules</h1>
          
      <ol>
          <li>Samples must be free</li>
      </ol>

        <ProductsList page-title="Recently Added" max="4" display="none"/>
        <a v-on:click="changetoSkincareProductsPage">View all</a>
        
        <RequestsList page-title="Recent Requests" max="4" display="none"/>
        <a v-on:click="changetoRequestsPage">View all</a>

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
    changetoSkincareProductsPage: function(){
      // this.pageType = "sellGive"
      console.log("click to view all")
      this.$emit("view-all");
    },
    changetoRequestsPage: function(){
      // let pageType = "requests";
      this.$emit("view-requests");
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
