import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useEmployee = defineStore('employeeStore', () => {
  // State
  const ApiUrl = ref<string>("http://localhost:9090");
  const token = ref<string | null>(localStorage.getItem('jwt'));
  const endpointsList = ref<string[] | null>([]);
  const SelectedEndpoint = ref<string>();

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const getSelectedEndpoint = computed(() => SelectedEndpoint.value);


  // Actions
  function setToken(passed_token: string) {
    token.value = passed_token
    localStorage.setItem('jwt', passed_token)
  }
  function setendpoints(endpoints_token: string[]) {
    endpointsList.value = endpoints_token
  }
  function setSelectedEndpoint(SelectedEndpoint_param: string) {
    SelectedEndpoint.value = SelectedEndpoint_param
  }


  return {
    token,
    ApiUrl,
    SelectedEndpoint,
    isAuthenticated,
    endpointsList,
    getSelectedEndpoint,
    setendpoints,
    setToken,
    setSelectedEndpoint
  };
});