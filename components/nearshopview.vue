<template>
  <div class="nearsearch_wrap ">
    <article class="panel container">
      <p class="panel-heading">
        近くのお店を探す
      </p>
      <div class="panel-block columns is-multiline">
        <div class="column is-one-fifth is-full-mobile">
          <div class="select">
            <select v-model="searchtype">
              <option value="maplatlng">地図の現在座標</option>
              <option value="gpslatlng">GPSの現在座標</option>
            </select>
          </div>
          から
        </div>
        <div class="column is-one-fifth is-full-mobile">
          <div class="select">
            <select v-model="distance">
              <option value="1">1km以内の店舗</option>
              <option value="2">2km以内の店舗</option>
              <option value="3">3km以内の店舗</option>
              <option value="4">4km以内の店舗</option>
              <option value="5">5km以内の店舗</option>
            </select>
          </div>
          を
        </div>
        <div class="column is-one-third is-full-mobile">
          <button class="button is-link is-outlined" @click="getnearshop">
            探す
          </button>
        </div>
      </div>
    </article>

    <article class="panel container">
      <p class="panel-heading">近くのお店一覧</p>
      <div class="panel-block" v-for="(near, index) in nearlist" :key="index">
        {{ near.name }} お店までの距離{{ near.distance }}km
        <a @click="moveshop(near)">お店の地図を見る</a>
      </div>
    </article>
  </div>
</template>
<style>
.nearsearch_wrap {
  padding-top: 2rem;
  height: 100%;
  flex-grow: 1;
  margin-bottom: 1rem;
}
.iconstyle {
  width: 40px !important;
  height: 40px !important;
}
</style>
<script>
export default {
  data() {
    return {
      nearlist: [],
      searchtype: "maplatlng",
      distance: 1,
      lat: 0,
      lng: 0
    };
  },
  computed: {
    get_lat() {
      return this.$store.state.map.lat;
    },
    get_lng() {
      return this.$store.state.map.lng;
    }
  },
  methods: {
    getmappos() {
      this.$nuxt.$emit("GetPos");
    },
    getnearshop() {
      if (this.searchtype == "maplatlng") {
        this.$nuxt.$emit("GetPos");
        this.getnearslist();
      }
      if (this.searchtype == "gpslatlng") {
        navigator.geolocation.getCurrentPosition(
          gps => {
            let pos = {};
            pos.lat = gps.coords.latitude;
            pos.lng = gps.coords.longitude;
            console.log(gps);
            console.log(pos);
            this.$store.commit("map/setpos", pos);
            this.getnearslist();
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    getnearslist() {
      let markers = this.$store.getters["marker/getShopList"];
      let lists = [];
      for (let i in markers) {
        let marker = markers[i];
        let distance = this.getdistance(
          this.get_lat,
          this.get_lng,
          marker.lat,
          marker.lng
        );
        if (distance <= this.distance) {
          marker.distance = Math.round(distance * 1000) / 1000;
          lists.push(marker);
        }
      }
      this.object_array_sort(lists, "distance", "asc", new_data => {
        //ソート後の処理
        this.nearlist = new_data;
      });
    },

    getdistance(lat1, lng1, lat2, lng2) {
      lat1 *= Math.PI / 180;
      lng1 *= Math.PI / 180;
      lat2 *= Math.PI / 180;
      lng2 *= Math.PI / 180;
      return (
        6371 *
        Math.acos(
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
            Math.sin(lat1) * Math.sin(lat2)
        )
      );
    },
    moveshop(shop) {
      this.$store.commit("view/changeview", "mapview");
      this.$nuxt.$emit("MapMove", shop);
    },

    object_array_sort(data, key, order, fn) {
      //デフォは降順(DESC)
      var num_a = -1;
      var num_b = 1;

      if (order === "asc") {
        //指定があれば昇順(ASC)
        num_a = 1;
        num_b = -1;
      }

      data = data.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        if (x > y) return num_a;
        if (x < y) return num_b;
        return 0;
      });

      fn(data); // ソート後の配列を返す
    }
  }
};
</script>
