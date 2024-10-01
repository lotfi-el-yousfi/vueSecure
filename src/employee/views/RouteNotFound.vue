<template>
  <div>

    <v-empty-state headline="Whoops, 404" title="Page not found"
      text="The page you were looking for does not exist"></v-empty-state>
    <br>
    <div class="d-flex justify-center" size="x-large">
      <v-icon>
        mdi-axis-arrow
      </v-icon>
    </div>
    <br>
    <div class="d-flex justify-center">
      <v-btn to="dashboard" variant="outlined">Go Home</v-btn>
    </div>


  </div>
</template>

<script setup lang="ts">
// import image from '@/assets/404.jpg'
</script>