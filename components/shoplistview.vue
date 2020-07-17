<template>
  <div class="shpplist_wrap container">
    <article
      class="panel is-primary "
      v-for="(categoryes, categoryname) in getcatlist()"
      :key="categoryname"
    >
      <p class="panel-heading">
        {{ categoryname }}
      </p>
      <div class="panel-block columns is-multiline">
        <article
          class="panel is-link column is-full"
          v-for="(subcategoryes, subcategoryname) in categoryes"
          :key="subcategoryname"
        >
          <p class="panel-heading">
            {{ subcategoryname }}
          </p>
          <a class="panel-block" v-for="(shop,shopindex) in subcategoryes" :key="shopindex">
            <span class="panel-icon">
              <i class="fas fa-book" aria-hidden="true"></i>
            </span>
            {{shop.name}}
          </a>

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
