<template>

    <div>

      <p>
        <a v-on:click="viewProducts" v-if="pageType === 'sellGive'" style="background-color:pink">Products</a>
        <a v-on:click="viewProducts" v-else>Products</a>

        <a v-on:click="viewRequests" v-if="pageType === 'requests'" style="background-color:pink">Requests</a>
        <a v-on:click="viewRequests" v-else>Requests</a>
      </p>
      
      <ProductsTab v-if="pageType === 'sellGive'"/>
      <RequestTab v-if="pageType === 'requests'"/>

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
      'pageType': 'sellGive'
    }
  },
  methods:{
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

</style>
