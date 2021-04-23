<template>
  <div>
    <AddStory />

    <br />
    <div class="panel">
      <div class="panel-heading">Feed</div>
      <div class="Posts" v-if="Posts">
        <template v-for="(post, index) in Posts">
          <FeedItem :post="post" :key="index" />
        </template>
      </div>
      <div v-else>
        Oh no!!! We have no posts
      </div>
    </div>
  </div>
</template>

<script>
import AddStory from "../components/AddStory";
import FeedItem from "../components/FeedItem";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Feed",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ Posts: "StatePosts", User: "StateUser" }),
  },
  created: function() {
    this.GetPosts();
  },
  components: {
    AddStory: AddStory,
    FeedItem: FeedItem,
  },
  methods: {
    ...mapActions(["GetPosts"]),
  },
};
</script>

<style></style>
