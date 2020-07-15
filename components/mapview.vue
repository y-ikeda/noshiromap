<template>
  <div class="main_wrap">
    Map
    <div id="mapid" style="width: 100%;height: 600px;"></div>
  </div>
</template>
<style>
.main_wrap {
  width: 80%;
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
    setmaker(categorykey) {

      let map = this.map;
      let layers = this.markerlayer;
      let grouplist = this.$store.getters["marker/getGroupKey"];

      for (let i in grouplist) {
        if (this.layerview[grouplist[i]]) {
          map.addLayer(layers[grouplist[i]]);
        } else {
          map.removeLayer(layers[grouplist[i]]);
        }
      }
    },
    resetlayerview(newdata) {
      let grouplist = this.$store.getters["marker/getGroupKey"];
      for (let i in grouplist) {
        this.layerview[grouplist[i]] = false;
      }
      if(newdata){
        this.layerview[newdata] = true
      }
    },
    alllayerview(){
      let grouplist = this.$store.getters["marker/getGroupKey"];
      for (let i in grouplist) {
        this.layerview[grouplist[i]] = true;
      }
    }
  },
  mounted: function() {
    let map = L.map("mapid").setView([40.211766, 140.027104], 15);

    L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
      attribution:
        "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);
    let layers = L.layerGroup();
    let markers = this.$store.getters["marker/getAll"];
    for (let index in markers) {
      let groupkey = markers[index].category + "/" + markers[index].subcategory;
      if (groupkey in layers == false) {
        layers[groupkey] = L.layerGroup();
        map.addLayer(layers[groupkey]);
        this.layerview[groupkey] = true;
      }

      var marker = L.marker([markers[index].lat, markers[index].lng], {
        title: markers[index].name
      });
      marker.bindPopup(markers[index].name).openPopup();
      layers[groupkey].addLayer(marker);
    }
    this.map = map;
    this.markers = markers;
    this.markerlayer = layers;
    this.setmaker("");
  },
  created() {
    this.$nuxt.$on("ViewMap", data => {
      this.resetlayerview(data);
      this.setmaker(data);
    });
    this.$nuxt.$on("ViewMapAll", data => {
      this.alllayerview();
      this.setmaker();
    });
  }
};
</script>
