<template>
<nav class="breadcrumb navbar-item" aria-label="breadcrumbs">
  <ul class="">
    <li>{{category}}</li>
    <li v-if="subcategory">／{{subcategory}}</li>
  </ul>
</nav>
</template>      
<script>
export default {
  methods: {
  },
  computed:{
      category(){
          return this.$store.getters["marker/getCategory"]||"全て"
      },
      subcategory(){
          return this.$store.getters["marker/getSubcategory"]
      }
  }
}
</script>