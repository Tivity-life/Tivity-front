<template>
<nav id= "header">
      <div class="p-2 flex-grow-1 bd-highlight">
        <img
          src="../assets/logo.jpeg"
          width="80"
          class="align-items-start ms-5 mt-2"
        />
      </div>
      <ul>
      <li>
      <p class="mt-4 me-5 text-">FAQs</p></li>
      <li><p class= "mt-4 me-5 text-"><router-link to="/about">About</router-link></p></li>
      <li>
        <p class="mt-4 me-5 text-">
          Sei già un utente?
          <router-link class="btn btn-outline-primary ms-2" to="/login">Accedi</router-link>
        </p>
      </li>
      </ul>
</nav>

<section>
    <div class="text-center pb-5 pt-5 mt-5">
      <div class="row">
        <div class="col-md-2 text-center"></div>
        <div class="col-md-4 text-center">
          <img src="../assets/prova.png" width="600" />
        </div>
        <div class="col-md-4 text-center">
          <br><br>
          <p class="h3">
            Scrivi, pianifica e <br />
            semplifica la tua vita
          </p>
          <br />
          <router-link class="btn btn-outline-primary" to="/sign-in"
            >Effettua la registrazione</router-link>
        </div>
      </div>
    </div>
</section>
<section>

<div id= "nav">
  <router-link to= "/">✔️ To Do</router-link> |
  <router-link to= "/">🌎 La tua mappa</router-link> |
  <router-link to= "/">🗓️ Calendario</router-link> |
  <router-link to= "/">🕮 Il tuo habit tracker</router-link>
  </div>

</section>
<section>
  <br>
    <div class= "text-center">
      <h3>Perchè essere produttivi</h3><br>
      <div class= "col-md-12 text-center">
      <img src="../assets/desk.png" width="350"/>
      </div>

    </div>
  
</section>
<br>
<footer>This website is designed by Ion Drumea, Chiara Giacanelli and Damiano Gambitta ©Tivity.me</footer>
</template>


<script>
export default {
  name: "HomePageSignUp",
};
</script>

<style>

#header {
  display: flex;
  justify-content: space-between;
  padding: 0px 45px;
  position:fixed;
  width: 100%;
  top: 0px;
  background-color: rgb(255, 255, 255);
  transition: background 0.4s;

}

section:nth-of-type(1) {
  margin-top: 96px;
}

section {
  height: 450px;
  padding: 16 px;
  font-size: 20px;
}

section:nth-of-type(odd) {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}

section:nth-of-type(even) {
  background-color: rgba(238, 238, 238, 0.884);
  color: rgb(0, 0, 0);
}

footer {
  height:70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background:moccasin;
  color: black; 
}

#header ul {
  list-style: none;
  display: flex;
  align-items: center;
  width: 500px;
  justify-content: space-around;
}

#nav {
  -webkit-font-smoothing: antialised;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 30px;
  font-size: medium;
}

#nav a {
  color: #000000;
}

#nav a.router-link-exact-active {
  color: #1d1b1b;

}


</style>