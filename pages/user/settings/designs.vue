<template>
    <div class="setting-block" >
        <div class="setting-title font-16 fw-500">
            Designs
        </div>
        <div class="setting-body white-bg-color">

            <b-alert
                    :show="dismissCountDown"
                    dismissible
                    :variant="type"
                    @dismissed="dismissCountDown=0"
                   >
                <p>{{message}}</p>
                <b-progress
                        variant="warning"
                        :max="dismissSecs"
                        :value="dismissCountDown"
                        height="4px"
                ></b-progress>
            </b-alert>

            <table class="table table-striped">
                <thead>
                <tr>
                    <td></td>
                    <td>Title</td>
                    <td>Status</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="design in designs" :key="design.u_id">
                    <td>
                        <div v-if="design.images">
                            <img :src="design.images.thumbnail" width="100"  alt="">
                        </div>
                    </td>
                    <td>{{ design.title }}</td>
                    <td> {{ design.is_live ? 'Published' : 'Draft'}}</td>
                    <td>
                        <nuxt-link class="btn btn-primary mr-1" :to="{name: 'designs.edit', params: {id:design.u_id} }">Edit</nuxt-link>
                        <button class="btn btn-danger" :onclick="deleteDesign(design.u_id)"><i class="fa fa-trash"></i>Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        middleware:['auth'],
        data(){
            return{
                designs:[],
                deleted:false,
                dismissSecs: 10,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                message:'',
                type:'success'
            }
        },
        methods:{
            async fetchUsersDesigns(){
                const { data } = await this.$axios.get('/users/'+this.$auth.user.data.id+'/designs')
                this.designs = data.data
            },
            async deleteDesign(id){
                try {
                    const {data } = await this.$axios.delete('designs/'+id)
                    this.dismissCountDown = this.dismissSecs
                    this.message = data.message
                }catch (e) {
                    this.dismissCountDown = this.dismissSecs
                    this.type = "danger"
                }
                this.fetchUsersDesigns();
            }
        },
        created(){
            this.fetchUsersDesigns()
        }

    }
</script>

<style scoped>

</style>