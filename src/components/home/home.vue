<template>
<div id= "homepage">
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
          <p class="mt-4 me-5 text-"><button type="button" class="btn" @click="scroll('faqs')">FAQs</button></p></li>
        <li>
          <p class= "mt-4 me-5 text-"><button type="button" class= "btn" @click="scroll('about')">About us</button></p></li>
        <li>
          <p class="mt-4 me-5 text-">
            Sei già un utente?<router-link class="btn btn-outline-primary ms-2" to="/login">Accedi</router-link>
          </p>
        </li>
      </ul>
</nav>

<nav id= "principale">
  <section>
      <div class="text-center pb-5 pt-5 mt-5">
        <div class="row">
          <div class="col-md-2 text-center"></div>
          <div class="col-md-4 text-center">
            <img src="../../assets/prova.png" width="600" />
          </div>
          <div class="col-md-4 text-center">
            <br><br>
            <h2>Tivity.Me</h2>
            <p class="h5">
              Scrivi, pianifica e 
              semplifica la tua vita
            </p>
            <br />
            <router-link class="btn btn-outline-primary " to="/sign-in"
              >Effettua la registrazione</router-link>
          </div>
        </div>
      </div>
  </section>

  <section>
    <div id= "nav">
      <button class= "btn btn-light" @click="showImage('todo')">✔️ To Do </button>|
      <button class= "btn btn-light" @click="showImage('map')">🌎 La tua mappa</button> |
      <button class= "btn btn-light" @click="showImage('calendar')">🗓️ Calendario</button> |
      <button class= "btn btn-light" @click="showImage('habits')"> 📚 Il tuo habit tracker</button>
    </div>
    <div class= "showImg">
      <img id="todo" src="" alt= "todo" style="visibility:hidden"/>
      <img id="map" src="" alt= "map" style="visibility:hidden"/>
      <img id="calendar" src="" alt= "calendar" style="visibility:hidden"/>
      <img id="habits" src="" alt= "habits" style="visibility:hidden"/>
    </div>
  
    
 
  </section>

  <section><br>
      <div class= "text-center">
          <h3>Perchè <strong>essere produttivi</strong> 💪</h3>
          <div class= "immagini">
            <img src= "../../assets/study.jpg" width="280" alt= "study">&nbsp;&nbsp;&nbsp;
            <img src= "../../assets/study2.jpg" width= "280" alt= "study2">&nbsp;&nbsp;&nbsp;
            <img src= "../../assets/study3.jpg" width= "280">&nbsp;&nbsp;&nbsp;
          </div>
        </div>
  </section>

  <section>
    <div id= "faqs"><br>
      <div class="row-faqs"> 
        <h2>Tivity.Me FAQs </h2>
        <p>Abbiamo raccolto alcune domande e risposte per aiutarti nell'utilizzo di questa piattaforma. ✨</p>
          <details>
            <summary>Cos'è Tivity.Me?</summary>
              <p>Tivity.Me è nata con lo scopo di far tornare la motivazione a chi l'ha persa e vuole rimettersi in gioco.</p>
          </details>
          <details>
            <summary>Cosa posso fare con questa piattaforma?</summary>
              <p class="text">In questa piattaforma troverai tutto quello di cui hai bisogno per essere <em>produttivo</em>:
              <ul>
                <li style="font-size: 14px">Una to-do list per mantenere sempre traccia dei tuoi impegni;
                </li>
                <li style="font-size: 14px">Una mappa in cui puoi segnare tutti i viaggi che vuoi mantenere nel tuo cuore;
                </li>
                <li style="font-size: 14px">Un calendario per aiutarti a visualizzare i mesi dell'anno;
                </li>
                <li style="font-size: 14px">Un habit tracker per sviluppare e mantenere nuove abitudini;
                </li>
              </ul>
              </p>
          </details>
          <details>
            <summary>Posso utilizzare Tivity.Me su tutti i dispositivi?</summary>
              <p class="text">Certo! Tivity.Me è una piattaforma <em>responsive</em>: in questo modo potrai avere sempre con te i tuoi appunti.
              </p>
          </details>
          <details>
            <summary>Non ho mai avuto un agenda online, posso iniziare con Tivity.Me?</summary>
              <p class="text">Assolutamente si! In ogni pagina troverai una descrizione di quello che potrai fare o come dovrai farlo.</p>
          </details>
      </div>
    </div>
  </section>

  <section>
      <div id= "about">
          <h2 style="text-align:center; padding: 10px">Our Team</h2>
          <hr class= "beautiful line">
          <div class="row">
            <div class="column">
                <div class="card">
                    <img src="../../assets/lillo2.jpg" alt= "Ion">
                    <h2>So' Ion Drumea</h2>
                    <p class="title">Frontend & Backend Developer</p>
                    <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                    <p>ion@example.com</p>
                    <p><button class="button">Contact</button></p>
                </div>
            </div>
            
          
            <div class="column">
                <div class="card">
                <img src="../../assets/lillo1.jpg" alt= "Chiara">
                    <h2>So' Chiara Giacanelli</h2>
                    <p class="title">Frontend & Backend Developer</p>
                    <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                    <p>chiara@example.com</p>
                    <p><button class="button">Contact</button></p>
                </div>
            </div>
          
          <div class="column">
              <div class="card">
              <img src="../../assets/lillo3.jpg" alt= "Damiano">
                  <h2>So' Damiano Gambitta</h2>
                  <p class="title">Frontend & Backend Developer</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>damiano@example.com</p>>>>>>>> main
291

                  <p><button class="button">Contact</button></p>
              </div>
          </div>
          </div>
      </div>
  </section>
  
</nav>  



<footer>This website is designed by Ion Drumea, Chiara Giacanelli and Damiano Gambitta per il corso di Linguaggi e Tecnologie per il Web
 ©Tivity.me</footer>
</div>
</template>


<script>
export default {
  name: "Home",
  emits: ["disable-menu"],
   created() {
    this.$emit('disable-menu');
  },
  
  el: '#nav',
  
  data() {
    return  {
      app: ['todo', 'calendar', 'habits', 'map'],
    }
  },

  methods: {
    showImage(img) {
      document.getElementById(img).style.visibility='visible';
    },

    scroll(id) {
      let e = document.getElementById(id);
      e.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'start'
      });
    }
  }
}

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

section:nth-of-type(5) {
 height: 600px;
}

section {
  height: 570px;
  padding: 16 px;
  font-size: 30px;
  overflow: hidden;
  
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
  display: flex;
}

#header ul {
  list-style: none;
  display: flex;
  align-items: center;
  width: 559  px;
  justify-content: space-around;
}

#nav {
  -webkit-font-smoothing: antialised;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 20px;
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

.homepage {
  display: flex;
}

.showImg {
  height: 80%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card {
    text-align: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 18px;
    
}

html {
  box-sizing: border-box;
}
  
*, *:before, *:after {
  box-sizing: inherit;
}
          
.column {
  float: left;
  width: 33.3%;
  padding: 0 18px;
}
        

.about-section {
  padding: 80px;
  text-align: center;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}
        
.container {
  padding: 0 16px;
  
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
  
}
        
.title {
  color: rgb(0, 0, 0);
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}
  
.button:hover {
  background-color: #555;
}
.card:hover {
  transform: scale3d(1.006, 1.006, 1);

}
  

  
  

.row-faqs {
  margin-left: 50px;
}

details{
   background: #ffffff;
   padding: 10px 20px;
   border-radius: 20px;
   margin-top: 20px;
   font-size: 16px;
   letter-spacing: 1px;
}

.btn-outline-primary {
  border-radius: 70px;
  border-color:purple;
  color:purple
} 

.immagini {
  transition: 0.8s;
}

.immagini:hover {
  opacity: 0.8;
  transform: translate(-12%);
}

.description {
  float: right;
  margin-right: 300px; 
  justify-content: center;
}


</style>