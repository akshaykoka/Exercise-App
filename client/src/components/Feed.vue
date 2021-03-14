<template>
  <div>
    <AddStory />

    <br />
    <div class="panel">
      <div class="panel-heading">Feed</div>
      <template v-for="(item, index) in feed">
        <!-- <span :key="index">{{ item }}</span> -->
        <FeedItem
          :firstName="item.firstName"
          :lastName="item.lastName"
          :userName="item.userName"
          :content="item.content"
          :key="index"
        />
      </template>
    </div>
  </div>
</template>

<script>
import AddStory from "../components/AddStory";
import FeedItem from "../components/FeedItem";
export default {
  name: "Feed",
  data() {
    return {
      feed: [],
    };
  },
  mounted() {
    console.log(JSON.parse(sessionStorage.getItem("feed")));
    return (this.feed = sessionStorage.feed
      ? JSON.parse(sessionStorage.getItem("feed"))
      : []);
  },
  components: {
    AddStory: AddStory,
    FeedItem: FeedItem,
  },
};
</script>

<style></style>