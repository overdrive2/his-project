import { defineStore } from 'pinia'
import { server } from '../boot/axios'

export const useOrderStore = defineStore('order', {
  state: () => ({
    id: null,
    userName: null,
    email: null
  }),
  getters: {
    getId: (state) => {
      return state.id
    },
    getUserName: (state) => {
      return state.userName
    },
    getEmail: (state) => {
      return state.email
    }
  },
  actions: {
    async getSanctumCookie () {
      try {
        await server.get('sanctum/csrf-cookie')
      } catch (error) {
        console.log(error)
        if (error) throw error
      }
    },

    async login (email, password) {
      try {
        await server.post('login', { email, password })
      } catch (error) {
        if (error) throw error
      }
    },

    async logout () {
      try {
        await server.post('/logout')
        this.clearUser()
      } catch (error) {
        if (error) throw error
      }
    },

    async fetchUser () {
      try {
        return await server.get('api/user')
      } catch (error) {
        if (error) throw error
      }
    },

    setUser (payload) {
      if (payload.id) this.id = payload.id
      if (payload.name) this.userName = payload.name
      if (payload.email) this.email = payload.email
    },

    clearUser () {
      this.id = null
      this.user_name = null
      this.email = null
    }
  },
  persist: true
})
