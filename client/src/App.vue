<template>
  <div id="app">
    <div class="columns">
      <div class="column is-one-fifth">
        <SideNav />
      </div>

      <div class="column">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/SideNav.vue";

export default {
  components: {
    SideNav,
  },
};
</script>

<style></style>