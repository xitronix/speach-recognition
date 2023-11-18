<template>
  <q-page padding>
    <div>
      Message:
      <pre class="bg-grey-4">{{ message }}</pre>
    </div>
    <q-input v-model="message" />
  </q-page>
</template>

<script>

import { ref } from 'vue'

export default {
  setup() {
    const message = ref('My Message')

    return {
      message
    }
  }
}
</script>
