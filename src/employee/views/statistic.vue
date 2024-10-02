<template>
    <div class="text-center">
        <v-progress-circular v-for="item in Statistics" :model-value="item.length" :rotate="360" :size="150" :width="15"
            color="teal">
            {{ item.length }} {{ item.name }}
        </v-progress-circular>


    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { LoadStatistic } from '../services/ressources';

const value = ref(0)
const Statistics = ref()
const interval = ref(null)

onMounted(() => {
    LoadStatistic().subscribe((d) => {
        Statistics.value = d
        console.log(d);
    })
})

onBeforeUnmount(() => {
    clearInterval(interval.value)
})
</script>
<style scoped>
.v-progress-circular {
    margin: 1rem;
}
</style>