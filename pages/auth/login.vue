<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Login
      </h1>
      <form class="auth-form" action="" method="" @submit.prevent="login">

        <alert-error v-if="form.errors.has('verification')" :form="form">
          {{form.errors.get('verification')}} <nuxt-link to="/verification/resend">Resend verification email</nuxt-link>
        </alert-error>



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
        <div class="form-group">
          <input
            type="password"
            name="password"
            v-model="form.password"
            class="form-control form-control-lg font-14 fw-300"
            :class = "{ 'is-invalid': form.errors.has('password')}"
            placeholder="Password"/>
          <has-error :form="form" field="password"></has-error>

        </div>
        <div class="mt-4 mb-4 clearfix">
          <nuxt-link class="forgot-pass color-blue font-14 fw-400" to="/password/email"> Forgot password? </nuxt-link>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
             <span v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            Login
          </button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          Don't have an account yet?
          <nuxt-link to="/register" class="color-blue" > Create an account</nuxt-link>
        </p>
      </form>
    </div>
  </section>
  <!-- End Cards -->
</template>

<script>
  export default {
    name: 'login',
    middleware:['guest'],
    data(){
      return {
        form: this.$vform({
          email:'',
          password:''
        })
      }
    },
    methods:{
      login(){
          this.$auth.loginWith('local',{
            data: this.form
          }).then(res => {
              console.log(res);
          }).catch(err => {
            this.form.errors.set(err.response.data.errors)
          })
      }
    }
  }
</script>

<style scoped>

</style>
