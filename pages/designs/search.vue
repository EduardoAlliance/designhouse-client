<template>
    <div>

        <!-- Start Filters -->
        <section class="filters-block shadow-sm">
            <div class="container">
                <form @submit.prevent="search">
                    <div class="filters d-flex justify-content-between align-items-center">
                        <ul class="filters-dropdown">
                            <li class="dropdown">
                                <select class="custom-select" v-model="filters.orderBy" style="width: 200px;">
                                    <option value="latest">Latest First</option>
                                    <option value="likes">Most Liked First</option>
                                </select>
                            </li>
                        </ul>

                        <div class="d-flex align-items-center">

                            <div class="custom-control mr-3 custom-checkbox">
                                <input type="checkbox" class="custom-control-input" true-value="1" false-value="0" v-model="filters.has_comments" id="hasComments">
                                <label class="custom-control-label"  for="hasComments">Has Comments</label>
                            </div>

                            <div class="custom-control custom-checkbox mr-3">
                                <input type="checkbox" class="custom-control-input"  true-value="1" false-value="0" v-model="filters.has_team" id="hasTeam">
                                <label class="custom-control-label"  for="hasTeam">By Team</label>
                            </div>

                            <div>
                                <div class="input-group mb-0">
                                    <input type="text" class="form-control" v-model="filters.q" placeholder="Search...">
                                    <div class="input-group-append">
                                        <button class="btn rounded primary-bg-color text-white" :disabled="searching" type="submit">
                                            <span v-if="searching"><i class="fas fa-spinner fa-spin"></i></span>
                                            Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <!-- End Filters -->

        <!-- Section Cards -->
        <section class="cards-block">
            <div class="container">
                <div class="row">
                    <div class="w-100 col-sm-6 col-md-3 d-flex flex-column p-3">
                        <div class="bg-white rounded shadow-sm overflow-hidden flex-1 flex flex-col p-1">
                            <a href="#"><div class="bg-cover h-48"style="background-image: url('http://via.placeholder.com/250x200');">
                                    <div class="post-overlay p-4 d-flex flex-column align-items-center justify-content-center">
                                        <h5 class="fw-500 text-uppercase mb-2">
                                            Short title
                                        </h5>
                                        <p class="font-12 lh-16">
                                            Short description here
                                        </p>
                                        <div class="card-datetime font-10 fw-300">
                                            8 hours ago
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div class="p-1 d-flex flex-column">
                                <div class="mb-0 text-secondary d-flex justify-content-between align-items-center">
                                    <a href="#" class=" d-flex text-muted">
                                        <div>
                                            <img src="assets/images/profile.png" width="20" class="profile rounded mr-2"/>
                                        </div>
                                        <h3 class="card-title font-13 mt-1 mb-2 fw-400">
                                            John Doe
                                            <span class="badge badge-pill badge-secondary text-white font-10 pr-1 pl-1 fw-300">+ team</span>
                                        </h3>
                                    </a>
                                    <div class="mr-1 font-10 flex-2">
                                        8 hours ago
                                    </div>
                                </div>
                                <div class="card-datetime fw-300 d-flex justify-content-center">
                                    <div class="ml-1 text-right flex-1">
                                        <ul class="font-12 fw-400 list-inline text-light-gray">
                                            <li class="pt-0 list-inline-item">
                                                <i class="fas fa-thumbs-up"></i>
                                                2332
                                            </li>
                                            <li class="pt-0 list-inline-item">
                                                <i class="fas fa-comments"></i>
                                                299
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- END ROW -->
            </div>
            <!--/ End Container -->
        </section>
        <!-- End Cards -->

    </div>
</template>

<script>
    export default {
        data(){
            return {
                designs:[],
                filters:{
                    has_team:0,
                    has_comments:0,
                    q:'',
                    orderBy:'likes'
                },
                searching:false
            }
        },
        methods:{
            search(){
                this.searching = true;
                this.$axios.get('/search/designs?'+this.query)
                  .then(res => this.designs = res.data.data)
                  .catch(err => console.log(err))
                  .finally(() => this.searching = false)
            }
        },
        computed:{
            query(){
                return  Object.keys(this.filters).map( k => k+"="+this.filters[k]).join('&')
            }
        },
        beforeMount(){
            this.search()
        }
    }
</script>

<style scoped>

</style>