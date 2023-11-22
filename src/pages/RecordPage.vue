<template>
  <q-page class="flex column flex-center">
    <div class="q-pa-md q-gutter-sm">
      <q-btn @click="startRecording" :disabled="recording" round color="negative" icon="mic" :class="{
        'animated-pulse': !recording
      }" />
      <q-btn @click="stopRecording" :disabled="!recording" round color="negative" icon="stop" />
    </div>

    <audio ref="audioPlayer" controls></audio>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const recording = ref(false)
const mediaRecorder = ref(null)
const audioChunks = ref([])

const audioPlayer = ref(null);

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder.value = new MediaRecorder(stream);

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.value.push(event.data);
      }
    };

    mediaRecorder.value.onstop = () => {
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioPlayer.value.src = audioUrl;
    };

    mediaRecorder.value.start();
    recording.value = true;
  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
}

const stopRecording = () => {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop();
    recording.value = false;
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