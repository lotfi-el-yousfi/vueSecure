import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useEmployee = defineStore('Employee', () => {
    // State
    const token = ref(localStorage.getItem('token') || "");
    const Endpoints = ref();
    const selected_Table = ref("employees");

    // Getters
    const getToken = computed(() => token.value);
    const getEndpoints = computed(() => Endpoints.value);
    const getTable = computed(() => selected_Table.value);
    const isLoggedIn = computed(() => !!token);

    // Actions
    const setToken = (token_: string) => {
        token.value = token_
    }
    const SetTable = (table_: string) => {
        selected_Table.value = table_
    }
 
    const setEndpoints = (Endpoints_: any) => {
        Endpoints.value = Endpoints_
    }
    return {
        token,
        getToken,
        setToken
        , Endpoints,
        getEndpoints,
        isLoggedIn,
        setEndpoints
        ,
        selected_Table,
        getTable,
        SetTable,

    };
});