<template>
  <v-app>
    <app-bar :drawer="drawer" @drawer-clicked="drawer = !drawer" />

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item prepend-icon="mdi-home" title="login" to="/login" />
        <v-list-item prepend-icon="mdi-information-outline" title="dashboard" to="/dashboard" />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from '@/domain/employees/components/appBar.vue'

const drawer = ref(false)
</script>
