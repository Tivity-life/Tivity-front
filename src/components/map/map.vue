<template>
  <!-- <div style="height: 100%; width: 100%"> -->
  <!-- <img src="../../assets/rsz_italy_map.png" usemap="#image-map" />
    <map name="image-map">
      <area
        alt="sardegna"
    <l-geo-json :geojson="geojson" :options="geojsonOptions" />

    <div id="mapAPI" style="height: 100%; width: 100%"></div>

    <button onclick="yee()">aaaa</button>
    <div
      :class="[
        postsManager.postActive ? 'visible' : 'd-none',
        'cardPost',
        'card w-50',
      ]"
      :style="{
        bottom: postsManager.regionBottom + '%',
        left: postsManager.regionLeft + '%',
      }"
    >
      <div class="card-body">
        
      </div>
    </div>
  </div> -->

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
      :lat-lng="[marker.posLat,marker.posLon]"
    >
      <!-- <h5 class="card-title">{{ map[postsManager.regionActive].name }}</h5> 
      @click="removeMarker(index)"
      -->
      <l-popup>
        <Posts
          @delete-post="deleteTask"
          :posts="marker.posts"
          style="height: 100%; width: 200px"
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

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    Posts,
    LPopup,
  },
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
      },
    };
  },
  methods: {
    log(message) {
      console.log(message);
    },
    addMarker(event) {
      this.markers.push({
        posLat: event.latlng.lat, posLon:event.latlng.lng,
        id: create_UUID(),
        posts: [],
      });
    },
    removeMarker(index) {
      this.markers.splice(index, 1);
    },
    // Manage region click and posts card visibility
    regionClick(region, bottom, left) {
      this.postsManager.postActive && this.postsManager.regionActive == region
        ? (this.postsManager.postActive = !this.postsManager.postActive)
        : (this.postsManager.postActive = true);
      this.postsManager.regionActive = region;
      this.postsManager.regionLeft = left;
      this.postsManager.regionBottom = bottom;
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
  async beforeMount() {},

  emits: ["change-section"],
  created() {
    this.$emit("change-section", "/map");
  },
  mounted() {},
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
