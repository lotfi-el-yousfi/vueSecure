<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Get_Endpoint, LoadEndpoints } from '../services/ressources';

import { useEmployee } from '../stores';
// import { VDataTable, VTextField } from 'vuetify/components'


const employeeStore = useEmployee();
const search = ref('')
const dialog = ref(false)
const headers = ref<any>([

    { title: 'Name', key: 'name', sortable: true },
    { title: 'Email', key: 'email', sortable: false },
    { title: 'Phone', key: 'phone', sortable: false },
])
const items = ref<any>([])



const editItem = (item) => { }
const deleteItem = (item) => { }
const addItem = () => {
    dialog.value = true
}
const close = () => {
    dialog.value = false
}
const save = () => {
    dialog.value = false
}


onMounted(() => {
    LoadEndpoints().subscribe((r) => {
    })
    console.log("wtf");

    Get_Endpoint(employeeStore.selected_Table)
        .subscribe((data) => {
            headers.value = Object.keys(data[0]).map(key => ({
                title: key.charAt(0).toUpperCase() + key.slice(1),
                key,
                sortable: true,
            }));
            headers.value.push(
                { title: 'Edit', key: 'edit', sortable: false }
            )
            headers.value.push(
                { title: 'Delete', key: 'delete', sortable: false }
            )

            items.value = data
        })
})
</script>

<template>
    <v-data-table v-model:search="search" :headers="headers" :items="items" :items-per-page="10" class="elevation-1">
        <template #top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
            <v-btn color="primary" @click="addItem">New Item</v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col v-for="header in headers" :key="header.key" cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem[header.key]" :label="header.title"></v-text-field>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
