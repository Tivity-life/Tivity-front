<template>
<nav id= "header">
      <div class="p-2 flex-grow-1 bd-highlight">
        <img
          src="../../assets/logo.jpeg"
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
          <img src="../../assets/prova.png" width="600" />
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

<section><br>
    <div class= "text-center">
        <h3>Perchè <strong>essere produttivi</strong> 💪</h3>
        <img src= "../../assets/study.jpg" width="250" alt= "study">&nbsp;&nbsp;&nbsp;
        <img src= "../../assets/study2.jpg" width= "250" alt= "study2">&nbsp;&nbsp;&nbsp;
        <img src= "../../assets/study3.jpg" width= "250">
      </div>
</section>

<br>
<footer>This website is designed by Ion Drumea, Chiara Giacanelli and Damiano Gambitta ©Tivity.me</footer>
</template>


<script>
export default {
  name: "Home",
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
  background-color: mocassin;
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
  color: #1d1c1b;

}
.wrapper {
    margin: 0 auto;
    padding: 0 10px;
    width: 940px;
}


</style>