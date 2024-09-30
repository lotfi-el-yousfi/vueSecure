import { defineStore } from 'pinia'
import axios from 'axios'

export const useEmployee = defineStore({
  id: 'auth',
  state: () => ({
    token: '' as string,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    isAuth() {
      try {
        this.loading = true
        const token = localStorage.getItem('jwt')
        if (token) {
          this.token = token
          return true
        }
        return false
      } catch (error) {
        this.error = error.message || 'An error occurred while fetching data.'
      }
    },
    actions: {

      async setToken(token: string) {
        this.token = token
        localStorage.setItem('jwt', token)
      },
      async Logout( ) {
        this.token = ''
        localStorage.removeItem('jwt' )
      },
      async isAuth() {
        try {
          this.loading = true
          const response = await axios.get<Item[]>('https://example.com/api/data')  
          this.data = response.data
          this.error = null
        } catch (error) {
          console.error('Error fetching data:', error)
          this.error = error.message || 'An error occurred while fetching data.'
        } finally {
          this.loading = false
        }
      },
    },
  }
})