<template>
    <form @submit.prevent="onSubmit">
        <textarea v-model="body" required placeholder="Type tweet here"></textarea>
        <button class="btn btnTweet" type="submit">Post Tweet</button>
    </form>
</template>
<script>
import { ref } from 'vue'
export default {
    emits: ["onSubmit"],
    setup(_, { emit }) {
        const body = ref('')
        const onSubmit = () => {
            emit("onSubmit", {
                id: Math.round(Math.random() * 30),
                avatar: 'https://i.pravatar.cc/150?img=1',
                body: body.value,
                likes: 0,
                date: new Date(Date.now()).toLocaleString()
            })
            body.value = ''
        }
        return { body, onSubmit }
    }
}
</script>