<!--Pagina di Login-->
<template>
  <div class="container mt-5">
    <div class="signup-content">
      <div class="signup-form">
        <h1 class="form-title">Bentornato!</h1>
        <form v-on:submit.prevent="login()" method="POST" class="register-form">
          <div class="form-group">
            <label for="name"
              ><i class="zmdi zmdi-account material-icons-name"></i
            ></label>
            <input
              type="custom"
              name="username"
              placeholder="Nome utente o e-mail"
              id="username"
              required
            />
          </div>
          <div class="form-group">
            <label for="pass"><i class="zmdi zmdi-lock"></i></label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          Sei nuovo?
          <router-link class="" to="/signUp" style="color: #bd2a3e">Crea il tuo account</router-link>
          <br />
          <br />
          <div class="form-group">
            <input
              type="checkbox"
              name="rememebr_login"
              id="rememebr_login"
              class="agree-term"
            />
            <label for="rememebr_login" class="label-agree-term"
              ><span><span></span></span>Ricordami</label
            >
          </div>
          <button type="submit" class="btn btn-outline-primary" to="/login">
            Accedi
          </button>
        </form>
      </div>
      <div class="signup-image">
        <figure>
          <img src="../../assets/logo.jpeg" alt="sign up image" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { setCookie } from "../../utility/cookies";
import { navigationMenuLocations } from "../../router/consts";
import { getUser } from "../../utility/user";

export default {
  name: "login",
  emits: ["disable-menu", "user-data"],
  methods: {
    async tryTokenLogin() {
      const user = (await getUser()); 
      if (user) {
        this.$emit("user-data", user);
        this.$router.push("homepage");
      }
    },
    login() {
      const inputs = document.getElementsByTagName("input");
      const rememebr_login = inputs.rememebr_login.checked;
      console.log("login")

      let userObj = {
        username: inputs.username.value,
      }

      sessionStorage.setItem('username', JSON.stringify(userObj));

      
      fetch(process.env.VUE_APP_API_URL + "api/auth/signin", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: inputs.username.value,
          password: inputs.password.value,
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            alert("Error, please try later");
            return;
          }

          // Examine the text in the response
          res.json().then((user) => {
            setCookie("tivityToken", user.accessToken, 1);

            if (rememebr_login) {
              setCookie("tivityAutoLogin", rememebr_login, 1);
            }
                        console.log("login");

            console.log(user);
            this.$emit("user-data", user);
          });
          this.$router.push("homepage");
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    },
  },
  created() {
    this.$emit("disable-menu");
    // If back after login do not login with token.
    const lastPosition = localStorage.getItem("/tivity/lastPosition");
    console.log;
    if (!navigationMenuLocations.includes(lastPosition) && lastPosition) {
      this.tryTokenLogin();
    }
  },
};
</script>

<style></style>
