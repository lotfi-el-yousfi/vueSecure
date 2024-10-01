<template>

    <v-app-bar app clipped-left color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="logout" v-if="isloggedIn">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn icon @click="login" v-else>
            <v-icon>mdi-login</v-icon>
        </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
            <v-list-item to="/" link>
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-for="(item, index) in itemList" :key="index" @click="selectTable(item)">
                <v-list-item-action>
                    <v-icon>mdi-rout</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>



</template>

<script setup lang="ts">


import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEmployee } from '../stores';
const employeeStore = useEmployee()

const isloggedIn = computed(() => {

    return employeeStore.isLoggedIn
})
const router = useRouter()

let itemList = "";
const drawer = ref(false)

const login = () => {
    router.push('/login')
}

const logout = () => {

    localStorage.removeItem('token')
    employeeStore.setToken('')
    router.push({ name: "login" })
}
const selectTable = (table: string) => {
    employeeStore.SetTable(table)
}
onUpdated(() => {
    itemList = employeeStore.Endpoints
    console.log("app mounted", itemList);
})
</script>
