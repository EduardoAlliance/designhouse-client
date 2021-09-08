<template>
    <div class="setting-block" >
        <div class="setting-title font-16 fw-500">
            Account Information
        </div>
        <div class="setting-body white-bg-color">
            <div class="row">
                <div class="col-md-6">
                    <form class="custom-form" @submit.prevent="update">
                        <alert-success :form="form">
                            Profile information updated sucessfully
                        </alert-success>
                        <div class="form-group">
                            <label class="font-14 fw-500">Name</label>
                            <input type="text" name="name" v-model="form.name" class="form-control form-control-lg font-14 fw-300" placeholder="Full Name"
                                   :class = "{ 'is-invalid': form.errors.has('name')}"
                            />
                            <has-error :form="form" field="name"></has-error>
                        </div>
                        <div class="form-group">
                            <label class="font-14 fw-500">Tag Line</label>
                            <input type="text" class="form-control  form-control-lg font-14 fw-300" v-model="form.tagline" placeholder="eg. Senior Graphics Designer"
                                   :class = "{ 'is-invalid': form.errors.has('tagline')}"
                            />
                            <has-error :form="form" field="tagline"></has-error>

                        </div>

                        <div class="form-group">
                            <label class="font-14 fw-500">About me</label>
                            <textarea class="form-control font-14 fw-300" rows="5" v-model="form.about" placeholder="Tell us about you"
                                      :class = "{ 'is-invalid': form.errors.has('about')}"></textarea>
                            <has-error :form="form" field="about"></has-error>

                        </div>

                        <div class="form-group">
                            <label class="font-14 fw-500">Location</label>
                            <input type="text" class="form-control  form-control-lg font-14 fw-300" v-model="form.formatted_address" placeholder="City"/>

                        </div>


                        <div class="custom-control custom-checkbox mt-2 font-14 fw-300">
                            <input type="checkbox" class="custom-control-input" id="checkBox1"/>
                            <label class="custom-control-label" v-model="form.available_to_hire" for="checkBox1">Available to hire?</label>
                        </div>
                        <div class="mt-2 font-14 fw-300">
                            <button type="submit" class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
                                <span v-if="form.busy"><i class="fas fa-spinner fa-spin"></i></span>
                                Update profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Gmap from '../../../components/gmaps'
    export default {
        components:{
            Gmap:Gmap
        },
        data(){
            return {
                form: this.$vform({
                    name:'',
                    tagline:'',
                    about:'',
                    formatted_address:'',
                    location:{},
                    available_to_hire:false

                })
            }
        },
        methods:{
            async update(){
                this.form.put('settings/profile')
                  .then(res => {
                      console.log(res)
                  }).catch(err => {
                      console.log(err.response)
                  })
            }
        },
        mounted(){
            Object.keys(this.form).forEach(k => {
                if(this.$auth.user.data.hasOwnProperty(k)){
                    this.form[k] = this.$auth.user.data[k]
                }
            })

            this.form.location = {
                latitude: this.$auth.user.data.location.coordinates[1],
                longitude: this.$auth.user.data.location.coordinates[0]
            }

        }
    }
</script>

<style scoped>

</style>