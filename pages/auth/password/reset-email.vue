<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Reset Password
      </h1>
      <form class="auth-form" action="" method="" @submit.prevent="reset">

        <alert-success :form=form>{{ status}}</alert-success>

        <div class="form-group">
          <input
            type="text"
            name="email"
            v-model="form.email"
            class="form-control form-control-lg font-14 fw-300"
            :class = "{ 'is-invalid': form.errors.has('email')}"
            placeholder="Email"/>
          <has-error :form="form" field="email"></has-error>

        </div>

        <div class="text-right">
          <button type="submit" class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
             <span v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            Send Reset Link
          </button>
        </div>
         <p class="font-14 fw-400 text-center mt-4">
          <nuxt-link to="/login" class="color-blue" >Back to login</nuxt-link>
        </p>

      </form>
    </div>
  </section>
  <!-- End Cards -->
</template>

<script>
  export default {
    middleware:['guest'],
    name: 'reset-email',
    data(){
      return {
        status:'',
        form: this.$vform({
          email:''
        })
      }
    },
    methods:{
      reset(){
          this.form.post('password/email')
          .then(res => {
            this.status = res.data.message;
            this.form.reset();
          }).catch(e => console.log(e))
      }
    }
  }
</script>

<style scoped>

</style>
