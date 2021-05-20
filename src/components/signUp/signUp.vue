<template>
  <div class="container mt-5">
    <div class="signup-content">
      <div class="signup-form">
        <h1 class="form-title">Welcome!</h1>
        <h4>Registra il tuo account</h4>
        <br />
        <form
          v-on:submit.prevent="signup()"
          class="register-form"
          id="register-form"
        >
          <div class="form-group">
            <label for="name"
              ><i class="zmdi zmdi-account material-icons-name"></i
            ></label>
            <input
              type="custom"
              name="username"
              placeholder="Nome utente"
              required
            />
          </div>
          <div class="form-group">
            <label for="name"><i class="zmdi zmdi-email"></i></label>
            <input
              type="email"
              name="email"
              placeholder="La tua e-mail"
              required
            />
          </div>
          <div class="form-group">
            <label for="name"><i class="zmdi zmdi-lock"></i></label>
            <input
              type="password"
              name="password"
              placeholder="La tua password"
              required
            />
          </div>
          <div class="form-group">
            <label for="pass"><i class="zmdi zmdi-lock-outline"></i></label>
            <input
              type="password"
              name="repeat_password"
              placeholder="Ripeti la tua password"
              required
            />
          </div>
          Hai già un account?
          <router-link class="" to="/login" style="color: #bd2a3e">Accedi</router-link>
          <br />
          <br />
          <input
            type="submit"
            class="btn btn-outline-primary-reg"
            value="Registrati"
          />
        </form>
      </div>
      <div class="signup-image">
        <figure>
          <img src="../../assets/prova2.png" alt="sign up image" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signUp",
  methods: {
    signup() {
      const inputs = document.getElementsByTagName("input");
      const password = inputs.password.value;

      if (password != inputs.repeat_password.value) {
        alert("Passwords do not match");
        return;
      }

      const newUser = {
        username: inputs.username.value,
        email: inputs.email.value,
        roles: ["user"],
        password: inputs.password.value,
      };
      fetch(process.env.VUE_APP_API_URL + "api/auth/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          if (response.status !== 200) {
            alert("Error, please try later");
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          alert("Registrazione completata, ora puoi accedere!");
          this.$router.push("login");
        })
        .catch((err) => {
          console.log("Fetch Error :-S", err);
        });
    },
  },
  emits: ["disable-menu"],
  created() {
    this.$emit("disable-menu");
  },

};
</script>

<style></style>
