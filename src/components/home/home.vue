<template>
<div id= "homepage">
<nav id= "header">
      <div id= "logo" class="p-2 flex-grow-1 bd-highlight">
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
      <div class="text-center pt-6 mt-5">
        <div class="row">
          <div class="col-md-2 text-center"></div>
          <img id= "imm" src="../../assets/prova.png"/>
          <div class="col-md-4 text-center">
            <br><br>
            <h2 style="font-size: 55px">Tivity<span style= "color: #bd2a3e">.Me</span></h2>
            <p class="h5">
              Scrivi, pianifica e 
              semplifica la tua vita
            </p>
            <br />
            <router-link class="btn btn-outline-primary-reg" to="/signUp"
              >Effettua la registrazione</router-link>
          </div>
        </div>
      </div>
  </section>

  <section>
    <div id= "nav">
      <button class= "btn btn-light" id= "bottone" @click="showImage1">✔️ To Do </button>|
      <button class= "btn btn-light" id= "bottone" @click="showImage2">🌎 La tua mappa</button> |
      <button class= "btn btn-light" id= "bottone"  @click="showImage3">🗓️ Calendario</button> |
      <button class= "btn btn-light" id= "bottone" @click="showImage4"> 📚 Il tuo habit tracker</button>
    </div>
    <div class= "showImg">
    <img id= "immagine" src= "../../assets/Cattura.png" alt= "todo" style="width: 60%; border-radius: 15px;">
    <img id= "smartphone" src= "../../assets/Image3.jpg" alt= "smartphone" style= "width: 15%; border-radius: 23px;">
    </div>
 
  </section>

  <section><br>
      <div class= "text-center">
          <h3>Perchè <strong>essere produttivi</strong> 💪</h3>
          <div id= "immagini">
            <img src= "../../assets/study.jpg" alt= "study" style="width: 19%">&nbsp;&nbsp;&nbsp;
            <img src= "../../assets/study2.jpg" alt= "study2" style="width: 19%">&nbsp;&nbsp;&nbsp;
            <img src= "../../assets/study3.jpg" style="width: 20%">&nbsp;&nbsp;&nbsp;
            <div class= "column-descr" style="width: 18%; float:right"><p id= "descr"><br>L’obiettivo vero e più alto della 
            produttività è di fare spazio nella tua vita alle cose che sono davvero importanti. 
            Non è essere sempre attivi e pieni di impegni, bensì fare le cose che ti appassionano 
            e <strong>ti fanno battere il cuore</strong>. <br><br>In altre parole, si tratta di fare spazio alle cose che ti rendono felice!</p></div>
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
          <h2 style="text-align:center; padding: 20px">Our Team</h2>
          <hr class= "beautiful line">
          <div class="row">
            <div class="column">
                <div class="card">
                    <img class="card-img" src="../../assets/lillo2.jpg" alt= "Ion">
                    <h2>So' Ion Drumea</h2>
                    <p class="title">Frontend & Backend Developer</p>
                    <p>Studente al terzo anno di Informatica alla<br>Sapienza Università di Roma.</p>
                    <p><button class="button" v-on:click= 'linkPage'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>&nbsp;Visit our Github</button></p>
                </div>
            </div>
            <div class="column">
                <div class="card">
                <img class="card-img" src="../../assets/lillo1.jpg" alt= "Chiara">
                    <h2>So' Chiara Giacanelli</h2>
                    <p class="title">Frontend & Backend Developer</p>
                    <p>Studentessa al terzo anno di Informatica alla<br>Sapienza Università di Roma.</p>
                    <p><button class="button" v-on:click= 'linkPage'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>&nbsp;Visit our Github</button></p>
                </div>
            </div>
          
          <div class="column">
              <div class="card">
              <img class="card-img" src="../../assets/lillo3.jpg" alt= "Damiano">
                  <h2>So' Damiano Gambitta</h2>
                  <p class="title">Frontend & Backend Developer</p>
                  <p>Studente al terzo anno di Informatica alla<br>Sapienza Università di Roma.</p>
                  <p><button class="button" v-on:click= 'linkPage'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                      </svg>&nbsp;Visit our Github</button></p>
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
  
  methods: {
    showImage1() {
      var img= document.getElementById("immagine")
      img.src=  require("../../assets/Cattura.png")
      var phone= document.getElementById("smartphone")
      phone.src=  require("../../assets/Image3.jpg")
    }, 

     showImage2() {
      var img= document.getElementById("immagine")
      img.src= require("../../assets/Cattura2.png")
      var phone= document.getElementById("smartphone")
      phone.src=  require("../../assets/Image4.jpg")
    }, 

    showImage3() {
      var img= document.getElementById("immagine")
      img.src= require("../../assets/Cattura3.png")
      var phone= document.getElementById("smartphone")
      phone.src=  require("../../assets/Image5.jpg")
    }, 

    showImage4() {
      var img= document.getElementById("immagine")
      img.src= require("../../assets/Cattura4.png")
      var phone= document.getElementById("smartphone")
      phone.src=  require("../../assets/Image6.jpg")
    }, 

    scroll(id) {
      let e = document.getElementById(id);
      e.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'start'
      });
    },
    
    linkPage() {
      window.open('https://github.com/Tivity-life/Tivity-front')
    },

    
  },
 

  
  
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
  justify-content: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  -o-justify-content: center;
  -ms-justify-content: center;
  align-items: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  -o-align-items: center;
  -ms-align-items: center;
  

}

section:nth-of-type(1) {
  margin-top: 96px;
 
}
section {
  height: 600px;
  padding: 16 px;
  font-size: 30px;
  overflow: hidden;
  
}

section:nth-of-type(odd) {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
}

section:nth-of-type(even) {
  background-color:mocassin;
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
    margin: 15px;
    transition: 0.2s ease-out;
    display: flex;
    
}

.card-img {
  overflow: hidden;
  height: 250px;
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
  border-color: #bd2a3e;
  color:#bd2a3e
  
} 

.btn-outline-primary:hover {
  background-color: #e0475b;
  border-color: #e0475b;
}

.btn-outline-primary-reg {
  color: 		white;
  border-color:	#e0475b;
  background-color: #e0475b;
  border-radius: 70px;

}

.btn-outline-primary-reg:hover {
  color: white;
  opacity: 0.8;

}

#imm {
  width: 38%;
}

#immagini {
  transition: 0.8s;
  padding: 8px;
  flex-wrap: wrap;
  position: inherit;
}

#immagini:hover {
  opacity: 0.8;
  transform: translate(-8%);
}

#descr {
  opacity: 0;
  text-align: right;
}

#immagini:hover #descr{
  opacity: 1;
  transition: all 0.5s;
}

.description {
  float: right;
  margin-right: 300px; 
  justify-content: center;
}

#bottone:hover{
  border-bottom:2px solid #1e2f45;
  border-radius: 0px;
}

@media screen and (max-width: 765px) {
  #header #logo {
    float: none;
    display: block;
    text-align: left;
  }

  #header p {
    float: none;
    display: block;
    text-align: left;
  }
  
  #header ul {
    float: none;
  }

  .row {
    justify-content: center;
  }

  .column-descr {
    display: contents;
}
  #descr {
    font-size: x-small;
    padding: 10%
  }


}
@media screen and (max-width: 420px) {

  #header {
    flex-direction: column;
    position: inherit;
  }

  #header #logo {
    width: 100%
  }

  #header ul {
    float: none;
    display: flex;
    flex-direction: column-reverse;
    align-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  section:nth-of-type(1) {
    margin-top: 0px;
    height: 600px;
  }

  #imm {
     width: 62%
  }

  section:nth-of-type(4) {
  height: 800px;
  }

  section {
    height: 380px;
    padding: 16 px;
    font-size: 30px;
    overflow: hidden;
    
  }
}

@media screen and (max-width: 930px) { 
  
section:nth-of-type(5) {
 height: 1400px;
}

section:nth-of-type(5) .column{
  display: contents;
}

section:nth-of-type(5) .card{
  height: 380px;
  width: 380px;
  position: inherit;
}


section:nth-of-type(4) .row-faqs {
  margin-left: 10px;
}

section:nth-of-type(even) {
  background-color:  #fdf5f2;
  color: rgb(0, 0, 0);
    
}

#bottone {
  background-color: #fdf5f2;
}

}



</style>