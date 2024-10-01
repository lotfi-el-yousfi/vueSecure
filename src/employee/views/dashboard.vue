<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Get_Endpoint, LoadEndpoints } from '../services/ressources';

import { useEmployee } from '../stores';
// import { VDataTable, VTextField } from 'vuetify/components'


const employeeStore = useEmployee();
const search = ref('')
const headers = ref([
    { title: 'Name', key: 'name', sortable: true },
    { title: 'Email', key: 'email', sortable: false },
    { title: 'Phone', key: 'phone', sortable: false },
])
const items = ref([])

onMounted(async () => {
    LoadEndpoints().subscribe((r) => {
        console.log('dashboard loading ');
    })


    Get_Endpoint(employeeStore.selected_Table).subscribe((data) => {
        items.value = data
    })
})
</script>

<template>
    <v-data-table v-model:search="search" :headers="headers" :items="items" :items-per-page="10" class="elevation-1">
        <template #top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
    </v-data-table>
</template>
