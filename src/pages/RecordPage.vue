<template>
  <q-page class="flex column items-center q-gutter-sm">
    <div class="q-pa-xl q-mt-xl">
      <q-btn @click="startRecording" :disabled="recording" round color="negative" icon="mic" :class="{
        'animated-pulse': !recording
      }" size="xl" />
    </div>
    <audio v-for="(audio) in audios" :key="audio" :src="audio" controls></audio>
    <q-page-sticky v-if="recording" position="bottom-right" :offset="[15, 18]" style="z-index: 10000">
      <q-btn fab icon="stop" color="negative" @click="stopRecording" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar, QSpinnerAudio } from 'quasar'

const recording = ref(false)
const mediaRecorder = ref(null)
const audioChunks = ref([])
const audios = ref([])

const $q = useQuasar()

const startRecording = async () => {
  try {
    $q.loading.show({
      spinner: QSpinnerAudio,
      backgroundColor: 'primary'
    })
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    mediaRecorder.value = new MediaRecorder(stream)

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.value.push(event.data)
      }
    }

    mediaRecorder.value.onstop = () => {
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' }) //{ type: 'audio/ogg codecs=opus' }
      const audioUrl = URL.createObjectURL(audioBlob)
      audioChunks.value = []
      audios.value.push(audioUrl)
    }

    mediaRecorder.value.start()
    recording.value = true
  } catch (error) {
    console.error('Error accessing microphone:', error)
  }
}

const stopRecording = () => {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop()
    recording.value = false
    $q.loading.hide()
  }
}
</script>

<style>
.animated-pulse {
  animation: pulse 2s linear infinite;
  transform-origin: center center;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
  }

  70% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(0.95);
  }
}
</style>