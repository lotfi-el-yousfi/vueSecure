<template>

    <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>Application</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="logout" v-if="isloggedIn">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn icon @click="login" v-else>
            <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn icon @click="toggleTheme">
            <v-icon>{{ $vuetify.theme.dark ? 'mdi-brightness-7' : 'mdi-brightness-4' }}</v-icon>
        </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
            <v-list-item to="/" link>
                <template v-slot:prepend>
                    <v-icon>mdi-home</v-icon>
                </template>
                <v-list-item-title> Home </v-list-item-title>
            </v-list-item>
            <v-list-item v-for="(item, index) in itemList" :key="index" @click="selectTable(item, 'dashboard')">

                <template v-slot:prepend>
                    <v-icon>mdi-table</v-icon>
                </template>
                <v-list-item-title>{{ item }} <v-chip size="x-small" color="red" variant="flat">
                        dashboard
                    </v-chip></v-list-item-title>

            </v-list-item>
            <v-list-item v-for="(item, index) in itemList" :key="index" @click="selectTable(item, 'cardsDisplay')">

                <template v-slot:prepend>
                    <v-icon>mdi-cards-playing-club-multiple-outline </v-icon>
                </template>
                <v-list-item-title>{{ item }}
                    <v-chip size="x-small" color="green" variant="flat">
                        cards
                    </v-chip>
                </v-list-item-title>

            </v-list-item>
        </v-list>
    </v-navigation-drawer>



</template>

<script setup lang="ts">


import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEmployee } from '../stores';

import { useTheme } from 'vuetify'

const theme = useTheme()

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}


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
const selectTable = (table: string, routename: string) => {
    employeeStore.SetTable(table)
    router.push({ name: routename })
}

onUpdated(() => {
    itemList = employeeStore.Endpoints
})
</script>
