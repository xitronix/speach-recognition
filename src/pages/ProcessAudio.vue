<template>
  <div>
    <input v-if="!progress" type="file" @change="handleFileChange" />
    <q-linear-progress v-else-if="progress" size="25px" :value="progress" color="accent">
      <div class="absolute-full flex flex-center">
        <q-badge color="white" text-color="accent" :label="progress + '%'" />
      </div>
    </q-linear-progress>
    <button :disabled="progress !== null || !selectedFile" @click="uploadAudio">Upload Audio</button>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar';
import { storage } from "../firebase";
import { ref as firebaseRef, uploadBytesResumable } from "firebase/storage";
import { uuidv4 } from '@firebase/util';

export default {
  data() {
    return {
      selectedFile: null,
      progress: null,
      downloadURL: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadAudio() {
      const formData = new FormData();
      formData.append('audio', this.selectedFile);
      const user = LocalStorage.getItem("user")
      const audioRef = firebaseRef(storage, `${user.uid}/${uuidv4()}/audio.wav`);
      this.progress = 0;
      const uploadTask = uploadBytesResumable(audioRef, this.selectedFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progress = progress;
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          this.downloadURL = downloadURL;
        })
    },
    async testFirebase() {
      try {
        console.log('testFirebase')
        const response = await fetch('http://localhost:8888/test-firebase/' + LocalStorage.getItem('user').uuid, {
          headers: {
            "Authorization": "Bearer " + LocalStorage.getItem("idToken"),
          },
          method: 'POST',
        })
        console.log('Successfull authenticated:', response);
      } catch (error) {
        console.error('Error uploading audio:', error);
      }
    }
  },
};
</script>
