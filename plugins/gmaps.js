import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'

Vue.use(VueGoogleMaps, {
    load:{
        key:'AIzaSyDwo7jYxMRLnnpKrmqJHNpQFrBpe4DuZKg',
        libraries: 'places'
    }
})