<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { GetData, LoadEnpoints, updateEmployee } from '@/domain/employees/service/ressources/employeeService'
import { useEmployee } from '../store/employeeStore'
import { Employee } from '../model/Employee'

const employeesStore = useEmployee()

const employees = reactive<Employee[]>([])
const search = ref<string>('')
const loading = ref<boolean>(false)
const dialog = ref<boolean>(false)
const editedIndex = ref<number>(-1)
const error = ref<string>('')
const editedItem = ref<Employee | null>(null)
const endpoint = ref<string | undefined>()

const formTitle = ref<string>('')
const headers = ref<Array<{ title: string; align: string; key: string }>>([])


onMounted(async () => {
  LoadEnpoints().subscribe(() => { })
  endpoint.value = employeesStore.SelectedEndpoint
})


async function loadEmployees() {
  loading.value = true
  try {
    GetData().subscribe((data_employees: Employee[]) => {
      data_employees.map(elemet => employees.push(elemet))
      const keys = Object.keys(employees[0] as Employee) as Array<keyof Employee>
      keys.forEach(key => {
        headers.value.push({
          title: key as string,
          align: 'start',
          key: key as string,
        })
      })
      headers
        .value.push(
          {
            title: 'Actions',
            align: 'center',
            key: 'actions',
          },
        )
    })
  } catch (error: any) {
    error.value = (error as string)
  } finally {
    loading.value = false
  }
}

function editItem(item: Employee) {
  editedIndex.value = employees?.indexOf(item) || -1
  editedItem.value = { ...item }

  dialog.value = true
  formTitle.value = 'Edit Item'
}

function deleteItem(item: Employee) {
  const index = employees?.indexOf(item) || -1
  if (confirm(`Are you sure you want to delete ${item.name}?`)) {
    employees.splice(index, 1)
  }
}

function close() {
  dialog.value = false
  editedItem.value = null
  editedIndex.value = -1
}

async function save() {
  if (editedIndex.value > -1) {
    try {
      const data = { ...editedItem.value } as Employee
      await updateEmployee(data).toPromise()
      employees?.splice(editedIndex.value, 1, { ...editedItem.value })
    } catch (error: any) {
      error.value = error as string
    }
  }
  close()
}

function updatePage(page: number) {
  console.log(page)
}
</script>
<template>

  <v-alert v-if="error" dense dismissible type="error" @input="error = ''">
    {{ error }}
  </v-alert>
  <v-data-table class="elevation-1" :headers="headers" :items="employees" :items-per-page="12" :loading="loading"
    loading-text="Loading... Please wait" :search="search" @update:page="updatePage">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title> {{ endpoint ? `List of ${endpoint}` : '' }}</v-toolbar-title>
        <v-spacer />
        <v-text-field v-model="search" append-icon="mdi-magnify" clearable hide-details label="Search" single-line />
        <v-spacer />
        <v-dialog v-model="dialog" max-width="500px">
          <template #activator="{ on, attrs }">
            <v-btn class="mb-2" color="primary" dark v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row v-for="(value, key) in editedItem" :key="key">
                  <v-col>
                    <v-text-field v-model="editedItem[key]" :label="key" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn color="blue darken-1" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #item.actions="{ item }">
      <v-icon class="mr-2" small @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <br>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>

</template>
