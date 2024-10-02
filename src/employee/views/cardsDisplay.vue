<template>
    <v-card :title="`${selected_table} Cards list`" flat>
        <!-- <template v-slot:text>
            <v-text-field v-model="search" label="Search" clearable prepend-inner-icon="mdi-magnify" variant="outlined"
                hide-details single-line></v-text-field>
        </template> -->
        <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
                <v-btn class="mb-2" color="primary" dark v-bind="props"  >
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
                                <v-text-field v-model="editedItem[header.key]" :label="header.title"></v-text-field>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
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
        <v-row class="d-flex flex-wrap">
            <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="item in items" :key="item.id">
                <v-card class="pa-2 ma-2" outlined>
                    <v-card-title  >{{ item.name }}</v-card-title>
                    <v-list density="compact">
                        <v-list-item v-for="(value, key) in item" :key="key">
                            <v-list-item-title>{{ key }}: {{ value }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <v-card-actions >
                        <v-btn color="blue" variant="text" @click="editItem(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn color="red" variant="text" @click="dialogDelete = true; selected_item_delete = item">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>


    </v-card>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Delete_Endpoint, Get_Endpoint, LoadEndpoints, Post_Endpoint } from '../services/ressources';
import { useEmployee } from '../stores';
const employeeStore = useEmployee()
const dialog = ref(false)
const selected_table = computed(() => {
    load_data()
    return employeeStore.selected_Table;
})
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
const selected_item_delete = ref({

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

const closeDelete = () => {
    dialogDelete.value = false
}
const editItem = (item) => {
    dialog.value = true
}
const saveEditedElement = () => {
    Post_Endpoint(employeeStore.selected_Table, editedItem.value).subscribe(() => {
        items.value.push(editedItem.value);
        dialog.value = false
    })

}
const deleteItemConfirm = () => { 
    Delete_Endpoint(employeeStore.selected_Table, selected_item_delete.value.id).subscribe(() => {
        items.value = items.value.filter(item => item.id !== selected_item_delete.value.id)
    })
    dialogDelete.value = false
}

const init = () => {
    LoadEndpoints().subscribe((r) => {
    })

    load_data()
}

const load_data = () => {
    Get_Endpoint(employeeStore.selected_Table)
        .subscribe((data) => {
            headers.value = Object.keys(data[0]).map(key => ({
                title: key.charAt(0).toUpperCase() + key.slice(1),
                key,
                sortable: true,
            }));

            items.value = data;
            loadign.value = false
        })
}
onMounted(() => {
    init()
})

</script>