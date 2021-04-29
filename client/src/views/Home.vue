<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-two-thirds"><Feed /></div>
        <div class="column is-one-third">
          <SpotifyPlayer />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Feed from "@/components/Feed";
import SpotifyPlayer from "@/components/SpotifyPlayer";

export default {
  name: "Home",
  components: {
    Feed,
    SpotifyPlayer,
  },
};
</script>
<style></style>
