<template>
    <div>
        <!-- Start Hero -->
        <section class="hero text-center bg-secondary mb-4 text-white">
            <div class="container">
                <h1 class="font-28 fw-600 text-uppercase">
                    Update Design Information
                </h1>
            </div>
        </section>
        <!-- End Hero -->

        <!-- Upload Shot -->
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body p-1" v-if="design.images">
                            <img :src="design.images.large" class="w-100 mb-4" />
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <form class="auth-form" @submit.prevent="submit">
                                <alert-success :form="form">
                                    Design successfully updated
                                </alert-success>
                                <div class="form-group">
                                    <input class="form-control"  :class = "{ 'is-invalid': form.errors.has('title')}" type="text" name="title" v-model="form.title" placeholder="Enter a title">
                                    <has-error :form="form" field="title"></has-error>
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control" :class="{'is-invalid' : form.errors.has('description')}" name="description" id=""  rows="3" placeholder="Enter a description" v-model="form.description"></textarea>
                                    <has-error :form="form" field="description"></has-error>
                                </div>
                                <div class="form-group">
                                    <client-only>
                                        <better-input-tag :tags="form.tags" placeholder="Tags separated by commas" on-paste-delimiter=","></better-input-tag>
                                    </client-only>
                                </div>
                                <template v-if="teams.length">
                                    <div class="form-group custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="assign_to_team" v-model="form.assign_to_team"/>
                                        <label class="custom-control-label" value="true" for="assign_to_team">
                                            Assign to team
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <select :disabled="!form.assign_to_team" class="custom-select" :class="{ 'is-invalid': form.errors.has('team') }" v-model="form.team">
                                            <option :value="null">Select a team</option>
                                            <option v-for="team in teams" :key="team.id" :value="team.id">
                                                {{ team.name }}
                                            </option>
                                        </select>
                                        <has-error :form="form" field="team"></has-error>
                                    </div>
                                </template>
                                <div class="form-group custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="is_live" v-model="form.is_live"/>
                                    <label class="custom-control-label" value="true" for="is_live">
                                        Publish this design
                                    </label>
                                </div>

                                <div class="text-right">
                                    <nuxt-link class="btn btn-warning" :to="{ name: 'settings.designs' }">Cancel</nuxt-link>
                                    <button type="submit" class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
                                         <span v-if="form.busy"><i class="fas fa-spinner fa-spin"></i></span>
                                        Update Design
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Upload Shot -->
    </div>
</template>

<script>
    import BetterInputTag from "better-vue-input-tag"

    export default {
        components:{
            BetterInputTag
        },
        middleware: ['auth'],
        data(){
            return{
                form: this.$vform({
                    title:'',
                    description:'',
                    is_live:false,
                    tags:[],
                    assign_to_team:false,
                    team:null
                })
            }
        },
        async asyncData({$axios, params,error,redirect}){

            try {
                const design =  await $axios.get('/designs/'+params.id)
                const teams =  await $axios.get('/users/teams')
                return {design: design.data.data, teams: teams.data.data}
            }catch (err) {
                if(err.response.status == 403){
                    error({statusCode:404,message:err.response.data.errors.message})
                }else{
                    error({statusCode:404,message:'Internal server error'})
                }
            }
        },
        methods: {
            submit(){
                this.form.put('/designs/'+this.$route.params.id)
                  .then(res => {
                      setTimeout(() => {
                          this.$router.push({name:'settings.dashboard'})
                      },1500)
                  })
                  .catch(err => {
                      console.log(err)
                  })
            }
        },
        mounted(){
            if(this.design){
                Object.keys(this.form).forEach(key => {
                    if(this.design.hasOwnProperty(key)){
                        this.form[key] = this.design[key]
                    }
                })
                this.form.tags = this.design.tag_list.tags || []
                if(this.design.team){
                    this.form.team = this.designs.team.id
                    this.form.assign_to_team = true
                }
            }
        }

    }
</script>