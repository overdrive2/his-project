<template>
  <q-page>
    <div class="flex flex-center">Page2</div>
    <div class="q-pa-lg"><q-btn color="primary" icon="mail" label="On Left"></q-btn></div>
    <div class="q-pa-md">
      <q-btn color="purple" @click="showNotif" label="Show Notification"></q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'IndexPage2',
  setup () {
    return {
      showNotif () {
        Notify.create('Danger, Will Robinson! Danger!')
      }
    }
  }
})
</script>
