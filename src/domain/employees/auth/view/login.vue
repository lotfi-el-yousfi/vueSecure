<template>
    <v-card class="mx-auto" max-width="400" outlined>
        <v-card-text>
            <v-form ref="formRef" v-model="valid" lazy-validation class="text-center">
                <v-text-field v-model="username" :rules="usernameRules" label="Username" required />

                <v-text-field v-model="email" :rules="emailRules" label="Email" required />

                <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min]" :type="show1 ? 'text' : 'password'"
                    label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1" />

                <v-text-field block v-model="confirmPassword" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min, passwordMatch]"
                    :type="show2 ? 'text' : 'password'" label="Confirm Password" hint="At least 8 characters" counter
                    @click:append="show2 = !show2" />

                <v-btn :disabled="!valid" color="success" @click="validate">
                    Register
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VForm } from 'vuetify/lib/components/index.mjs';
import { Login } from '../../service/ressources/employeeService';
import { useEmployee } from '../../store/employeeStore';

const employeeStore = useEmployee()
const valid = ref(true)
const formRef = ref<InstanceType<typeof VForm> | null>(null);
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const show1 = ref(false)
const show2 = ref(false)

const usernameRules = [
    (v: string) => !!v || 'Username is required',
    (v: string) => v.length >= 3 || 'Username must be at least 3 characters',
]

const emailRules = [
    (v: string) => !!v || 'Email is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

const passwordRules = {
    required: (value: string) => !!value || 'Password is required.',
    min: (v: string) => (v && v.length >= 8) || 'Password must be at least 8 characters',
}

const passwordMatch = (value: string) => value === password.value || 'The passwords don\'t match'

const validate = () => {
    if (formRef.value) {
        formRef.value.validate();
        if (valid.value) {
            Login().subscribe(token => {
                employeeStore.setToken(token)
            })

        }
    }
}
</script>
