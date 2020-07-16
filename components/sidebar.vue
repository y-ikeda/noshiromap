<template>
  <aside class="menu" v-show="sideview">
    <p class="menu-label" @click="setallcategory()">
      全て
    </p>
    <div v-for="(cat, idx) in getcatlist()" :key="idx">   
     <p class="menu-label"  @click="setcategory(idx)">
      {{ idx }}
    </p>
    <ul class="menu-list" v-for="(subcat,subidx) in cat" :key="subidx">
      <li><a @click="setsubcategory(idx,subidx)">{{subidx}}({{subcat.length}})</a></li>
    </ul>
    </div>

  </aside>
</template>
<style>
.menu {
  width: 300px;
  max-width:80vw;
}
</style>
<script>
export default {
  methods: {
    getcatlist() {
      return this.$store.getters['marker/getAllList']
    },
    getsubcatlist(category){
        
    },
    setallcategory(){
        this.$store.commit('marker/setsubcategory',"")
        this.$nuxt.$emit("ViewMapAll")
    },
    setcategory(category){
        this.$store.commit('marker/setcategory',category)
        let groupkey = category + "/"
        this.$nuxt.$emit("ViewMap",groupkey)
    },
    setsubcategory(category,subcategory){
        this.$store.commit('marker/setsubcategory',subcategory)
        let groupkey = category + "/" + subcategory
        this.$nuxt.$emit("ViewMap",groupkey)
    }
  },
  computed: {
    sideview(){
      return this.$store.state.menu.menubtn
    },
    getall() {
      return this.$store.getters["marker/getAll"];
    }
  }
};
</script>
