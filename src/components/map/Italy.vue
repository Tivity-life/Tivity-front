<template>
  <div class="map text-center">
    <img src="../../assets/rsz_italy_map.png" usemap="#image-map" />
    <map name="image-map">
      <area
        alt="sardegna"
        title="sardegna"
        @click="regionClick('sardegna', 48, -1)"
        coords="92,428,107,402,114,408,112,421,157,393,187,440,180,531,164,538,147,532,140,549,89,539,95,458,89,451"
        shape="poly"
      />
      <area
        alt="lazio"
        title="lazio"
        @click="regionClick('lazio', 58, 20)"
        coords="251,336,265,311,303,338,332,314,337,322,328,335,339,345,335,354,323,358,337,364,353,373,367,378,363,405,346,407,327,406,302,391"
        shape="poly"
      />
    </map>
    <br />

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
        <h5 class="card-title">{{ map[postsManager.regionActive].name }}</h5>

        <Posts
          @delete-post="deleteTask"
          :posts="map[postsManager.regionActive].posts"
        />

        <textarea
          id="addPostTextArea"
          :class="[
            postsManager.addingPost && postsManager.postActive
              ? 'visible'
              : 'd-none',
            'form-control-sm',
          ]"
          placeholder="Add a Note!"
        />
        <div class="">
          <svg
            @click="postsManager.addingPost = !postsManager.addingPost;
            document.getElementById('addPostTextArea').value = '';"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="24"
            height="24"
            :class="[
              !postsManager.addingPost && postsManager.postActive
                ? 'visible'
                : 'd-none',
            ]"
          >
            <path
              fill-rule="evenodd"
              d="M13.25 2.5H2.75a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25zM2.75 1h10.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 15H2.75A1.75 1.75 0 011 13.25V2.75C1 1.784 1.784 1 2.75 1zM8 4a.75.75 0 01.75.75v2.5h2.5a.75.75 0 010 1.5h-2.5v2.5a.75.75 0 01-1.5 0v-2.5h-2.5a.75.75 0 010-1.5h2.5v-2.5A.75.75 0 018 4z"
            ></path>
          </svg>

          <button
            type="button"
            @click="addPost()"
            :class="[
              postsManager.addingPost && postsManager.postActive
                ? 'visible'
                : 'd-none',
              'btn-sm btn-outline-success',
            ]"
          >
            Add
          </button>

          <button
            type="button"
            @click="cancel()"
            :class="[
              postsManager.addingPost && postsManager.postActive
                ? 'visible'
                : 'd-none',
              'btn-sm btn-outline-secondary ms-2 ',
            ]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  <p>
    addingPost {{ postsManager.addingPost }} postActive
    {{ postsManager.postActive }}
    <br />
    regionLeft {{ postsManager.regionLeft }} regionBottom
    {{ postsManager.regionBottom }}
    <br />
    aaa {{ postsManager.regionActive }}
    <br />
    aaa {{ map[postsManager.regionActive] }}
  </p>
</template>

<script>
import Posts from "./posts";

export default {
  name: "Italy",
  data() {
    return {
      upHere: false,
      postsManager: {
        addingPost: false,
        postActive: false,
        regionActive: "sardegna",
        regionLeft: "0%",
        regionBottom: "0%",
      },
      map: {
        sardegna: {
          name: "Sardegna",
          posts: [
            { id: 1, text: "Belle le pecore!" },
            { id: 2, text: "Ho mangiato degli ottimi biscotti da Sandro :)" },
          ],
        },
        lazio: {
          name: "Lazio",
          posts: [{ id: 1, text: "Carbonara!!" }],
        },
        pippo: {
          name: "pippo",
          posts: [{ id: 1, text: "Carbonara!!" }],
        },
      },
      seen: true,
    };
  },
  methods: {
    // Manage region click and posts card visibility
    regionClick(region, bottom, left) {
      this.postsManager.postActive && this.postsManager.regionActive == region
        ? (this.postsManager.postActive = !this.postsManager.postActive)
        : (this.postsManager.postActive = true);
      this.postsManager.regionActive = region;
      this.postsManager.regionLeft = left;
      this.postsManager.regionBottom = bottom;
    },
    addPost() {
      this.postsManager.addingPost = false;
      const newPost = document.getElementById("addPostTextArea").value;
      if (newPost) {
        this.map[this.postsManager.regionActive].posts.push({
          id: this.map[this.postsManager.regionActive].posts.length,
          text: newPost,
        });
      };
      document.getElementById('addPostTextArea').value = ''
    },
    deleteTask(id) {
      const region = this.map[this.postsManager.regionActive];
      console.log(region);
      console.log(this.postsManager.regionActive);
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
  components: {
    Posts,
  },

  created() {
    //Call to backend
    // this.map.sardegna.posts =
  },
};
</script>

<style>
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
