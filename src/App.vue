<script setup>
import Navbar from './components/Navbar.vue'
import Player from './components/Player.vue'
import { ref } from 'vue'
import { searchSpotify } from './api/spotify'
const isLoading = ref(false)
import TypedText from './components/TypedText.vue'


const searchTerm = ref('')
const results = ref([])
const showModal = ref(false)

const keypressed = async () =>{ 
  console.log('Searching for:', searchTerm.value)
  var val = searchTerm.value
  var typ = 'track'

  if (!searchTerm.value){ results.value="";   return} 
  isLoading.value = true // Start loading
  try {
    const data = await searchSpotify(typ, val)
    console.log('responsespoti', data)
    results.value = data.tracks.items
  } catch (err) {
    console.error('Search failed:', err)
  } finally {
    isLoading.value = false // Stop loading no matter what
  }
}

const selectedTrack = ref(null)

function handleTrackClick(track) {
  selectedTrack.value = track
  console.log('track', selectedTrack.value)
  showModal.value = true
}

</script >



<template>
  <Navbar />

   <!-- 🌌 Background Lottie Animation -->


   <div class="bg-gray-500">

  <lottie-player src="/animations/music.json"
      background="transparent"
      speed="1"
      style="position: fixed; top: 0; left: 0; width: 100%; height: 75%; z-index: 1; pointer-events: none; margin-top: 200px;"
      loop
      autoplay
    ></lottie-player>



   <lottie-player
      src="/animations/anim.json"
      background="transparent"
      speed="1"
      style="position: fixed; top: 0; left: 0; width: 100%; height: 75%; z-index: 0; pointer-events: none; margin-top: 200px;"
      loop
      autoplay
    ></lottie-player>
   




  <main class="relative z-10 pt-24 min-h-screen px-4 flex flex-col items-center">


    <div class="text-center mb-6 max-w-xl px-4 relative z-20">
    <h1 class="text-xl md:text-3xl font-bold text-white drop-shadow">
      Welcome to Your Music Playground
    </h1>
    <TypedText
      :strings="[
        'Search tracks instantly 🎵',
        'Build your ultimate playlist 🎧',
        'Explore artists and albums 🎤',
        'Feel the rhythm, live the beat 🥁'
      ]"
      :typeSpeed="50"
      :backSpeed="30"
      :loop="true"
    />
    </div>

    <!-- 🔍 Search Field -->
    <div class="w-full px-4 md:max-w-md mb-6">
      <div
        class="flex flex-col md:flex-row items-stretch gap-3 md:gap-0 bg-gray-400 shadow-md rounded-lg overflow-hidden"
      >
        <button
          type="button"
          disabled
          class="bg-black/40 text-white px-4 py-2 transition md:rounded-l-lg"
        >
          Track
        </button>

        <input
          v-model="searchTerm"
          id="search"
          name="search"
          type="text"
          placeholder="Search for music..."
          @input="keypressed"
          class="flex-1 p-3 outline-none text-gray-700 w-full"
        />

        <button
          type="button"
          disabled
          class="bg-black/40 text-white px-4 py-2 transition md:rounded-r-lg"
        >
          <span class="text-lg">🎵</span>
        </button>
      </div>
    </div>

   


    <!-- Loader -->
    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <dotlottie-player
        src="https://lottie.host/ec6d1f62-d6b8-4634-b8cf-5aa1b1c62b75/nxvPPJGso6.lottie"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></dotlottie-player>
    </div>

    <!-- Results -->
    <div v-if="!isLoading" class="grid gap-4 w-full max-w-4xl">
      <div
        v-for="item in results"
        :key="item.id"
        class="bg-white p-4 shadow rounded cursor-pointer hover:bg-gray-100"
        @click="handleTrackClick(item)"
      >
        <p class="font-semibold">{{ item.name }}</p>
        <p class="text-sm text-gray-500" v-if="item.artists">
          By {{ item.artists.map((a) => a.name).join(', ') }}
        </p>
      </div>
    </div>
  </main>

</div>

  <!-- 🎵 Modal for Player -->
  <transition name="fade">
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 px-2 py-8"
    >
      <div
        class="bg-black/60 rounded-xl w-full max-w-sm p-3 sm:p-5 relative overflow-y-auto max-h-[90vh] shadow-xl"
      >
        <!-- Close button -->
        <button
          @click="showModal = false"
          class="absolute top-2 right-2 text-white/80 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <!-- Player Component -->
        <Player :track="selectedTrack" />
      </div>
    </div>
  </transition>

</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
