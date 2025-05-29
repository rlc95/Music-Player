<script setup >
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Typed from 'typed.js'

const props = defineProps({
  strings: {
    type: Array,
    required: true
  },
  typeSpeed: {
    type: Number,
    default: 50
  },
  backSpeed: {
    type: Number,
    default: 30
  },
  loop: {
    type: Boolean,
    default: true
  }
})

const target = ref(null)
let typedInstance = null

onMounted(() => {
  typedInstance = new Typed(target.value, {
    strings: props.strings,
    typeSpeed: props.typeSpeed,
    backSpeed: props.backSpeed,
    loop: props.loop
  })
})

onBeforeUnmount(() => {
  if (typedInstance) {
    typedInstance.destroy()
  }
})
</script>

<template>
  <span ref="target" class="text-white/90 text-lg"></span>
</template>
