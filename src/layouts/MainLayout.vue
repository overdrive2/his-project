<template>
  <q-layout id="mainLayout" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn v-if="userStore.userName" to="/account" flat round dense icon="account_circle" />
        <q-btn v-if="userStore.userName" @click="logout" flat round dense icon="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useUserStore } from 'src/stores/user-store'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const $q = useQuasar()
const leftDrawerOpen = ref(false)
const router = useRouter()

const linksList = [
  {
    title: 'Doctor',
    caption: 'quasar.dev',
    icon: 'school',
    link: '/doctor'
  },
  {
    title: 'Nurse',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Other',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  }
]

const essentialLinks = linksList

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = () => {
  const res = $q.dialog({
    title: 'Logout!',
    message: 'Are you sure you want to logout?',
    cancel: true,
    persistent: true
  })

  res.onOk(async () => {
    try {
      await userStore.logout()
      userStore.clearUser()
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  })
}
</script>
