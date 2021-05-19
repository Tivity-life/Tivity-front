<template>
  <div class="container">
    <div class="text" style="float: left; padding: 10px">
      <h2 style="padding: 10px; text-align:center;">La mia mappa</h2>
      <p style="text-align:center;">
        Hai in mente tanti viaggi da fare in giro per il mondo? 🌎<br />
        Naviga nella mappa, gira il mondo e lascia dei <strong>pin</strong> sopra i luoghi che non puoi
        perdere!<br>Inserisci le note sui pin per mantenere i tuoi ricordi sempre con te.
      </p>
    </div>
    <figure><img src="../../assets/api.jpg" /></figure>
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

        <div class="align-center" style="height: 100%; width: 200px">
          <!-- Add note button. -->
          <svg
            @click="
              postsManager.addingPost = !postsManager.addingPost;
              document.getElementById('addPostTextArea').value = '';
            "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="24"
            height="24"
            :class="[!postsManager.addingPost ? 'visible' : 'd-none']"
          >
            <path
              fill-rule="evenodd"
              d="M13.25 2.5H2.75a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zM2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM8 4a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4z"
            ></path>
          </svg>

          <!-- Add post button. -->
          <button
            type="button"
            @click="addPost(index)"
            :class="[
              postsManager.addingPost ? 'visible' : 'd-none',
              'btn-sm btn-outline-success',
            ]"
          >
            Add
          </button>
          <!-- Exit from addPost mode button. -->
          <button
            type="button"
            @click="cancel()"
            :class="[
              postsManager.addingPost ? 'visible' : 'd-none',
              'btn-sm btn-outline-secondary ms-2 ',
            ]"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="removeMarker(index, marker.id)"
            :class="[
              postsManager.addingPost ? 'd-none' : 'visible',
              'btn-sm btn-outline-secondary ms-2 ',
            ]"
          >
            Delete
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

      fetch("http://localhost:8080/api/user/createMarker", {
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

      fetch("http://localhost:8080/api/user/removeMarker", {
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
        fetch("http://localhost:8080/api/user/addPost", {
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
        fetch("http://localhost:8080/api/user/deletePost", {
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
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual Card */
.map .cardPost {
  position: absolute;
}

.map .btn-sm {
  background: white;
}

/* Card arrow */
.map .cardPost::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Add animation (fade in the Card) */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
