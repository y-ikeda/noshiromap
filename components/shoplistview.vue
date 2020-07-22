<template>
  <div class="shpplist_wrap ">
    <article class="panel container">
      <p class="panel-heading">
        絞り込み
      </p>
      <div class="panel-block">
        店名、住所から絞り込めます
      </div>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Search"
            v-model="keyword"
          />
          <span class="material-icons icon is-left iconstyle">search</span>
        </p>
      </div>
      <div class="panel-block">
        <p class="control btn-group">
          <a
            class="button is-link is-outlined catbtn"
            v-for="cat in grouplist"
            :key="cat"
            :href="'#' + cat"
          >
            {{ cat }}
          </a>
        </p>
      </div>
    </article>
    <article
      :id="categoryname"
      class="panel is-primary container"
      v-for="(categoryes, categoryname) in shoplist"
      :key="categoryname"
    >
      <p class="panel-heading">
        {{ categoryname }}
      </p>
      <div
        class="panel-block"
        v-for="(subcategoryes, subcategoryname) in categoryes"
        :key="subcategoryname"
      >
        <article class="panel is-link " style="width:100%;">
          <p class="panel-heading">
            {{ subcategoryname }}
          </p>
          <div class="columns panel-block is-full is-multiline">
            <a
              class="column is-one-third is-full-mobile"
              v-for="(shop, shopindex) in subcategoryes"
              :key="shopindex"
              @click="openmodal(shop)"
            >
              <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
              </span>
              {{ shop.name }}
            </a>
          </div>
        </article>
      </div>
    </article>
    <modal></modal>
    <totop></totop>
  </div>
</template>
<style scoped>
.btn-group{
  display:flex;
  flex-flow:row wrap;
}
.shpplist_wrap {
  padding-top: 2rem;
  height: 100%;
  flex-grow: 1;
  margin-bottom: 1rem;
}
.iconstyle {
  width: 40px !important;
  height: 40px !important;
}
.catbtn{
  margin:2px;
  flex-grow:1;
}
</style>
<script>
import modal from "~/components/modal.vue"; // コンポーネント読み込み
import totop from "~/components/totop.vue"; // コンポーネント読み込み
export default {
  components: {
    modal,
    totop
  },
  data() {
    return {
      keyword: "",
      markers: {},
      map: {},
      markerlayer: {},
      layerview: {},
      lat: 0,
      lng: 0
    };
  },
  computed: {
    grouplist() {
      return Object.keys(this.getcatlist());
    },
    shoplist(){
      return this.getcatlist()
    }
  },
  methods: {
    getcatlist() {
      let markers = this.$store.getters["marker/getShopList"];
      let lists = {};
      if (this.keyword) {
        markers = markers.filter(function(el) {
          return el.name.indexOf(this) != -1 || el.address.indexOf(this) != -1;
        }, this.keyword);
      }
      for (let i in markers) {
        let marker = markers[i];

        if (marker.category in lists == false) {
          lists[marker.category] = {};
        }
        if (marker.subcategory in lists[marker.category] == false) {
          lists[marker.category][marker.subcategory] = [];
        }
        if (marker.view && marker.lat && marker.lng) {
          lists[marker.category][marker.subcategory].push(marker);
        }
      }

      return lists;
    },
    openmodal(shop) {
      this.$nuxt.$emit("OpenModal", shop);
    }
  }
};
</script>
