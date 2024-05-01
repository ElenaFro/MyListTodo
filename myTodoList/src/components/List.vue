<template>
    <select v-model="sortBy">
        <option value="date">Sort By date</option>
        <option value="price">Price</option>
    </select>
    <ul class="tweets__wrapper">
        <Item v-for="item in sorteredItems" :key="item.id" :item="item"/>
    </ul>
</template>

<script>
import { ref, computed } from 'vue'
import Item from './Item.vue'
export default {
    components: { Item },
    props: {
        items: {
            type: Array,
            required: true
            }
    },
    setup({ items }) {
        const sortBy = ref('date')

        const sorteredItems = computed(() => {
            return items.sort((a, b) => {
                if (a[sortBy.value] > b[sortBy.value]) return -1
                if (a[sortBy.value] < b[sortBy.value]) return 1
                return 0;
            })
        }) 
        return { sortBy, sorteredItems }
    }
}
</script>