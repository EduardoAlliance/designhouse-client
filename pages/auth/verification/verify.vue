<template>
  <div>
    <!-- Section Cards -->
    <section class="authentication">
      <div class="auth-body">
        <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
          Email Verification
        </h1>
        <form class="auth-form">

          <div class="form-group" v-if="success">
            <div  class="alert alert-success">
             {{ status}}
            </div>
            <nuxt-link to="/login">Proceed to Login</nuxt-link>
          </div>
          <div class="form-group" v-else>
            <div v-if="!success" class="alert alert-danger">
              {{ status }}
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    middleware:['guest'],
      async asyncData({ params,query, app}){

          const q = Object.keys(query)
            .map(k =>  k +"="+ query[k] )
            .join('&');

          try{
            const data = await app.$axios.get('verification/verify?'+q)
            console.log(data);
            return { success: true,status: data.data.message}
          }catch (e) {

            return { success: false, status: e.response.data.errors.message}
          }

      }

  }
</script>

<style scoped>

</style>
