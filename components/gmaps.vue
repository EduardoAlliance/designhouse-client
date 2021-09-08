<template>
    <div>
        <client-only>
            <gmap-autocomplete @aplace_changed="handleChange" 
                               :selectFirstOnEnter="true"
                               :options= "{
                               types: ['(cities)']
                               }" >
                <temmplate v-slot:input="slotProps">
                    <input ref="input"
                           :value="formatted_address"
                           class="form-control font-14 fw-300"
                           v-on:listeners="slotProps.listeners"
                           v-on:attrs="slotProps.attrs">
                </temmplate>
            </gmap-autocomplete>

            <GmapMap style="width: 600px; height: 300px;" :zoom="1" :center="{lat: 0, lng: 0}"
                    :options="{
                       zoomControl: true,
                       mapTypeControl: false,
                       scaleControl: false,
                       streetViewControl: false,
                       rotateControl: false,
                       fullscreenControl: true,
                       disableDefaultUi: false
                     }"
            >
            </GmapMap>

        </client-only>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                formatted_address:''
            }
        },
        methods:{
            handleChange(place){
                console.log(place)
            }
        }
    }
</script>

<style scoped>

</style>