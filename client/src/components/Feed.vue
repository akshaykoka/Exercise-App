<template>
  <div>
    <AddStory />

    <br />
    <div class="panel">
      <div class="panel-heading">Feed</div>
      <p class="panel-tabs">
        <a :class="toggle ? 'is-active' : ''" @click="toggle = true">All</a>
        <a :class="!toggle ? 'is-active' : ''" @click="toggle = false"
          >Following</a
        >
      </p>
      <div v-if="toggle">
        <div class="Posts" v-if="Posts">
          <template v-for="(post, index) in getPosts">
            <FeedItem :post="post" :key="index" />
          </template>
        </div>
        <div v-else>
          Oh no!!! We have no posts
        </div>
      </div>
      <div v-else>
        <div class="Posts" v-if="Posts">
          <template v-for="(post, index) in privatePosts">
            <FeedItem :post="post" :key="index" />
          </template>
        </div>
        <div v-else>
          Oh no!!! We have no posts
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddStory from "@/components/AddStory";
import FeedItem from "@/components/FeedItem";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Feed",
  data() {
    return {
      toggle: true,
    };
  },
  computed: {
    ...mapGetters({ Posts: "StatePosts", User: "StateUser" }),
    getPosts() {
      return this.Posts.reverse();
    },
    privatePosts() {
      return this.Posts.filter(
        (post) => this.User.following.indexOf(post.userName) !== -1
      ).reverse();
    },
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
