<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          QSpeech Recognition
        </q-toolbar-title>
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
import logout from 'src/firebase/logout'
import { useRouter } from 'vue-router'

const router = useRouter()

const signout = async () => {
  await logout()
  router.push('/login')
}
</script>
