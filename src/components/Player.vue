<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  track: Object
})

const youtubeVideoId = ref('')
const player = ref(null)
const isPlaying = ref(false)
const isLoading = ref(false) // 🔄 Spinner state
const volume = ref(50)

const loadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT) {
      resolve()
    } else {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      window.onYouTubeIframeAPIReady = () => resolve()
    }
  })
}

const initPlayer = async (videoId) => {
  await loadYouTubeAPI()

  isLoading.value = true

  if (player.value) {
    player.value.loadVideoById(videoId)
    isPlaying.value = true
    isLoading.value = false
  } else {
    player.value = new YT.Player('hidden-player', {
      videoId,
      events: {
        onReady: (event) => {
          event.target.playVideo()
          isPlaying.value = true
          isLoading.value = false
        }
      }
    })
  }
}

const setVolume = () => {
  if (player.value) {
    player.value.setVolume(volume.value)
  }
}

const skip = (seconds) => {
  if (player.value) {
    const currentTime = player.value.getCurrentTime()
    player.value.seekTo(currentTime + seconds, true)
  }
}

watch(
  () => props.track,
  async (newTrack) => {
    if (!newTrack) return

    const query = `${newTrack.name} ${newTrack.artists.map(a => a.name).join(' ')}`
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            q: query,
            key: 'AIzaSyAKIb7x1KMkSbXDoPdxIJjWud0GJx68_BA',
            maxResults: 1,
            type: 'video'
          }
        }
      )
      const videoId = response.data.items[0]?.id.videoId
      youtubeVideoId.value = videoId || ''

      if (videoId) {
        await initPlayer(videoId)
      }
    } catch (err) {
      console.error('YouTube search failed:', err)
      isLoading.value = false
    }
  },
  { immediate: true }
)

const togglePlayback = () => {
  if (!player.value) return
  if (isPlaying.value) {
    player.value.pauseVideo()
    isPlaying.value = false
  } else {
    player.value.playVideo()
    isPlaying.value = true
  }
}
</script>

<template>
  <div class="bg-white shadow-lg rounded-xl p-6 max-w-md w-full text-center">
    <img
      :src="track.album.images[0]?.url"
      alt="Album Art"
      class="rounded-xl w-full mb-4"
    />
    <h2 class="text-xl font-semibold mb-1">{{ track.name }}</h2>
    <p class="text-gray-500 mb-4">
      {{ track.artists.map(a => a.name).join(', ') }}
    </p>

    <!-- Custom Controls -->
    <div v-if="youtubeVideoId && !track.preview_url" class="mt-4 relative inline-flex items-center justify-center">
      <button
        @click="togglePlayback"
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 relative"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">{{ isPlaying ? 'Pause' : 'Play' }}</span>
        <span v-else>
          <svg class="w-5 h-5 animate-spin mx-auto" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4" />
            <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </span>
      </button>
    </div>

    <!-- Volume Control -->
    <div class="mt-4 flex items-center justify-center gap-4">
      <label class="text-sm text-gray-700">Volume</label>
      <input
        type="range"
        min="0"
        max="100"
        v-model="volume"
        @input="setVolume"
        class="w-40"
      />
    </div>

    <!-- Skip Controls -->
    <div class="mt-4 flex justify-center gap-6">
      <button
        @click="skip(-10)"
        class="text-indigo-600 hover:text-indigo-800 text-lg font-medium"
      >
        ⏪ Back
      </button>
      <button
        @click="skip(10)"
        class="text-indigo-600 hover:text-indigo-800 text-lg font-medium"
      >
        ⏩ Skip
      </button>
    </div>

    <!-- Hidden YouTube Player -->
    <div class="w-0 h-0 absolute -left-[9999px] overflow-hidden">
      <div id="hidden-player"></div>
    </div>
  </div>
</template>
