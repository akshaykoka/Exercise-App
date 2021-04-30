<template>
  <div class="container">
    <div class="card">
      <div class="card-heading">
        <div class="card-header-title title">
          Add Story
        </div>
        <div class="card-content">
          <div class="content">
            <form @submit.prevent="submit" enctype="multipart/form-data">
              <!-- Title Field -->
              <div class="field">
                <label for="title" class="label">Title</label>
                <div class="control">
                  <input
                    type="text"
                    class="input "
                    name="title"
                    v-model="form.title"
                  />
                </div>
              </div>

              <div class="field">
                <label for="write-up">Content</label>
                <div class="control">
                  <input
                    type="text"
                    class="input"
                    name="write-up"
                    v-model="form.write_up"
                  />
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
import { mapActions } from "vuex";

export default {
  name: "AddStory",
  data() {
    return {
      form: {
        title: "",
        write_up: "",
      },
    };
  },
  methods: {
    ...mapActions(["CreatePost"]),

    async submit() {
      try {
        await this.CreatePost(this.form);
        this.form.title = "";
        this.form.write_up = "";
      } catch (error) {
        console.error(error.toString());
      }
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
