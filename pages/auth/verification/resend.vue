<template>
    <div>
      <!-- Section Cards -->
      <section class="authentication">
        <div class="auth-body">
          <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
            Resend Verification Email
          </h1>
          <form class="auth-form" @submit.prevent="submit">

            <alert-error v-if="form.errors.has('message')" :form="form">
              {{form.errors.get('message')}}
            </alert-error>

            <alert-success :form="form">We have resend the verification email.</alert-success>

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
                Resend
              </button>
            </div>
          </form>
        </div>
      </section>
      <!-- End Cards -->
    </div>
</template>

<script>
  export default {
    middleware:['guest'],
    name: 'resend',
    data(){
      return {
        form: this.$vform({
          email:''
        })
      }
    },
    methods:{
      submit(){
        this.form
          .post('verification/resend')
          .then(res => {
            console.log(res)
            this.form.reset();
          })
          .catch(err => {
            this.form.errors.set(err.response.data.errors)
          })
      }
    }
  }
</script>

<style scoped>

</style>
