<template>
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
        <Posts @delete-post="deleteTask" :posts="marker.posts" />
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
import { create_UUID } from "../../utility/util.js";
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
          posts: [
            { id: 1, text: "test1" },
            { id: 2, text: "test2" },
          ],
        },
      ],
      postsManager: {
        addingPost: false,
        isMarkerActive: false,
        markerActiveIndex: -1,
      },
    };
  },
  methods: {
    log(message) {
      console.log(message);
    },
    markerClick(index) {
      if (!this.isMarkerActive || this.markerActiveIndex != index) {
        this.isMarkerActive = true;
        this.markerActiveIndex = index;
      } else if (this.isMarkerActive && this.markerActiveIndex == index) {
        this.isMarkerActive = false;
        this.markerActiveIndex = -1;
      }
    },
    addMarker(event) {
      console.log(event)
      if(this.isMarkerActive){
        return;
      }
      console.log("add")
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
      console.log("index2");

      fetch("http://localhost:8080/api/user/removeMarker", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markerId: markerId }),
      })
        .then((res) => {
          console.log(res.status);
          if (res.status !== 200) {
            return alert("Error, please try later");
          }
          // Remove marker from local storage
          console.log("index");
          console.log(index);
          console.log(markerId);
          console.log(this.markers);
          this.markers.splice(index, 1);
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    },
    addPost(index) {
      this.postsManager.addingPost = false;
      const newPost = document.getElementById("addPostTextArea").value;
      if (newPost) {
        this.markers[index].posts.push({
          id: create_UUID(),
          text: newPost,
        });
      }
      document.getElementById("addPostTextArea").value = "";
    },
    deleteTask(id) {
      const region = this.map[this.postsManager.regionActive];
      if (confirm("Are you sure?")) {
        for (let i = 0; i < region.posts.length; i++) {
          if (region.posts[i].id == id) {
            this.map[this.postsManager.regionActive].posts.splice(i, 1);
          }
        }
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
</style>
