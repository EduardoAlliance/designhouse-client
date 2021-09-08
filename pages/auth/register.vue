<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Register
      </h1>
      <form class="auth-form" @submit.prevent="submit">

        <alert-success :form="form">We have sent you an email to activate your account.</alert-success>


        <div class="form-group">
          <input
            type="text"
            name="name"
            class="form-control form-control-lg font-14 fw-300"
            :class = "{ 'is-invalid': form.errors.has('name')}"
            placeholder="Full Name"
            v-model.trim="form.name"
          />
          <has-error :form="form" field="name"></has-error>
        </div>

        <div class="form-group">
          <input
            type="text"
            name="email"
            v-model="form.email"
            class="form-control form-control-lg font-14 fw-300"
            :class = "{ 'is-invalid': form.errors.has('email')}"
            placeholder="Email"/>
          <has-error :form="form" field="name"></has-error>

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
        <div class="form-group">
          <input
            type="password"
            v-model="form.password_confirmation"
            name="password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Confirm Password"/>
        </div>

        <div class="text-right">
          <button type="submit" class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase" :disabled="form.busy">
            <span v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            Register
          </button>
        </div>

        <p class="font-14 fw-400 text-center mt-4">
          Already have an account?
          <nuxt-link class="color-blue" to="login">Login</nuxt-link>
        </p>

      </form>
    </div>
  </section>
  <!-- End Cards -->
</template>

<script>
  export default {
    middleware:['guest'],
    data(){
      return {
        form: this.$vform({
          name:'',
          email:'',
          password:'',
          password_confirmation:''
        })
      }
    },

    methods:{
      submit(){
          this.form.post('/register')
            .then(res => {

              this.form.reset();

            }).catch(error => {
              console.log(error)
          })
      }
    }


  }
</script>

<style scoped>

</style>
