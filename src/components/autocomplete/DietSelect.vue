<template>
  <q-card id="inputContainer" class="full-width">
    <div class="q-p-md">
      <q-input class="input q-px-md" v-model="input" autofocus outlined :label="label">
        <template v-slot:append>
          <q-icon name="close" />
        </template>
      </q-input>
    </div>
    <q-card-section class="col">
      <q-scroll-area style="height: calc(100vh - 350px);">
        <div class="diets">
          <div v-for="(diet, index) in diets" :key="index" class="diet-data">
            <q-list bordered separator>
              <q-item clickable v-ripple @click="getDiet(label, diet.diet_name)">
                <q-item-section>
                  <q-item-label class="text-md">{{ diet.diet_name }}</q-item-label>
                  <q-item-label class="text-sm">Cal {{ diet.cal }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Add" class="bg-primary text-white" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { watch, toRefs, ref } from 'vue'
import { debounce } from 'lodash'
import { server } from '../../boot/axios'
import { useUserStore } from '../../stores/user-store'
import { useQuasar } from 'quasar'

const userStore = useUserStore()
const $q = useQuasar()
// DATA
const input = ref(null)
const diets = ref(null)
// DATA END

// PROPS
const props = defineProps({ label: { type: String, default: '' } })
const { label } = toRefs(props)
// Prop End

// EMITS
const emit = defineEmits(['diet', 'input-visible'])
// EMITS END

// METHODS
const getDiet = (label, description) => {
  const dietDetails = { label, description }
  emit('diet', dietDetails)
  emit('input-visible', false)
}

const getDiets = debounce(async (newVal) => {
  if (!navigator.onLine) {
    $q.dialog({
      title: 'Offline',
      message: 'Sorry, but to use the address search you need to be connected to the internet.',
      persistent: true
    })
    return
  }

  try {
    // Get the tokens/cookies
    await userStore.getSanctumCookie()

    // Get places
    const res = await server.get('api/diet', { input: newVal })
    diets.value = res.data.diets
    console.log(diets)
  } catch (error) {
    $q.dialog({
      title: 'Error',
      message: 'Oops! Something went wrong with this route. Please try again.',
      persistent: true
    })
    console.log(error)
  }
}, 500)
// METHODS END
// WATCH
watch(() => input.value, getDiets)
// WATCH END
</script>
<style>
.head {
  position: absolute;
  top: 0;
  width: 100%;
  height: 95px;
  padding: 20px 15px;
}

.input {
  padding-top: 30px;
  max-width: 100%;
  margin: 0 auto;
}
</style>
