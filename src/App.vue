<template>
  <v-app >
    <v-main >
      <div style="margin: 20px" :color="$vuetify.theme.dark ? 'primary' : ''" dark>
        <appBar></appBar>
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import appBar from '@/employee/components/appBar.vue'
</script>
