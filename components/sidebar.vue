<template>
<transition name="slide">
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
  </transition>
</template>
<style>
.menu {
  background-color:rgba(255,255,255);
  width: 300px;
  max-width:90vw;
  position: fixed;
  left:0;
  height:100%;
  z-index:10000;
}
.slide-enter-active, .slide-leave-active {
  left:0;
  transition: all .5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  left:-300px;
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
        this.$store.commit('marker/setsubcategory',{"category":category,"subcategory":subcategory})
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
