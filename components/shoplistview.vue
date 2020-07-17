<template>
  <div class="shpplist_wrap ">
    <article
      class="panel is-primary container"
      v-for="(categoryes, categoryname) in getcatlist()"
      :key="categoryname"
    >
      <p class="panel-heading">
        {{ categoryname }}
      </p>
      <div class="panel-block"  v-for="(subcategoryes, subcategoryname) in categoryes"
          :key="subcategoryname" >
        <article
          class="panel is-link "
          style="width:100%;"
        >
          <p class="panel-heading">
            {{ subcategoryname }}
          </p>
          <div class="columns panel-block is-full is-multiline">
          <a class="column is-one-third is-full-mobile" v-for="(shop,shopindex) in subcategoryes" :key="shopindex">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            {{shop.name}}
          </a>
            </div>


        </article>
      </div>
    </article>
  </div>
</template>
<style>
.shpplist_wrap {
  height: 100%;
  flex-grow: 1;
}
</style>
<script>
export default {
  data() {
    return {
      markers: {},
      map: {},
      markerlayer: {},
      layerview: {}
    };
  },

  methods: {
    getcatlist() {
      return this.$store.getters["marker/getAllList"];
    }
  }
};
</script>
