import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useEmployee = defineStore('employeeStore', () => {
  // State
  const token = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value);

  // Actions
  function setToken(passed_token: string) {
    token.value = passed_token
    localStorage.setItem('jwt', passed_token)
    console.log(localStorage);
  }

  return {
    token,
    isAuthenticated,
    setToken
  };
});