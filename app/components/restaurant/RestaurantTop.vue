<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" >
    <div class="container">
      <a class="navbar-brand" style="color:white">Free Order</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'Home'}" class="nav-link" replace>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Order'}" class="nav-link" replace>
              Order
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Menu'}" class="nav-link" replace>
              Menu
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Info'}" class="nav-link" replace>
              Info
            </router-link>
          </li>   
          <li class="nav-item">
            <router-link :to="{ name: 'Image'}" class="nav-link" replace>
              Image
            </router-link>
          </li>   
        </ul>
        <!-- <a href="/" class="btn btn-success" v-on:click="Logout()">  -->
         <a href="/" class="btn btn-success" v-confirm="{loader: true, ok: dialog => Logout(dialog),  message: 'Are you sure want to logout?'}">
           Logout
         </a>
      </div>               
  </div>
  </nav>
</template>

<script>
export default {
    data() {
      return {
        
      }
    },
    methods: {
      Logout(dialog) {
          this.axios.post('/auth/logout')
          .then(res => {
            dialog.close();
            location.href = "/"
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
}
</script>

<style>

</style>
