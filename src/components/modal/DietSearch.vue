<template>
  <!-- notice dialogRef here -->
  <q-dialog
    id="dietSearch"
    v-model="dialogComputed"
    persistent
    :maximized="true"
    transition-show="slide-down"
    transition-hide="slide-up"
  >
    <q-card class="text-gray bg-white">
      <q-toolbar class="bg-blue-9">
        <q-icon name="ev_station" dense size="40px" color="yellow" />

        <q-toolbar-title>Diet search</q-toolbar-title>
        <q-space />
        <q-btn class="" dense flat size="md" icon="close" v-close-popup >
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-toolbar>
      <div class="input-search">
        <q-input autofocus v-model="input" class="bg-white" placeholder="Search..."></q-input>
      </div>
      <q-scroll-area class="main">
        <div class="q-pa-md">
          <q-list>
            <div v-for="(diet, index) in diets" :key="index" class="diet-data">
              <q-item clickable v-ripper @click="getDiet(diet.diet_name)">
                <q-item-section>
                  <q-item-label>{{ diet.diet_name }}</q-item-label>
                  <q-item-label caption lines="2">Cal {{ diet.cal }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <q-separator spaced inset />
          </q-list>
        </div>
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { watch, computed, toRefs, ref, onMounted } from 'vue'
import { debounce } from 'lodash'
import { server } from '../../boot/axios'
import { useUserStore } from '../../stores/user-store'
import { useQuasar } from 'quasar'

const emit = defineEmits(['update:dialog', 'closeModel'])

const input = ref('')
const diets = ref(null)
const userStore = useUserStore()
const $q = useQuasar()

const props = defineProps({
  dialog: Boolean,
  label: { type: String, default: '' },
  clickedDiet: Object
})
const { dialog, label, clickedDiet } = toRefs(props)

const dialogComputed = computed({
  get: () => {
    // getDiets()
    return dialog.value
  },
  set: (val) => emit('update:dialog', false)
})

onMounted(async () => {
  await getDiets()
})

const getDiet = (id, description) => {
  const dietDetails = { id, description }
  emit('diet', dietDetails)
  dialog.value = false
}

const getDiets = debounce(async (newVal) => {
  try {
    // Get the tokens/cookies
    await userStore.getSanctumCookie()
    // Get places
    const res = await server.post('api/diet', { input: newVal })
    diets.value = res.data.diets
  } catch (error) {
    $q.dialog({
      title: 'Error',
      message: 'Oops! Something went wrong with this route. Please try again.',
      persistent: true
    })
  }
}, 500)

watch(() => input.value, getDiets)
</script>

<style lang="scss">
#dietSearch {
  .main {
    height: calc(100vh - 106px);
    margin-top: 30px;
    max-width: 100%;
    margin: auto;
  }

  .input-search {
    margin-left: 30px;
    margin-right: 30px;
  }

  .card-bg-color {
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>
