<script lang="ts" setup>
import router from '@/router'
import { defineEmits, defineProps, ref } from 'vue'

const emit = defineEmits<{
  (e: 'drawerClicked'): void
}>()

defineProps<{
  drawer: boolean
}>()

const drawer = ref(false)
const login_logout = ref('login')

function toggleDrawer() {
  drawer.value = !drawer.value
  emit('drawerClicked')
}
function isAuthenticated() {
  const token = localStorage.getItem('jwt')
  if (token) {
    login_logout.value = 'Logout'
    return true
  }
  router.push({ name: "login" });

  return false
}
function logout() {
  localStorage.setItem('jwt', '')
  login_logout.value = 'login'
  router.push({ name: 'login' })
}

onMounted(() => {
  isAuthenticated()
})
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <v-toolbar-title>Employees Dashborad</v-toolbar-title>
    <v-spacer />
    <v-btn v-if="!isAuthenticated()" to="/login" variant="text">{{ login_logout }}</v-btn>
    <v-btn v-else to="/login" variant="text" @click="logout">{{ login_logout }}</v-btn>
    <v-btn to="/dashboard" variant="text">dashboard</v-btn>
  </v-app-bar>
</template>
