<template>
  <div class="modal" :class="{'is-active':modalstatus}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{shop.name}}</p>
        <button class="delete" aria-label="close" @click="closemodale"></button>
      </header>
      <section class="modal-card-body">
        <ul>
          <li>カテゴリー:{{shop.category}} / {{shop.subcategory}}</li>
          <li>住所:{{shop.address}}</li>
          <li>TEL:{{shop.tel}}</li>
        </ul>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="movemap(shop)">お店の地図を見る</button>
        <button class="button" @click="closemodale">閉じる</button>
      </footer>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      modalstatus: false,
      shop: {}
    };
  },
  methods: {
    closemodale() {
      this.modalstatus = false
    },
    movemap(shop){
          this.modalstatus = false
        this.$store.commit("view/changeview", "mapview")
        this.$nuxt.$emit("MapMove", shop)
    }
  },
  created() {
    this.$nuxt.$on("OpenModal", data => {
      this.modalstatus = true
      this.shop = data
    });
  }
};
</script>