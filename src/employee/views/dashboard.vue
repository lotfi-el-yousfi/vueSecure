<template>
    <v-card :title="`${table_name} Dashboard`" flat>
        <template v-slot:text>
            <v-text-field v-model="search" label="Search" clearable prepend-inner-icon="mdi-magnify" variant="outlined"
                hide-details single-line></v-text-field>
        </template>
        <v-data-table :search="search" :headers="headers" :items="items" :sort-by="[{ key: 'calories', order: 'asc' }]"
            loading-text="Loading... Please wait" :loading="loadign">

            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>DATA</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2" color="primary" dark v-bind="props">
                                New Item
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col v-for="header in headers" :key="header.key" cols="12">
                                            <v-text-field v-model="editedItem[header.key]"
                                                :label="header.title"></v-text-field>
                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="saveEditedElement">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template #item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>

            <template #no-data>
                <v-btn color="primary" @click="dialog = false">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Get_Endpoint, LoadEndpoints, Post_Endpoint } from '../services/ressources';
import { useEmployee } from '../stores';
const employeeStore = useEmployee()
const dialog = ref(false)
const table_name = ref(employeeStore.selected_Table)
const dialogDelete = ref(false)
const headers = ref([])
const search = ref()
const loadign = ref(true)
const items = ref([])

const editedIndex = ref(-1)
const editedItem = ref({
})
const defaultItem = ref({

})

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})

watch(dialog, (val) => {
    if (!val) {
        close()
    }
})

watch(dialogDelete, (val) => {
    if (!val) {
        closeDelete()
    }
})


const editItem = (item) => {

}
const saveEditedElement = () => {
    Post_Endpoint(employeeStore.selected_Table, editedItem.value).subscribe(() => {
        alert("Saved");
    })

}
const deleteItem = (item) => { }


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
            // headers.value.push(
            //     { title: 'Edit', key: 'edit', sortable: false }
            // )
            // headers.value.push(
            //     { title: 'Delete', key: 'delete', sortable: false }
            // )

            items.value = data; 
            loadign.value = false
        })
})

</script>