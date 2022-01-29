<template>

    <div>

      <p>
        <a v-on:click="viewProducts(productsTab)" v-if="pageType === 'sellGive'" style="background-color:pink">Products</a>
        <a v-on:click="viewProducts(productsTab)" v-else>Products</a>

        <a v-on:click="viewRequests(requestTab)" v-if="pageType === 'requests'" style="background-color:pink">Requests</a>
        <a v-on:click="viewRequests(requestTab)" v-else>Requests</a>
      </p>
      
      <ProductsTab v-if="pageType === 'sellGive'"/>
      <RequestTab v-if="pageType === 'requests'"/>

      <!-- <ProductsTab v-if="pageType === tabName"/>
      <RequestTab v-if="pageType === tabName"/> -->

    </div>
    
</template>

<script>

import ProductsTab from '@/components/products-tab';
import RequestTab from '@/components/request-tab';

export default {
  components: {
    ProductsTab,
    RequestTab
  },
  data: function(){
    return{
      'pageType': ''
    }
  },
  props: ['requestTab', 'tabName', 'productsTab'],
  methods:{
    viewProducts: function(productsTab){
      // this.pageType = "sellGive"
      this.pageType = productsTab
      // this.$emit('products-tab', productsTab)
    },
    viewRequests: function(requestTab){
      this.pageType = requestTab
      // console.log(this.clicked)
    }
  }
}
</script>

<style scoped>

</style>
