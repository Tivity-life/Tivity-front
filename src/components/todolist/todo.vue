<template>
 <div class="m-4" id= "todolist">
  <h1 class= "app-title">Cose da fare</h1>
    <div class="checklist-icon">        
        <figure><img src="./checklist.png"></figure>
    </div>
    Usa questa pagina per appuntarti le cose che non vuoi dimenticarti.
    <br>
    Scrivi ciò che vuoi fare oggi e clicca <em>Enter</em> per aggiungere un task<br> alla tua lista di cose da fare.<br>
    Se vuoi modificare o eliminare un task, basta che clicchi sulle icone
    a fianco!
    <br><br>
    <div class="empty-state">
        <h2 class="empty-state__title">Inizia a scrivere la tua todo list!</h2>
        <p class="empty-state__description">Quali sono i tuoi obiettivi per oggi?</p>
    </div><br>
    <!--Form per l'inserimento degli elementi nella lista-->
    <!--Controlli sugli elementi della lista-->
    <div v-if="!isEditing"> 
        <form id="form">
            <input type="text" aria-label="Enter a new todo item" 
            placeholder="Ad esempio: Vai a fare la spesa" v-model= "todo" v-on:keyup.enter="storeToDo(todo)">
        </form>
    </div>
    <div v-else>
        <form id="form">
            <input type="text" 
            aria-label="Enter a new todo item" v-model= "todo">
        </form>
        <input type= "submit" value= "Salva" @click="updateToDo()">
    </div>
    <br>
    
    <h5>Oggi ho deciso di:</h5>
      <div id= "show">
        <div v-if= "todos.length > 0">
          <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" 
                name="inlineRadioOptions" id="inlineRadio1" value="option1" v-on:click= "showUndone = true,
                showDone = false, showAll = false">
                Mostra solo le cose non fatte
          </div>
          <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" 
              name="inlineRadioOptions" id="inlineRadio2" value="option2" v-on:click= "showDone= true, 
              showUndone= false, showAll = false">
              Mostra solo le cose fatte
          </div>
           <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" 
              name="inlineRadioOptions" id="inlineRadio3" value="option3" v-on:click= "showAll= true, showDone= false, showUndone = false">
              Mostra tutto
          </div>
        </div>
        <div v-else>
          <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" 
              name="inlineRadioOptions" id="inlineRadio1" value="option1" disabled>Mostra solo le cose non fatte
          </div>
          <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" 
              name="inlineRadioOptions" id="inlineRadio2" value="option2" disabled>Mostra solo le cose fatte
          </div>
          <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" 
              name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>Mostra tutto
          </div>
        </div>
      
      </div>
      <ul>
        <li v-for= "(todo, i) in todosByStatus" :key=  i>
            <input type="checkbox" :id= "todo.label" v-on:change="markAsDoneOrUndone(i)" v-bind:checked="todo.done"/>
            <label class="label-agree-term" :for= todo.label><span></span>{{ todo.label }} </label>
          
            <div class= "actions">
              <button class= "btn btn-lg" type= "button"  v-on:click="editToDo(i, todo)" style= "background-color: transparent;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" 
                  class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 
                    0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 
                    .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 
                    1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 
                    1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </button>
              
              <button class="btn btn-lg" type="button" v-on:click="deleteToDo(i)" aria-label="Delete" 
              title="Delete" style= "background-color: transparent;"> 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" 
                  height="24"><path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 
                  0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 
                  0 01.25.25V3h-5V1.75z"></path><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 
                  001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z">
                  </path><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 
                  0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path></svg>
                </button>
            
            </div>
        
        </li> 
          
      </ul>
      <div v-if= "todos.filter(todo => {return todo.done === false}).length == 0">
          <p>Non ti rimangono cose da fare oggi, bene! ✔️</p>
      </div>
      <div v-else-if= "todos.filter(todo => {return todo.done === false}).length == 1">
          <p>Ti rimane una cosa da fare oggi 💪</p>
      </div>
      <div v-else>
          <p>Ti rimangono {{todos.filter(todo => {return todo.done === false}).length}} cose da fare oggi 💪</p>
      </div>
      
      </div><br>
      
      <!-- Material switch -->
    
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
      
      showUndone: false,
      showDone: false,
      showAll: false,
    };
  },

  methods: {
    storeToDo(todo) {
      if (todo.length == 0) {
        return
      }
      this.todos.push({
        id: Math.floor(Math.random() * 9999) + 10,
        label: todo,
        done: false,
      });
      this.todo = "";
    },

    editToDo(i, todo) {
      this.todo = todo.label;
      this.selectedIndex = i;
      this.isEditing = true;
    },

    updateToDo() {
      this.todos.splice(this.selectedIndex, 1, {id:Math.floor(Math.random() * 9999) + 10, label: this.todo, done: false});
      //elimino un item, ovvero this.selectedIndex e lo updato a this.todo*/
      this.isEditing = false;
      this.todo= "";
    },

    deleteToDo(i) {
      this.todos.splice(i, 1);
    },
    
    markAsDoneOrUndone(i) {
      this.todos[i].done = !this.todos[i].done;
    },

  },

  computed: {
    todosByStatus: function() {
      var arrayTodos= [];
      var undo = this.todos.filter(todo => {return todo.done === false});
      var done= this.todos.filter(todo => {return todo.done=== true});

      if (this.showUndone === true) {
        arrayTodos= [...undo];
      }
      else if (this.showDone === true) {
        arrayTodos= [...done];
      }
      else if (this.showAll === true){
        arrayTodos= this.todos;
      }
      else {
        arrayTodos= this.todos;
      }

      return arrayTodos;
    }
  },
  emits: ["change-section"],
  created() {
    this.$emit("change-section","/to-do");
  },

};
</script>

<style>

h1 {text-align: left;
    font-weight: bold;}
h2 {text-align: center;}
p {text-align: center;}


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
    
	display:flex;
	margin:0 -3rem 4px;
	padding:1rem 2.2rem;
	justify-content:space-between;
	align-items:center;
	font-size:medium;
}

#todolist .label {
	position:relative;
	transition:opacity .2s linear;
}
#todolist .done .label {
	opacity:10;
}

h5 {
    text-align:center;
}

#show {
    text-align: center;
}




</style>