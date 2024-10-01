<template>
  <v-app>
    <v-main>
      <div style="margin: 20px">
        <appBar></appBar>
        <router-view />
      </div>

    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import appBar from '@/employee/components/appBar.vue'
</script>
