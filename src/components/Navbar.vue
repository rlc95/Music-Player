<template>
  <nav class="bg-black/20 text-white p-4 flex justify-between items-center shadow-md fixed w-full top-0 z-50">
    <div class="text-xl font-bold">RLCmUsic</div>

    <!-- Hamburger Icon -->
    <button @click="isOpen = !isOpen" class="md:hidden text-white focus:outline-none">
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>

    <!-- Desktop Nav -->
    <ul class="hidden md:flex space-x-6">
      <li><a href="#" class="hover:text-gray-300">Home</a></li>
      <li><a href="#" class="hover:text-gray-300">About</a></li>
      <li><a href="#" class="hover:text-gray-300">Contact</a></li>
    </ul>

    <!-- Mobile Nav -->
    <ul v-if="isOpen" class="absolute top-full left-0 w-full bg-black/80 text-white flex flex-col space-y-2 p-4 md:hidden">
      <li><a href="#" class="hover:text-gray-300">Home</a></li>
      <li><a href="#" class="hover:text-gray-300">About</a></li>
      <li><a href="#" class="hover:text-gray-300">Contact</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

