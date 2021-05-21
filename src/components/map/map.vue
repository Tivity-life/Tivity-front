<template     style="height: 100%; width: 100%"
>
  <div class="container row" style="border-radius: 20px 20px 0% 0%">
    <div class="text col" style="float: left; padding: 15px">
      <h2 style="padding: 10px; text-align: center">
        <span style="font-size: 25 px">🗺️</span> La mia mappa
      </h2>
      <p style="text-align: center">

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
    v-model="zoom"
    v-model:zoom="zoom"
    :center="[centLat, centLon]"
    style="height: 100%; width: 100%"
    @click="addMarker"
  >
    <l-tile-layer
      url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=tT3HEqcxv90g1FSDwwOS"
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
          placeholder="Add a Note!"
        />

        <div
          class="align-center"
          style="height: 100%; width: 200px; padding: 5px"
        >
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
            Cancel
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
            Add
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
  props: ["user"],
  data() {
    return {
      zoom: 6,
      centLat: 41.541,
      centLon: 12.29,
      markers: [
        {
          id: "dbec2e89-08e9-41b1-850a-0dd23a098cc8",
          posLat: 42.541,
          posLon: 13.29,
          posts: ["Terremoto :'(", "Ma che buono il cibo!"],
        },
        {
          id: "dbec2e89-08e9-41b1-850a-0dd23a098cc8",
          posLat: 42.541,
          posLon: 11.29,
          posts: [],
        },
      ],
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

      fetch(process.env.VUE_APP_API_URL + "api/user/createMarker", {
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
      console.log("startRemove");

      fetch(process.env.VUE_APP_API_URL + "api/user/removeMarker", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markerId: markerId }),
      })
        .then((res) => {
          console.log(res);
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
        fetch(process.env.VUE_APP_API_URL + "api/user/addPost", {
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
    deletePost(index, markerId) {
      console.log(index, markerId);
      if (confirm("Are you sure?")) {
        fetch(process.env.VUE_APP_API_URL + "api/user/deletePost", {
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
    if (this.$props.user.id) {
      const markers = await getMarkers(this.$props.user.id);
      for (const marker of markers) {
        this.markers.push(marker);
      }
    }
    this.$emit("change-section", "/map");
  },
  async updated() {
    if (this.$props.user.id) {
      const markers = await getMarkers(this.$props.user.id);
      for (const marker of markers) {
        this.markers.push(marker);
      }
    }
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
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
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
scoped