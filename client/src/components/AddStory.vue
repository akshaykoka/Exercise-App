<template>
  <div class="container">
    <div class="card">
      <div class="card-heading">
        <div class="card-header-title title">
          Add Story
        </div>
        <div class="card-content">
          <div class="content">
            <form @submit="addPost">
              <!-- Post Field -->
              <div class="field">
                <label for class="label">Post</label>
                <div class="control">
                  <input type="text" class="input " v-model="content" />
                </div>
              </div>

              <!-- Submit Button -->
              <div class="field ">
                <div class="control ">
                  <button class="button is-success w-100" type="submit">
                    Post to Feed
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddStory",
  data() {
    return { content: "" };
  },
  methods: {
    addPost() {
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      const feed = sessionStorage.feed
        ? JSON.parse(sessionStorage.getItem("feed"))
        : [];
      feed.push({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        userName: currentUser.userName,
        content: this.content,
      });
      sessionStorage.setItem("feed", JSON.stringify(feed));

      this.content = "";
    },
  },
};
</script>

<style scoped>
.w-100,
.field {
  width: 100%;
}
</style>