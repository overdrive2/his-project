<template>
  <q-card class="full-width">
    <div class="head">
      <div class="text-h6">Diet</div>
    </div>
    <q-card-section class="col q-pt-none">
      <div class="q-mt-sm">
        <span class="text-body1 q-pb-md">Pick a name for this diets!</span>
        <q-input class="q-pt-md" tabindex="-1" v-model="dietLabel" label="Diet" outlined @click="setDiet()" stack-label>
        </q-input>
      </div>
      <div class="q-mt-sm">
        <span class="text-body1 q-pb-md">Other</span>
        <q-input v-model="other" outlined type="textarea" label="Other" />
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Add" class="bg-primary text-white" v-close-popup />
    </q-card-actions>
  </q-card>
  <diet-search
    v-model:dialog="dialog"
    @diet="getDiet($event)"
  />
</template>

<script setup>
import { ref } from 'vue'
import InputDietselect from 'src/components/autocomplete/DietSelect.vue'
import DietSearch from 'src/components/modal/DietSearch.vue'

const emit = defineEmits(['openSearch', 'closeSearch'])
const show = ref(false)
const dietId = ref(null)
const dietLabel = ref(null)
const label = ref(null)
const other = ref('')
const dialog = ref(false)
// METHODS
const setDiet = (newLabel) => {
  dialog.value = true
  // emit('openSearch')
  // show.value = !show.value
  // label.value = newLabel
}

const getDiet = (event) => {
  console.log('Is Here = ', event)
  dietId.value = event.id
  dietLabel.value = event.description
}
</script>
