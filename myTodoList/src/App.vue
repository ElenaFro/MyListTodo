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
import { ref, onMounted } from 'vue';
// import { v4 as uuidv4 } from 'uuid';
import { 
  collection, 
  getDocs, 
  onSnapshot, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc,
  query, 
  orderBy, 
  limit
} from 'firebase/firestore';
import { db } from '@/firebase';

// firebase ref
const todosCollectionRef = collection(db, "todos")
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"), limit(4))

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

// onMounted( async () => {
  // const querySnapshot = await getDocs(collection(db, "todos"));
  // let fbTodos = []
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  //   const todo = {
  //     id: doc.id,
  //     content: doc.data().content,
  //     done: doc.data().done
  //   }
  //   fbTodos.push(todo)
  // });
  // todos.value = fbTodos
  // })

onMounted(() => {  
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbTodos.push(todo)
    });
    todos.value = fbTodos
  });
})

const newtodoContent = ref("")

const addTodo = () => {

  // const newTodo = {
  //   id: uuidv4(),
  //   content: newtodoContent.value,
  //   done: false
  // }
  // todos.value.unshift(newTodo)
  addDoc(todosCollectionRef, {
    content: newtodoContent.value,
    done: false,
    date: Date.now()
  });

  newtodoContent.value = ""
}

const deleteTodo = (id) => {
  // todos.value = todos.value.filter((todo) => todo.id !== id)
  deleteDoc(doc(todosCollectionRef, id))
}

const toggleDone = (id) => {
  // const todo = todos.value.find((todo) => todo.id === id)
  // todo.done = !todo.done
  // как в лекции:
  const index = todos.value.findIndex((todo) => todo.id === id)
  // todos.value[index].done = !todos.value[index].done

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  });
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