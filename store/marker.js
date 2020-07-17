/*
import MarkerData from '~/assets/maeker.json'


const sheet = await this.$axios.$get('https://script.google.com/macros/s/AKfycby04vOn0hqNRcJCb5K9k6rkWzAnCb5F6yKHit5LUH9q6bSYXtE/exec')
console.log(sheet)
*/
// 状態管理
export const state = () => ({
    category:"",
    subcategory:"",
    json: {
      marker:[]
    }
})

// getters
export const getters = {
    getCategory(state){
      return state.category
    },
    getSubcategory(state){
      return state.subcategory
    },
    getAll(state){
      return state.json.marker
    },
    getDATA (state) {
      let marker = {}
      console.log(state)
      if(state.subcategory){
        return state.json.marker.filter(function(el){return el.subcategory == this},state.subcategory)
      }
      if(state.category){
        return state.json.marker.filter(function(el){return el.subcategory == this},state.category)
      }

      return state.json.marker
     
    },
    getGroupKey(state){

      let lists = []
      let markers = state.json.marker;
     
      for(let i in markers){
        let marker = markers[i]
        let groupkey = marker.category + "/" + marker.subcategory
        if(groupkey in lists == false){
          lists.push(groupkey)
        }
      }

      return lists
    },
    getAllList(state){
      let lists = {}
      let markers = state.json.marker;
      for(let i in markers){
        let marker = markers[i]
 
        if(marker.category in lists == false){
          lists[marker.category] = {}
        }
        if(marker.subcategory in lists[marker.category] == false){
          lists[marker.category][marker.subcategory] = []
        }
        if(marker.view){
          lists[marker.category][marker.subcategory].push(marker)
        }
       
      }
    
      return lists
    }

  }

  export const mutations = {
    setjsondata(state,value){
      state.json.marker = value
    },
    setsubcategory(state,value){
      console.log(value)
      state.category = value.category
      state.subcategory = value.subcategory
    },
    setcategory(state,value){
      state.category = value
      state.subcategory = ""
    }
  }