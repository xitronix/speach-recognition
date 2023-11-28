<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          QSpeech Recognition
        </q-toolbar-title>
        <q-tabs inline-labels align="left" class="q-pr-lg" active-color="white" indicator-color="white">
          <q-btn v-for="link in links" :key="link.title" :label="link.title" :to="link.path" />
        </q-tabs>
        <q-space />
        <q-btn flat class="opacity-80" @click="signout">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>QSpeech Recognition</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logout from 'src/firebase/logout'

const links = ref([
  { title: 'Record', path: '/app/record' },
  { title: 'Upload', path: '/app/upload' },
])
const router = useRouter()

const signout = async () => {
  await logout()
  router.push('/login')
}
</script>

<script>
export default {

  methods: {
    signout() {
      // Code for logout functionality
    },
  },
};
</script>