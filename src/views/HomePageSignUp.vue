<template>
  <div class="container">
    <div class="d-flex bd-highlight mt-5">
      <div class="p-2 flex-grow-1 bd-highlight">
        <img
          src="../assets/logo.jpeg"
          width="80"
          class="align-items-start ms-5 mt-2"
        />
      </div>
      <div class="p-2 bd-highlight">
        <p class="mt-4 me-5 text-">
          Sei già un utente?

          <router-link class="btn btn-outline-primary ms-2" to="/login"
            >Accedi</router-link
          >
        </p>
      </div>
    </div>

    <div class="text-center pb-5 pt-5 mt-5">
      <div class="row">
        <div class="col-md-2 text-center"></div>
        <div class="col-md-4 text-center">
          <img src="../assets/home.png" width="400" />
        </div>
        <div class="col-md-4 text-center">
          <p class="h3">
            Scrivi, Pianifica e <br />
            Semplifica la tua vita
          </p>
          <br />
          <router-link class="btn btn-outline-primary" to="/sign-in"
            >Effettua la registrazione</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomePageSignUp",
};
</script>

<style>
</style>