<template>
  <div class="container mt-5">
    <br />
    <h1>Getting started</h1>
    <p>
      Ciao {{ username }}! Benvenuto/a su Tivity.Me 👋<br />Clicca sulla sezione
      da cui vuoi iniziare e divertiti!
    </p>
    <div class="cards-container">
      <div class="first-section">
        <router-link to="/to-do">
          <div class="card" style="width: 30rem; height: 20rem">
            <img
              class="card-img-top"
              src="../../assets/todolist.png"
              alt="Card image cap"
            />
            <div class="card-text">
              <h4>To Do list</h4>
              <p style="color: #fff">
                Hai bisogno di ricordarti tutte le cose che devi fare?
                <br />Prova la To Do list!
              </p>
            </div>
          </div>
        </router-link>
      </div>

      <div class="second-section">
        <router-link to="/map">
          <div class="card" style="width: 30rem; height: 20rem">
            <img
              class="card-img-top"
              src="../../assets/map_pins.jpg"
              alt="Card image cap"
            />
            <div class="card-text">
              <h4>Mappa</h4>
              <p style="color: #fff">
                Uno spazio dedicato ai tuoi ricordi più belli in giro per il
                mondo.
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="third-section">
        <router-link to="/calendar">
          <div class="card" style="width: 30rem; height: 20rem">
            <img
              class="card-img-top"
              src="../../assets/calendar.jpg"
              alt="Card image cap"
            />
            <div class="card-text">
              <h4>Calendario</h4>
              <p style="color: #fff">
                Per annotare tutti i tuoi appuntamenti durante l'anno<br />e
                pianificare il futuro.
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="fourth-section">
        <router-link to="/habits">
          <div class="card" style="width: 30rem; height: 20rem">
            <img
              class="card-img-top"
              src="../../assets/habit.jpg"
              alt="Card image cap"
            />
            <div class="card-text">
              <h4>Habit tracker</h4>
              <p style="color: #fff">
                Coltiva le tue passioni e crea nuove abitudini per essere la
                versione migliore di te stesso.
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from "../../utility/cookies";

export default {
  emits: ["disable-menu"],
  data() {
    return {
      username: "",
    };
  },
  methods: {
    getUser() {
      if (sessionStorage.length > 0) {
        const key = sessionStorage.key(0);
        this.username = JSON.parse(sessionStorage.getItem(key)).username;
      } else {
        if (!getCookie("tivityToken")) this.$router.push("/");
      }
    },
  },
  created() {
    const token = getCookie("tivityToken");
    fetch(process.env.VUE_APP_API_URL + "api/user/getUser", {
      method: "GET",
      mode: "cors",
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          alert("Error, please try later");
          return;
        }

        // Examine the text in the response
        res.json().then((user) => {
          this.username = user.username;
        });
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  },
  beforeMount() {
    this.getUser();
  },
  emits: ["user-data"],
};
</script>

<style>
.container {
  width: 1400px;
  text-align: center;
}

.card {
  display: flex;
  overflow: hidden;
  transition: 0.4s ease-out;
}
.hover {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: flex;
  justify-content: center;
  flex-flow: column;
  transition: all 0.5s ease-in-out;
  padding: 2em 2em;
}

.cards-container {
  width: calc(100%-30rem);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.card-img-top {
  overflow: hidden;
  height: 100%;
}

.card-text {
  width: 100%;
  padding: 0 20px;
  position: absolute;
  top: 100%;
  color: #fff;
  left: 0;
  z-index: 2;
  transition: 0.8s;
  text-align: left;
  background: rgba(148, 11, 45, 0.87);
}

.card:hover .card-text {
  top: 220px;
  opacity: 1;
}

.card-img-top:hover {
  filter: grayscale(100%);
}
</style>
