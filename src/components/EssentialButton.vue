<template>
  <q-btn
    class="q-mt-xl"
    color="white"
    text-color="blue"
    :to="to"
    :label="label"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialButton',
  props: {
    lable: {
      type: String,
      required: true
    },

    to: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>
