<template>
  <q-layout id="DoctorLayout" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div>
          {{ userStore.email }}
        </div>
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
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useUserStore } from 'src/stores/user-store'

const leftDrawerOpen = ref(false)
const userStore = useUserStore()

const linksList = [
  {
    title: 'New order',
    caption: 'คำสั่งใหม่',
    icon: 'school',
    link: 'doctor/orders/new'
  },
  {
    title: 'Previous orders',
    caption: 'ประวัติคำสั่งย้อนหลัง',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Patient EMR',
    caption: 'ข้อมูลการรักษา',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  }
]

const essentialLinks = linksList

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
