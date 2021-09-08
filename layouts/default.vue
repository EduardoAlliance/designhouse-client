<template>
  <div>

    <Navigation />

    <div class="wrapper">
      <Nuxt />
    </div>

    <SiteFooter/>

  </div>
</template>

<script>
  import Navigation from "./partials/navigation"
  import SiteFooter from './partials/footer'

  export default{
    components:{
      Navigation,
      SiteFooter
    }
  }

</script>


