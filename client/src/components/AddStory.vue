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

              <div class="field">
                <div class="file has-name">
                  <label class="file-label">
                    <input
                      type="file"
                      class="file-input"
                      name="image"
                      ref="file"
                      @change="onSelect"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">Choose a file...</span>
                    </span>
                    <span class="file-name">
                      Screenshot
                    </span>
                  </label>
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
        file: null,
        title: "",
        write_up: "",
      },
    };
  },
  methods: {
    ...mapActions(["CreatePost"]),
    onSelect() {
      const file = this.$refs.file.files[0];
      this.form.file = file;
    },
    async submit() {
      try {
        const formData = new FormData();
        formData.append("file", this.form.file);
        formData.append("title", this.form.title);
        formData.append("write_up", this.form.write_up);
        console.log(formData.get("title"));
        await this.CreatePost(formData);
        this.form.title = "";
        this.form.write_up = "";
      } catch (error) {
        throw "Sorry you can't make a post now!";
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
