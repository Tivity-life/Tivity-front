<template>
  <div class="container row rounded-top" style="width: 100%">
    <div class="text col p-0">
      <h2 class="p-2 text-center">
        <span class="text-sm-center">🗺️</span> La mia mappa
      </h2>
      <p class="p-3 text-sm-center">
        Hai in mente tanti viaggi da fare in giro per il mondo? 🌎<br />
        Naviga nella mappa, gira il mondo e lascia dei
        <strong>pin</strong> sopra i luoghi che non puoi perdere!<br />Inserisci
        le note sui pin per mantenere i tuoi ricordi sempre con te.
      </p>
    </div>
    <div class="col">
      <figure><img src="../../assets/api.jpg" /></figure>
    </div>
  </div>

  <l-map
    v-if="!(isMenu && isMobile())"
    v-model:zoom="zoom"
    :center="[centLat, centLon]"
    class="map"
    @click="addMarker"
  >
    <l-tile-layer
      url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=tT3HEqcxv90g1FSDwwOS"
    ></l-tile-layer>
    <l-marker
      v-for="(marker, index) in markers"
      v-bind:key="marker"
      :lat-lng="[marker.posLat, marker.posLon]"
      @click="markerClick(index)"
    >
      <l-popup>
        <Posts
          @delete-post="deletePost"
          :marker="marker"
          :markerIndex="index"
        />
        <input
          style="height: 100%; width: 200px"
          id="addPostTextArea"
          :class="[
            postsManager.addingPost ? 'visible' : 'd-none',
            'form-control',
          ]"
          placeholder="Aggiungi una nota!"
        />

        <div class="align-center p-1" style="height: 100%; width: 200px">
          <!-- Add note button. -->
          <svg
            @click="
              postsManager.addingPost = !postsManager.addingPost;
              document.getElementById('addPostTextArea').value = '';
            "
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            :class="[!postsManager.addingPost ? 'visible' : 'd-none']"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
          <!-- Exit from addPost mode button. -->
          <button
            type="button"
            @click="cancel()"
            :class="[
              postsManager.addingPost ? 'visible' : 'd-none',
              'btn btn-outline-dark',
            ]"
            style="border-color: white; border-radius: 70px"
          >
            Cancella
          </button>
          <!-- Add post button. -->
          <button
            type="button"
            @click="addPost(index)"
            :class="[
              postsManager.addingPost ? 'visible' : 'd-none',
              'btn btn-outline-success',
            ]"
            style="float: right; border-color: white; border-radius: 70px"
          >
            Aggiungi
          </button>
          <button
            type="button"
            @click="removeMarker(index, marker.id)"
            :class="[
              postsManager.addingPost ? 'd-none' : 'visible',
              'btn btn-lg ',
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
              />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import Posts from "./posts";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { getMarkers } from "./markers";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    Posts,
    LPopup,
  },
  props: ["user", "isMenu"],
  data() {
    return {
      zoom: 6,
      centLat: 41.541,
      centLon: 12.29,
      markers: [],
      updated: false,
      postsManager: {
        addingPost: false,
        isMarkerActive: false,
        clickOutsideMap: false,
        markerActiveIndex: -1,
      },
    };
  },
  methods: {
    log(message) {
      console.log(message);
    },
    markerClick(index) {
      // Login to manage marker and map click interaction.
      if (
        !this.postsManager.isMarkerActive &&
        this.postsManager.markerActiveIndex != index
      ) {
        this.postsManager.isMarkerActive = true;
        this.postsManager.markerActiveIndex = index;
      } else if (
        this.postsManager.isMarkerActive &&
        this.postsManager.markerActiveIndex == index
      ) {
        this.postsManager.isMarkerActive = false;
        this.postsManager.markerActiveIndex = -1;
      }
    },
    addMarker(event) {
      if (!event.latlng) {
        return;
      }

      localStorage.setItem("/tivity/lastPositionMaplat", event.latlng.lat);
      localStorage.setItem("/tivity/lastPositionMaplng", event.latlng.lng);

      if (this.postsManager.isMarkerActive) {
        this.postsManager.isMarkerActive = false;
        this.postsManager.clickOutsideMap = true;
        return;
      }
      if (this.postsManager.clickOutsideMap) {
        this.postsManager.clickOutsideMap = false;
        return;
      }

      const newMarker = {
        userId: this.user.id,
        posLat: event.latlng.lat,
        posLon: event.latlng.lng,
      };

      fetch("http://localhost:8080/" + "api/user/createMarker", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMarker),
      })
        .then((res) => {
          if (res.status !== 200) {
            return alert("Error, please try later");
          }

          res.json().then((marker) => {
            this.markers.push(marker);
          });
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    },
    removeMarker(index, markerId) {
      fetch(process.env.VUE_APP_API_URL + "api/user/removeMarker", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markerId: markerId }),
      })
        .then((res) => {
          if (res.status !== 200) {
            return alert("Error, please try later");
          }
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
      // TODO: move into fetch  positive response
      // Remove marker from local storage

      this.markers.splice(index, 1);
    },
    addPost(index) {
      const newPostValue = document.getElementById("addPostTextArea").value;
      if (newPostValue) {
        this.postsManager.addingPost = false;
        fetch("http://localhost:8080/" + "api/user/addPost", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post: newPostValue,
            markerId: this.markers[index].id,
          }),
        })
          .then((res) => {
            if (res.status !== 200) {
              return alert("Error, please try later");
            }
            this.markers[index].posts.push(newPostValue);
            document.getElementById("addPostTextArea").value = "";
          })
          .catch((err) => {
            console.log("Something went wrong", err);
          });
      }
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
    deletePost(index, markerId) {
      if (confirm("Are you sure?")) {
        fetch("http://localhost:8080/" + "api/user/deletePost", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            post: this.markers[markerId].posts[index],
            markerId: this.markers[markerId].id,
          }),
        })
          .then((res) => {
            if (res.status !== 200) {
              return alert("Error, please try later");
            }
            this.markers[markerId].posts.splice(index, 1);
            document.getElementById("addPostTextArea").value = "";
          })
          .catch((err) => {
            console.log("Something went wrong", err);
          });
      }
    },
    cancel() {
      this.postsManager.addingPost = false;
    },
  },
  emits: ["change-section"],
  async created() {
    const lat = localStorage.getItem("/tivity/lastPositionMaplat");
    const lng = localStorage.getItem("/tivity/lastPositionMaplng");
    if (lat && lng) {
      this.centLat = lat;
      this.centLon = lng;
    }
    this.updated = false;
    const markers = await getMarkers(this.$props.user.id);
    this.markers = [];
    for (const marker of markers) {
      this.markers.push(marker);
    }

    this.$emit("change-section", "/map");
  },
  async updated() {
    if (this.$props.isMenu) this.isMenu = this.$props.isMenu;

    if (this.$props.user.id && !this.updated) {
      const markers = await getMarkers(this.$props.user.id);
      this.markers = [];
      for (const marker of markers) {
        this.markers.push(marker);
      }
      this.updated = true;
    }
    this.$emit("change-section", "/map");
  },
  watch: {
    async user(u) {
      console.log(u.id);
      const markers = await getMarkers(u.id);
      this.markers = [];
      for (const marker of markers) {
        this.markers.push(marker);
      }
    },
  },
};
</script>

<style>
.form-control {
  border-color: black;
}
.container {
  width: 100%;
}
.map {
  height: 100%;
  width: 100%;
}

.rounded-top {
  border-radius: 20px 20px 0% 0%;
}

figure {
  display: flex;
  margin-bottom: 1em;
  margin-right: 160px;
  float: right;
  width: 200px;
  justify-content: center;
  align-items: center;
}
</style>
