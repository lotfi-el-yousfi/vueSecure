<template>
  <v-app>
    <app-bar :drawer="drawer" @drawer-clicked="drawer = !drawer" />

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item v-if="!isAuthenticated" prepend-icon="mdi-home" title="login" to="/login" />
        <v-list-item prepend-icon="mdi-information-outline" title="dashboard" to="/dashboard" />
      </v-list>
      <span v-if="isAuthenticated">
        <v-list v-for="endpoint in endpoints" :key="endpoint">
          <v-list-item prepend-icon="mdi-home" 
          :title="endpoint" @click="selectedEndpoint(endpoint)" />
        </v-list>
      </span>

    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from '@/domain/employees/components/appBar.vue'
import { LoadEnpoints } from './domain/employees/service/ressources/employeeService';
import { useEmployee } from './domain/employees/store/employeeStore';


const drawer = ref(false)
const endpoint = ref([])

const isAuthenticated = computed(() => {
  return useEmployee().isAuthenticated
})
const endpoints = computed(() => {
  return useEmployee().endpointsList
})
const selectedEndpoint = (endpoint:string) => {
   return useEmployee().setSelectedEndpoint(endpoint)
}

</script>
