<template>
    <div class="text-center">
        <v-progress-circular :model-value="value" :rotate="360" :size="300" :width="15" color="teal">
            {{ value }}
        </v-progress-circular>


    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { LoadStatistic } from '../services/ressources';

const value = ref(0)
const getHeapStatistics = ref()
const interval = ref(null)

onMounted(() => {
    LoadStatistic().subscribe((d) => {
        getHeapStatistics.value = d
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