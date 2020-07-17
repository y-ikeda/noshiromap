<template>
  <transition name="slide">
    <aside class="menu" v-show="sideview">
      <div class="menu_wrap">
      <p class="menu-label">カテゴリーから探す</p>
      <ul class="menu-list">
        <li><a @click="setallcategory()">全て</a></li>
      </ul>
      <ul class="menu-list" v-for="(cat, idx) in getcatlist()" :key="idx">
        <li><a @click="setcategory(idx)" :class="isCategoryActhive(idx)">{{ idx }}</a></li>
        <li>
            
        <ul
          v-for="(subcat, subidx) in cat"
          :key="subidx"
          v-show="showsubcategory(idx)"
        >
          <li>
            <a
              @click="setsubcategory(idx, subidx)"
              :class="isSubCategoryActhive(idx, subidx)"
              >{{ subidx }}({{ subcat.length }})</a
            >
          </li>
        </ul>
         
        </li>
      </ul>
      </div>
    </aside>
  </transition>
</template>
<style>
.menu {
  background-color: rgba(255, 255, 255);
  width: 300px;
  max-width: 90vw;
  position: absolute;
  left: 0;
  height: 100%;
  overflow-y: auto;
  z-index: 10000;
}

.slide-enter-active,
.slide-leave-active {
  left: 0;
  transition: all 0.5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  left: -300px;
}
</style>
<script>
export default {
  methods: {
    getcatlist() {
      return this.$store.getters["marker/getAllList"];
    },
    getsubcatlist(category) {},
    setallcategory() {
      this.$store.commit("marker/setsubcategory", "");
      this.$nuxt.$emit("ViewMapAll");
    },
    setcategory(category) {
      this.$store.commit("marker/setcategory", category);
      let groupkey = category + "/";
      this.$nuxt.$emit("ViewMap", groupkey);
    },
    setsubcategory(category, subcategory) {
      this.$store.commit("marker/setsubcategory", {
        category: category,
        subcategory: subcategory
      });
      let groupkey = category + "/" + subcategory;
      this.$nuxt.$emit("ViewMap", groupkey);
    },
    showsubcategory(category) {
      return category == this.$store.state.marker.category;
    },
    isCategoryActhive(category) {
      if (
        this.$store.state.marker.category == category &&
        !this.$store.state.marker.subcategory
      ) {
        return "is-active";
      }
    },
    isSubCategoryActhive(category, subcategory) {
      if (
        this.$store.state.marker.category == category &&
        this.$store.state.marker.subcategory == subcategory
      ) {
        return "is-active";
      }
    }
  },
  computed: {
    sideview() {
      return this.$store.state.menu.menubtn;
    },
    getall() {
      return this.$store.getters["marker/getAll"];
    }
  }
};
</script>
