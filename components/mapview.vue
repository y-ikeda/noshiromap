<template>
  <div class="map_wrap">
    <div id="mapid" style="width: 100%;height: 100%;"></div>
    <information></information>
  </div>
</template>
<style>
.map_wrap {
  height: 100%;
  flex-grow: 1;
}
</style>
<script>
import information from "~/components/informationbox.vue"; // コンポーネント読み込み
export default {
  data() {
    return {
      markers: {},
      map: {},
      markerlayer: {},
      layerview: {},
      markerdata:{}
    };
  },
  components: {
    information
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
      let category = this.$store.getters["marker/getCategory"];
      let subcategory = this.$store.getters["marker/getSubcategory"];
      for (let i in grouplist) {
        if (
          (category && grouplist[i].indexOf(category) != -1 && !subcategory) ||
          grouplist[i] == newdata
        ) {
          this.layerview[grouplist[i]] = true;
        } else {
          this.layerview[grouplist[i]] = false;
        }
      }
    },
    alllayerview() {
      let grouplist = this.$store.getters["marker/getGroupKey"];
      for (let i in grouplist) {
        this.layerview[grouplist[i]] = true;
      }
    },
    setinformation(marker) {
      this.$nuxt.$emit("Setinformation", marker)
    },
    getpos(){
      return this.map.getCenter()
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

      if (markers[index].view && markers[index].lat && markers[index].lng) {
        let icon = markers[index].iconname || "place";
        let iconColor = markers[index].iconcolor || "#fff";
        let markerColor = markers[index].iconbackgroundcolor || "#00f";

        var markericon = L.IconMaterial.icon({
          icon: icon, // Name of Material icon
          iconColor: iconColor, // Material icon color (could be rgba, hex, html name...)
          markerColor: markerColor, // Marker fill color
          outlineColor: "black", // Marker outline color
          outlineWidth: 1 ,// Marker outline width
          popupAnchor: [0, -32]      
        });
        var marker = L.marker([markers[index].lat, markers[index].lng], {
          title: markers[index].name,
          icon: markericon
        }).on("click", e => {
          this.setinformation(markers[index])
        });
        this.markerdata[markers[index].name] = marker
        marker.bindPopup(markers[index].name).openPopup();
        layers[groupkey].addLayer(marker);
      }
    }
    map.on("click",e => {
       this.$nuxt.$emit("Removeinformation")
    })
    this.map = map
    this.markers = markers
    this.markerlayer = layers

    this.setmaker("")
  },
  created() {
    this.$nuxt.$on("ViewMap", data => {
      this.resetlayerview(data);
      this.setmaker(data);
    })
    this.$nuxt.$on("ViewMapAll", data => {
      this.alllayerview();
      this.setmaker();
    })
    
    this.$nuxt.$on("MapMove", data => {
      this.alllayerview();
      this.setinformation(data);
      let zoom = data.zoom || 18;
  
      this.map.flyTo([data.lat, data.lng], zoom, { duration: 1,animate:false })
      //this.markerdata[data.name].bindPopup(data.name).openPopup()
    })
    this.$nuxt.$on("GetPos", data => {
      if(this.map){
      
      let pos = this.map.getCenter()
      this.$store.commit("map/setpos",pos)
    
      }

    })
  }
};
</script>
