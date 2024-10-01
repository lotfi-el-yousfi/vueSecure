<template>
    <v-row justify="center"  >
        <v-col cols="12" sm="10" md="8" lg="6">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>

                <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password"
                    required></v-text-field>

                <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                    Login
                </v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Login } from '../services/ressources';

import { useRouter } from 'vue-router'

const router = useRouter()

const valid = ref(true)
const form = ref<any>(null)
const username = ref('admin')
const password = ref('admin')

const usernameRules = [
    (v: string) => !!v || 'Username is required',
]

const passwordRules = [
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 4) || 'Password must be at least 6 characters',
]

const validate = () => {
    if (!form.value.validate()) {
        valid.value = false
    } else {
        Login(username.value, password.value).subscribe((d) => {
            router.push({ "name": "dashboard", "params": {} })
        })
    }
}
</script>
