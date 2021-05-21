/* eslint-disable */
<template>
<div class="container" style= "width: 100%; border-radius: 20px 20px 0% 0%">
    <div class="text" style="float: left; padding: 15px">
      <h2 style="padding: 10px; text-align:center;">Calendario <span style="font-size: 30px"> 📅</span></h2>
      <p style="text-align:center;">
        Questo è il tuo calendario annuale. Clicca sui giorni, inserisci i tuoi impegni<br>
        e l'orario! Il giorno di oggi ha un colore diverso da tutti gli altri: riesci a vedere qual è?
      </p>
    </div>
     <div>
      <figure style="width: 15%"><img src="../../assets/use-case-wiki.png" /></figure>
    </div>
  </div>
  <div class="calendar">
    <div class="full-calendar-header">
      <div class="header-left">
        <slot name="header-left"> </slot>
      </div>
      <div class="header-center">
        <span class="prev-month" @click.stop="goPrev">{{ leftArrow }}</span>
        <span class="title">{{ title }}</span>
        <span class="next-month" @click.stop="goNext">{{ rightArrow }}</span>
      </div>
      <div class="header-right">
        <slot name="header-right"> </slot>
      </div>
    </div>
    <!-- body display date day and events -->
    <div class="calendar-body">
      <div class="weeks">
        <strong class="week" v-for="dayIndex in 7" v-bind:key="dayIndex">{{
          weekDays[dayIndex - 1]
        }}</strong>
      </div>

      <div class="dates" ref="dates">
        <div class="dates-bg">
          <div class="week-row" v-for="week in dates" v-bind:key="week">
            <div
              class="day-cell"
              v-for="day in week"
              v-bind:key="day.target"
              v-on:click="dayClick(day, $event)"
              :class="{ today: day.isToday, 'not-cur-month': !day.isCurMonth }"
            >
              <p class="day-number">{{ day.monthDay }}</p>
              <div
                class="row event"
                v-for="event in events[day.target]"
                v-bind:key="event.target"
              >
                <div class="col eventNameCol">
                  {{ event.name }}
                </div>
                <div class="col">
                  {{ event.startTime }} - {{ event.endTime }}
                </div>
              </div>
              <div
                v-if="creatingEventOn && creatingEventOn == day.target"
                @close="creatingEventOn = false"
                class="input-group"
              >
                <input
                  type="text"
                  class="form-control eventNameInput"
                  aria-label="event text"
                  width="100%"
                  v-model="eventName"
                />
                <div class="input-group secondRowEventInput">
                  <select
                    class="form-select"
                    aria-label="Start"
                    v-model="selectedStartTime"
                  >
                    <option
                      v-for="time in times"
                      :value="time"
                      v-bind:key="time"
                      >{{ time }}</option
                    >
                  </select>
                  <select
                    class="form-select"
                    aria-label="End"
                    v-model="selectedEndTime"
                  >
                    <option
                      v-for="time in times"
                      :value="time"
                      v-bind:key="time"
                      >{{ time }}</option
                    >
                  </select>
                  <div class="input-group-append">
                    <button
                      class="btn btn-primary"
                      type="button"
                      v-on:click="addEvent(day, $event)"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  getDates,
  getEvents,
  getTimes
} from "./utils.js";

export default {
  name: "Calendar",
  props: {
    events: {
      // events will be displayed on calendar
      default: [],
    },
    locale: {
      default: "it",
    },
    firstDay: {
      default: 1,
    },
    user: null,
  },
  data() {
    return {
      currentMonth: moment()
        .locale(this.locale)
        .startOf("month"),
      weekDays: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
      leftArrow: "-",
      rightArrow: "+",
      creatingEventOn: false,
      times: getTimes(),
      selectedEndTime: "",
      selectedStartTime: "",
      eventName: "",
      events: {},
    };
  },
  computed: {
    dates() {
      return this.getDates();
    },
    title() {
      if (!this.currentMonth) return;
      return this.currentMonth
        .locale(this.locale)
        .format("MMMM YYYY")
        .toUpperCase();
    },
  },
  methods: {
    dayClick(day, event) {
      if (day.target !== this.creatingEventOn) {
        this.creatingEventOn = day.target;
      }
    },
    addEvent(day) {
      const event = {
        target: day.target,
        name: this.eventName,
        startTime: this.selectedStartTime,
        endTime: this.selectedEndTime,
        userId: this.user.id,
      };

      fetch(process.env.VUE_APP_API_URL + "api/user/createEvent", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })
        .then(res => {
          if (res.status !== 200) {
            return alert("Error, please try later");
          }

          this.eventName = "";
          this.selectedStartTime = "";
          this.selectedEndTime = "";
          this.creatingEventOn = false;

          getEvents(this.user.id).then(events => (this.events = events));
        })
        .catch(err => {
          console.log("Something went wrong", err);
        });
    },
    getDates() {
      return getDates(this.currentMonth, this.firstDay, this.locale);
    },
    changeMonth(firstDayOfMonth) {
      this.currentMonth = firstDayOfMonth;
    },
    goPrev() {
      this.changeMonth(
        moment(this.currentMonth)
          .subtract(1, "months")
          .startOf("month")
      );
    },
    goNext() {
      this.changeMonth(
        moment(this.currentMonth)
          .add(1, "months")
          .startOf("month")
      );
    },
  },
  components: {},
  mounted() {
    this.changeMonth(this.currentMonth);

    if (this.$props.user) {
      getEvents(this.$props.user.id).then(events => (this.events = events));
    }
  },
  watch: {
    user(u) {
      console.log(u);
      getEvents(u.id).then(events => (this.events = events));
    },
  },
  emits: ["change-section"],
  async created() {
    this.$emit("change-section", "/calendar");
  },
};
</script>

<style>

.calendar {
  padding: 20px;
  background: #fff;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
ul,
p {
  margin: 0;
  padding: 0;
}
.calendar-body {
  margin-top: 20px;
}
.weeks {
  display: flex;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-radius: 10px;
  width: 100%;
}
.week {
  flex: 1;
  text-align: center;
}

.dates {
  position: relative;
}

.week-row {
  border-left: 1px solid #e0e0e0;
  display: flex;
}

.day-cell {
  flex: 1;
  min-height: 180px;
  padding: 4px;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.day-number {
  text-align: right;
}

.today {
  background-color: #ddffef;
}

.not-cur-month .day-number {
  color: rgba(0, 0, 0, 0.24);
}

.full-calendar-header {
  display: flex;
  align-items: center;
}

.header-left,
.header-right {
  flex: 1;
}
.header-center {
  flex: 3;
  text-align: center;
}

.title {
  margin: 0 10px;
}
.prev-month,
.next-month {
  cursor: pointer;
}

.event {
  background: pink;
  width: 100%;
  margin: 1px;
  border-radius: 12px;
}

.eventNameCol {
  font-weight: bold;
}

.eventNameInput {
  font-size: 13px;
  padding: 1px;
  margin: 2px;
}

.secondRowEventInput {
  font-size: 13px;
  height: 22px;
}

.secondRowEventInput select {
  height: 100%;
  margin-right: 5px;
  margin-left: 2px;
  margin-top: 2px;
  padding-top: 0px;
  padding-bottom: 2px;
  padding-right: 5px;
  padding-left: 5px;
}

.secondRowEventInput .input-group-append button {
  height: 90%;
  font-size: 13px;
  margin-right: 2px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 7px;
  padding-left: 7px;
}
</style>
