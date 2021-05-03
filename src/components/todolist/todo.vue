<template>
  <div id="todolist">
      <br />
      <h1 class="app-title">Cose da fare</h1>
      <div class="checklist-icon">
        <figure><img src="./checklist.png" /></figure>
      </div>
      Usa questa pagina per appuntarti le cose che non vuoi dimenticarti.
      <br />
      Scrivi ciò che vuoi fare oggi e clicca <em>Enter</em> per aggiungere un
      task<br />
      alla tua lista di cose da fare.<br />
      Se vuoi modificare o eliminare un task, basta che clicchi sulle icone a
      fianco!
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
        <form id="form">
          <input
            autofocus
            type="text"
            aria-label="Enter a new todo item"
            placeholder="Ad esempio: Vai a fare la spesa"
            v-model="todo"
            @keyup.enter="storeToDo"
          />
        </form>
      </div>
      <div v-else>
        <form id="form">
          <input
            autofocus
            type="text"
            aria-label="Enter a new todo item"
            placeholder="Ad esempio: Vai a fare la spesa"
            v-model="todo"
          />
        </form>
        <input type="submit" value="Salva" @click="updateToDo" />
      </div>
      <br />

      <h5>Oggi ho deciso di:</h5>

      <br />
      <ul>
        <li
          v-for="(todo, i) in todos"
          :key="i"
          v-bind:class="todo.done ? 'done' : ''"
        >
          <span class="label">{{ todo.label }}</span>
          <div class="actions">
            <button
              class="btn btn-lg"
              type="button"
              v-on:click="markAsDoneOrUndone(todo)"
              style="background-color: transparent;"
            >
              <div v-if="todo.done">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M21.03 5.72a.75.75 0 010 1.06l-11.5 11.5a.75.75 0 01-1.072-.012l-5.5-5.75a.75.75 0 111.084-1.036l4.97 5.195L19.97 5.72a.75.75 0 011.06 0z"
                  ></path>
                </svg>
              </div>
              <div v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"
                  ></path>
                </svg>
              </div>
            </button>
            <button
              class="btn btn-lg"
              type="button"
              v-on:click="deleteToDo(i)"
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
                  d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"
                ></path>
                <path
                  d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"
                ></path>
                <path
                  d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"
                ></path>
              </svg>
            </button>
          </div>
        </li>
      </ul>

      <div v-if="todos.length == 0">
        <p>Non ti rimangono cose da fare oggi, bene! ✔️</p>
      </div>
      <div v-else-if="todos.length == 1">
        <p>Ti rimane una cosa da fare oggi 💪</p>
      </div>
      <div v-else>
        <p>Ti rimangono {{ todos.length }} cose da fare oggi 💪</p>
      </div>
      <!--div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div-->
    <br />
  </div>
</template>

<script>
import Menu from "../navigationMenu/navigationMenu.vue"
export default {
  el: "#todolist",
  components:{
      Menu
  },
  data() {
    return {
      todo: "",

      todos: [],

      selectedIndex: null,
      isEditing: false,
    };
  },

  methods: {
    storeToDo() {
      if (this.todo.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: Math.floor(Math.random() * 9999) + 10,
        label: this.todo,
        done: false,
      });
      this.todo = "";
    },

    editToDo(i, todo) {
      this.todo = todo;
      this.selectedIndex = i;
      this.isEditing = true;
    },

    updateToDo() {
      this.todos.splice(this.selectedIndex, 1, this.todo);
      //elimino un item, ovvero this.selectedIndex e lo updato a this.todo
      this.isEditing = false;
    },

    deleteToDo(i) {
      this.todos.splice(i, 1);
    },
  },

  markAsDoneOrUndone(todo) {
    todo.done = !todo.done;
  },
};
</script>

<style>
h1 {
  text-align: left;
  font-weight: bold;
}
h2 {
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
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0px;
  margin-right: 200px;
  width: 200px;
  float: right;
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
</style>
