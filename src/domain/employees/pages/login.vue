<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from '@/domain/employees/service/ressources/employeeService'

const username = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')
const valid = ref(true)

const usernameRules = [
  (v: string) => !!v || 'Username is required',
  (v: string) => v.length >= 3 || 'Username must be at least 3 characters',
]
const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 5 || 'Password must be at least 8 characters',
]
const router = useRouter()

const handelLogin = async () => {
  try {
    Login(username.value, password.value)
      .subscribe((token: any) => {
        if (!token) {
          return
        }
        console.log(token);
        router.push({ name: 'dashboard' })
      })
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <v-card class="mx-auto" data-testid="login-page" max-width="400" outlined>
    <v-card-text class="text-center">
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handelLogin">
        <v-text-field v-model="username" data-testid="username-input" label="Username" required
          :rules="usernameRules" />

        <v-text-field v-model="password" data-testid="password-input" label="Password" required :rules="passwordRules"
          type="password" />
        <br>
        <v-btn class="mr-4" color="success" data-testid="login-button" :disabled="!valid" type="submit">
          Login
        </v-btn>
      </v-form>

      <v-alert v-if="error" data-testid="login-error" dense outlined type="error">
        {{ error }}
      </v-alert>
    </v-card-text>
  </v-card>

</template>
