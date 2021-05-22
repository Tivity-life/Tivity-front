<template>
<div :class="[isMobile() ? 'container' : '']">
  <h2 style="padding: 10px; text-align:center">Il mio habit tracker settimanale <span style="font-size: 30px">🏡</span> </h2>
  <header style="justify-content:center; text-align:center">
  <img src= "../../assets/prova3.jpg"/>
  </header><br>
  <p style= "text-align:center">
    Nelle righe in orizzontale ci sono i giorni, per ogni settimana.<br />
    Nelle righe in verticale ci sono le <strong>abitudini</strong> che puoi
    inserire per essere coerente con il tipo di persona che vuoi diventare
    <em>“da grande”</em>. <br />Alcuni esempio: tempo di qualità in famiglia,
    pulizie di casa, attività fisica, mangiare bene, bere acqua, leggere,
    studiare, disegnare, meditare, ecc.<br>Inserisci tutto ciò che vuoi, e visualizza
    le statistiche settimanali nel grafico sottostante, cliccando sulla freccia a destra!
  </p>
  <br />
  <div id="habits" class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>Inserisci le abitudini che vuoi coltivare 🌱</th>
          <th>Lunedì</th>
          <th>Martedì</th>
          <th>Mercoledì</th>
          <th>Giovedì</th>
          <th>Venerdì</th>
          <th>Sabato</th>
          <th>Domenica</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(days, i) in weekDaysByStatus" :key="i">
          <td>
            <input
              id="name"
              class="form-control"
              type="text"
              v-model="weekDays[i].insert"
            />
          </td>

          <th>
            <button
              :class="[
                weekDays[i].isActiveMonday
                  ? 'btn btn-success'
                  : 'btn btn-warning btn-rounded',
              ]"
              @click="weekDays[i].isActiveMonday = !weekDays[i].isActiveMonday"
            >
              {{ weekDays[i].isActiveMonday ? "Fatto!" : "Da fare" }}
            </button>
          </th>
          <td>
            <button
              :class="[
                weekDays[i].isActiveTuesday
                  ? 'btn btn-success'
                  : 'btn btn-warning btn-rounded',
              ]"
              @click="
                weekDays[i].isActiveTuesday = !weekDays[i].isActiveTuesday
              "
            >
              {{ weekDays[i].isActiveTuesday ? "Fatto!" : "Da fare" }}
            </button>
          </td>
          <td>
            <button
              :class="[
                weekDays[i].isActiveWednesday
                  ? 'btn btn-success'
                  : 'btn btn-warning btn-rounded',
              ]"
              @click="
                weekDays[i].isActiveWednesday = !weekDays[i].isActiveWednesday
              "
            >
              {{ weekDays[i].isActiveWednesday ? "Fatto!" : "Da fare" }}
            </button>
          </td>
          <td>
            <button
              :class="[
                weekDays[i].isActiveThursday
                  ? 'btn btn-success'
                  : 'btn btn-warning btn-rounded',
              ]"
              @click="
                weekDays[i].isActiveThursday = !weekDays[i].isActiveThursday
              "
            >
              {{ weekDays[i].isActiveThursday ? "Fatto!" : "Da fare" }}
            </button>
          </td>
          <td>
            <button
              :class="[
                weekDays[i].isActiveFriday
                  ? 'btn btn-success'
                  : 'btn btn-warning btn-rounded',
              ]"
              @click="weekDays[i].isActiveFriday = !weekDays[i].isActiveFriday"
            >
              {{ weekDays[i].isActiveFriday ? "Fatto!" : "Da fare" }}
            </button>
          </td>
          <td>
            <button
              :class="[
                weekDays[i].isActiveSaturday
                  ? 'btn btn-success'
                  : 'btn btn-warning btn-rounded',
              ]"
              @click="
                weekDays[i].isActiveSaturday = !weekDays[i].isActiveSaturday
              "
            >
              {{ weekDays[i].isActiveSaturday ? "Fatto!" : "Da fare" }}
            </button>
          </td>
          <td>
            <button
              :class="[
                weekDays[i].isActiveSunday
                  ? 'btn btn-success'
                  : 'btn btn-warning btn-rounded',
              ]"
              @click="weekDays[i].isActiveSunday = !weekDays[i].isActiveSunday"
            >
              {{ weekDays[i].isActiveSunday ? "Fatto!" : "Da fare" }}
            </button>
          </td>
          <td>
            <button
              class="btn btn-lg"
              type="button"
              v-on:click="deleteRow(i)"
              aria-label="Delete"
              title="Delete"
              style="background-color: transparent;"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 
                        0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 
                        0 01.25.25V3h-5V1.75z"
                ></path>
                <path
                  d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 
                        001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"
                ></path>
                <path
                  d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 
                        0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"
                ></path>
              </svg>
            </button>
            <button
              class="btn btn-lg"
              type="button"
              aria-label="Update"
              title="Update"
              style="background-color: transparent;"
              v-on:click="updateChart(i); countActive(i)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path
                  d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="opzioni">
      <button type="button" class="btn btn-lg" @click="addNewRow">
        <i class="fas fa-plus-circle" style="color: #ffa700"></i>
        Inserisci una nuova riga
      </button>
    </div>
    <br />
    <div id="chart">
      <p style="text-align:center">Queste sono le statistiche delle tue abitudini:</p>
      <br />
      <pie-chart :data="datachartByStatus" :donut="true"></pie-chart><br />
    </div>
  </div>
</div>

</template>

<script>
export default {
    
  emits: ["change-section"],
  created() {
    this.$emit("change-section","/habit");
  },
  el: "#habits",

  data() {
    return {
      weekDays: [],
      datachart: [],
    };
  },

  methods: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
    addNewRow() {
      this.weekDays.push({
        insert: "",
        isActiveMonday: false,
        isActiveTuesday: false,
        isActiveWednesday: false,
        isActiveThursday: false,
        isActiveFriday: false,
        isActiveSaturday: false,
        isActiveSunday: false,
        n: 0,
      });
    },

    deleteRow(i) {
      this.weekDays.splice(i, 1);
      
      if (this.weekDays.length == 0) {
        this.datachart= [];
      }
      
      else {
        var app= []
        for (var i in this.weekDays) {
          app.push([this.weekDays[i].insert, this.weekDays[i].n])
          console.log(app)
        }
        this.datachart = app
      }
      
    },

    countActive(i) {
      var counter= 0;
      if (this.weekDays[i].isActiveMonday) {
        counter += 1
      }
      if (this.weekDays[i].isActiveTuesday) {
        counter += 1
      }
      if (this.weekDays[i].isActiveWednesday) {
        counter += 1
      }
      if (this.weekDays[i].isActiveThursday) {
        counter += 1
      }
      if (this.weekDays[i].isActiveFriday) {
        counter += 1
      }
      if (this.weekDays[i].isActiveSaturday) {
        counter += 1
      }
      if (this.weekDays[i].isActiveSunday) {
        counter += 1
      }
      this.weekDays[i].n = counter;
      return this.weekDays[i].n
    },

    updateChart(i) {
      var str = this.weekDays[i].insert;
      var val= this.countActive(i); 
      var app = [[str, val]];
      var list = this.union(app, this.datachart);
      this.datachart = list;
    },

    union(A, B) {
      var obj = {};
      for (var i = A.length-1; i >= 0; -- i)
          obj[A[i]] = A[i];
      for (var i = B.length-1; i >= 0; -- i)
          obj[B[i]] = B[i];
      var res = []
      var app= []
      for (var k in obj) {
        if (app.includes(obj[k][0])) {
          continue
        }
        app.push(obj[k][0])
        res.push(obj[k])
      }
      return res;
    }
  
  },

  computed: {
    weekDaysByStatus: function() {
      return this.weekDays;
    },

    datachartByStatus: function() {
      return this.datachart;
    },

  }
};
</script>

<style>
.container {
  width:100%
}

.opzioni button {
  font-size: 17px;
  justify-content: left;
}

.green {
  background-color: green;
}

@media screen and (max-width: 630px) { 
  .d-flex {
    flex-direction: column;
  }
  .container {
    width:100%;
    background-color: white;
  }

}


</style>
