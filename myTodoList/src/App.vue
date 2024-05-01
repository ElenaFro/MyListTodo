<template>
  <div class="wrapper-todo">
    <div class="title has-text-centered">Список задач</div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <input v-model="newtodoContent" class="input" type="text" placeholder="задача">
      </p>
      <p class="control">
        <button :disabled="!newtodoContent" class="button is-info">
          Добавить
        </button>
      </p>
    </div>
    </form>

    <div 
      v-for="todo in todos" 
      :key="todo.id" 
      class="card" 
      :class="{'has-background-success-light': todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column"
            :class="{'has-text-success line-trough': todo.done}">
              {{todo.content}}
            </div>
            <div class="column has-text-right">
              <button 
                @click="toggleDone(todo.id)"
                class="button is-ligth"
                :class="todo.done? 'is-success' : 'is-light'"
              >
                &check;
              </button>
              <button 
                @click="deleteTodo(todo.id)" 
                class="button is-danger ml-2"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const todos = ref([
  // {
  //   id: "id1",
  //   content: "hello",
  //   done: false
  // },
  // {
  //   id: "id2",
  //   content: "check this thing",
  //   done: false
  // }
])

const newtodoContent = ref("")

const addTodo = () => {
  // console.log("addTodo")
  const newTodo = {
    id: uuidv4(),
    content: newtodoContent.value,
    done: false
  }
  todos.value.unshift(newTodo)
  newtodoContent.value = ""
}

const deleteTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

const toggleDone = (id) => {
  const todo = todos.value.find((todo) => todo.id === id)
  //можно было как в лекции:
  // const index = todos.value.findIndex((todo) => todo.id === id)
  // todos.value[index].done = !todos.value[index].done
  todo.done = !todo.done
}

</script>

<style>
@import "bulma/css/bulma.min.css";

.wrapper-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-trough {
  text-decoration: line-through;
}
</style>