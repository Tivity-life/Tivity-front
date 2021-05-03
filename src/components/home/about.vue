<template>
  <div class="about-section">
      <router-link class="p-2 flex-grow-1 bd-highlight" to= "../#">
        <img
          src="../../assets/logo.jpeg"
          width="100"
          class="align-items-start mt-10"
        />
      </router-link>
        <h1>About Us</h1><br>
        <p>Tivity.Me è nato con lo scopo di aumentare la produttività in chi si sente demotivato e 
            senza uno scopo ben preciso.
        </p>
        <p>Questo strumento ti aiuterà ad organizzare le tue giornate e la tua vita, con divertimento e creatività ✨</p>
        
        </div>
        <br>
        <h2 style="text-align:center">Our Team</h2>
        <hr class= "beautiful line">
        <div class="row">
        <div class="column">
            <div class="card">
                <h2>Ion Drumea</h2>
                <p class="title">Frontend & Backend Developer</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>ion@example.com</p>
                <p><button class="button">Contact</button></p>
            </div>
        </div>
        
        <div class="column">
            <div class="card">
            <img src="">
                <h2>Chiara Giacanelli</h2>
                <p class="title">Frontend & Backend Developer</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>chiara@example.com</p>
                <p><button class="button">Contact</button></p>
            </div>
        </div>
        
        <div class="column">
            <div class="card">
            <img src="">
                <h2>Damiano Gambitta</h2>
                <p class="title">Frontend & Backend Developer</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <p>damiano@example.com</p>
                <p><button class="button">Contact</button></p>
            </div>
        </div>
        </div>
</template>

<script>
export default {
}
</script>

<style> 
.card {
    text-align: center;
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
            margin-bottom: 16px;
            padding: 0 8px;
          }
          
          .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            margin: 10px;
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
          
          @media screen and (max-width: 650px) {
            .column {
              width: 100%;
              display: block;
            }
          }

</style>