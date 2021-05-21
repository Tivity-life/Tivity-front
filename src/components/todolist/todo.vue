<template>
<div :class="[isMobile() ? 'container' : '']">
  <div class="m-4" id="todolist">
    <div class="app-title">Cose da fare<span style= "font-size: 35px"> ✏️ </span></div>
    <div>
      <figure style=""><img src="../../assets/prova4.jpg" /></figure>
    </div>
    <div class= "descr-todo">
    Usa questa pagina per appuntarti le cose che non vuoi dimenticarti.
    <br />
    Scrivi ciò che vuoi fare oggi e clicca <em>Enter</em> per aggiungere un
    task<br />
    alla tua lista di cose da fare.<br />
    Se vuoi modificare o eliminare un task, basta che clicchi sulle icone a
    fianco!
    </div>
    <br /><br />
    <div class="empty-state">
      <h2 class="empty-state__title">Inizia a scrivere la tua todo list!</h2>
      <p class="empty-state__description">
        Quali sono i tuoi obiettivi per oggi?
      </p>
    </div>
    <br />
    <!--Form per l'inserimento degli elementi nella lista-->
    <!--Controlli sugli elementi della lista-->
    <div v-if="!isEditing">
      <div id="form">
        <input
          type="text"
          aria-label="Enter a new todo item"
          placeholder="Ad esempio: Vai a fare la spesa"
          v-model="todo"
          v-on:keyup.enter="storeToDo(todo)"
        />
      </div>
    </div>
    <div v-else>
      <div id="form">
        <input type="text" aria-label="Enter a new todo item" v-model="todo" />
      </div>
      <input type="submit" value="Salva" @click="updateToDo()" />
    </div>
    <br />

    <h5>Oggi ho deciso di:</h5>
    <div id="show">
      <div v-if="todos.length > 0">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="option1"
            v-on:click="
              (showUndone = true), (showDone = false), (showAll = false)
            "
          />
          Mostra solo le cose non fatte
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="option2"
            v-on:click="
              (showDone = true), (showUndone = false), (showAll = false)
            "
          />
          Mostra solo le cose fatte
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="option3"
            v-on:click="
              (showAll = true), (showDone = false), (showUndone = false)
            "
          />
          Mostra tutto
        </div>
      </div>
      <div v-else>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="option1"
            disabled
          />Mostra solo le cose non fatte
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="option2"
            disabled
          />Mostra solo le cose fatte
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="option3"
            disabled
          />Mostra tutto
        </div>
      </div>
    </div>
    <ul>
      <li v-for="(todo, i) in todosByStatus" :key="i">
        <input
          type="checkbox"
          :id="todo.label"
          v-on:change="markAsDoneOrUndone(todo.id, todo.done)"
          v-bind:checked="todo.done"
        />
        <label class="label-agree-term" :for="todo.label"
          ><span></span>{{ todo.label }}
        </label>

        <div class="actions">
          <button
            class="btn btn-lg"
            type="button"
            v-on:click="editToDo(i, todo)"
            style="background-color: transparent;"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 
                    0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 
                    .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 
                    1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 
                    1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </button>

          <button
            class="btn btn-lg"
            type="button"
            v-on:click="deleteToDo(todo)"
            aria-label="Delete"
            title="Delete"
            style="background-color: transparent;"
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
      </li>
    </ul>
    <div
      v-if="
        todos.filter(todo => {
          return todo.done === false;
        }).length == 0
      "
    >
      <p>Non ti rimangono cose da fare oggi, bene! ✔️</p>
    </div>
    <div
      v-else-if="
        todos.filter(todo => {
          return todo.done === false;
        }).length == 1
      "
    >
      <p>Ti rimane una cosa da fare oggi 💪</p>
    </div>
    <div v-else>
      <p>
        Ti rimangono
        {{
          todos.filter(todo => {
            return todo.done === false;
          }).length
        }}
        cose da fare oggi 💪
      </p>
    </div>
  </div>
  <br />
</div>
<!-- Material switch -->
</template>

<script>
import Menu from "../navigationMenu/navigationMenu.vue";

export async function getTodos(userId) {
  return await fetch(
    process.env.VUE_APP_API_URL + "api/user/getTodos?userId=" + userId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(res => {
      if (res.status !== 200) {
        console.log("Something went wrong", err);
        return false;
      }
      return res.json();
    })
    .catch(err => {
      console.log("Something went wrong", err);
      return false;
    });
}

export default {
  el: "#todolist",
  components: {
    Menu,
  },
  props: ["user"],
  data() {
    return {
      todo: "",
      todoId: "",
      todos: [],

      selectedIndex: null,
      isEditing: false,

      showUndone: false,
      showDone: false,
      showAll: false,
    };
  },
  methods: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    },

    storeToDo(todo) {
      if (todo.length == 0) {
        return;
      }

      fetch(process.env.VUE_APP_API_URL + "api/user/createTodo", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: todo,
          done: false,
          userId: this.user.id,
        }),
      })
        .then(res => {
          if (res.status !== 200) {
            return alert("Error, please try later");
          }

          this.todo = "";

          getTodos(this.user.id).then(todos => (this.todos = todos));
        })
        .catch(err => {
          console.log("Something went wrong", err);
        });
    },
    editToDo(i, todo) {
      this.todo = todo.label;
      this.todoId = todo.id;
      this.selectedIndex = i;
      this.isEditing = true;
    },
    updateToDo() {
      this.todos.splice(this.selectedIndex, 1, {
        id: Math.floor(Math.random() * 9999) + 10,
        label: this.todo,
        done: false,
      });

      fetch(process.env.VUE_APP_API_URL + "api/user/updateTodo", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: this.todo,
          done: false,
          todoId: this.todoId
        }),
      })
        .then(res => {
          if (res.status !== 200) {
            return alert("Error, please try later");
          }

          //elimino un item, ovvero this.selectedIndex e lo updato a this.todo*/
          this.isEditing = false;
          this.todo = "";
          this.todoId = "";

          getTodos(this.user.id).then(todos => (this.todos = todos));
        })
        .catch(err => {
          console.log("Something went wrong", err);
        });
    },
    deleteToDo(todo) {
      fetch(process.env.VUE_APP_API_URL + "api/user/removeTodo", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId: todo.id
        }),
      })
        .then(res => {
          if (res.status !== 200) {
            return alert("Error, please try later");
          }

          getTodos(this.user.id).then(todos => (this.todos = todos));
        })
        .catch(err => {
          console.log("Something went wrong", err);
        });
    },

    markAsDoneOrUndone(todoId, done) {
      fetch(process.env.VUE_APP_API_URL + "api/user/updateTodo", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          done: !done,
          todoId: todoId
        }),
      })
        .then(res => {
          if (res.status !== 200) {
            return alert("Error, please try later");
          }

          getTodos(this.user.id).then(todos => (this.todos = todos));
        })
        .catch(err => {
          console.log("Something went wrong", err);
        });
    },
    
  },
  computed: {
    todosByStatus: function() {
      var arrayTodos = [];
      var undo = this.todos.filter(todo => {
        return todo.done === false;
      });
      var done = this.todos.filter(todo => {
        return todo.done === true;
      });
      if (this.showUndone === true) {
        arrayTodos = [...undo];
      } else if (this.showDone === true) {
        arrayTodos = [...done];
      } else if (this.showAll === true) {
        arrayTodos = this.todos;
      } else {
        arrayTodos = this.todos;
      }
      return arrayTodos;
    },
  },
  emits: ["change-section"],
  created() {
    this.$emit("change-section", "/to-do");
  },
  mounted() {
    if (this.$props.user) {
      getTodos(this.$props.user.id).then(todos => (this.todos = todos));
    }
  },
  watch: {
    user(u) {
      console.log(u);
      getTodos(u.id).then(todos => (this.todos = todos));
    },
  },
};
</script>

<style>
.container {
  width:100%
}
.app-title {
  font-weight: bold;
  font-size: 40px;
}
.descr-todo {
  text-align: left;
}
.empty-state__title {
  text-align: center;
}
p {
  text-align: center;
}
input[type="text"] {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgb(44, 31, 31);
}

figure {
  display: flex;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 50px;
  margin-right: 100px;
  width: 200px;
  float: right;
  justify-content: center;
  align-items: center;
}
#todolist li {
  display: flex;
  margin: 0 -3rem 4px;
  padding: 1rem 2.2rem;
  justify-content: space-between;
  align-items: center;
  font-size: medium;
}
#todolist .label {
  position: relative;
  transition: opacity 0.2s linear;
}
#todolist .done .label {
  opacity: 10;
}
h5 {
  text-align: center;
}
#show {
  text-align: center;
}

@media screen and (max-width: 480px) {
  figure {
    width:40%;
  }
}

@media screen and (max-width: 280px) {
  figure {
    width:25%;
  }
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
