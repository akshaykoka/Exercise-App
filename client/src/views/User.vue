<template>
  <div>
    <div class="section">
      <div class="panel is-success">
        <div class="panel-heading">
          Profile
        </div>
        <form @submit.prevent="submit">
          <div class="profile-container">
            <div class="panel-tab">
              {{ error }}

              <div>Username:</div>
              <div>
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" v-model="form.userName" />
                  </div>
                </div>
              </div>
            </div>
            <div class="panel-tab">
              <div>First Name:</div>
              <div class="field">
                <div class="control">
                  <input class="input" type="text" v-model="form.firstName" />
                </div>
              </div>
            </div>
            <div class="panel-tab">
              <div>Last Name:</div>
              <div class="field">
                <div class="control">
                  <input class="input" type="text" v-model="form.lastName" />
                </div>
              </div>
            </div>
            <div class="panel-tab">
              <div>Email:</div>
              <div class="field">
                <div class="control">
                  <input class="input" type="text" v-model="form.email" />
                </div>
              </div>
            </div>
            <div class="panel-tab">
              <div>Password:</div>
              <div>
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      placeholder="Change password"
                      v-model="form.password"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-grouped is-grouped-centered custom-btn">
              <button class="button is-link" type="submit">
                Update Details
              </button>
            </div>
          </div>

          {{ message }}
        </form>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  name: "User",
  data() {
    return {
      form: {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      error: "",
      message: "",
    };
  },
  computed: {
    ...mapGetters({ User: "StateUser" }),
  },
  mounted() {
    this.fillDetails();
  },
  methods: {
    ...mapActions(["UpdateUser"]),
    async submit() {
      try {
        await this.UpdateUser(this.form);
        this.error = "";
        this.message = "Details updated successfully";
        this.clearform();
      } catch (error) {
        this.error = error.toString();
      }
    },
    fillDetails() {
      this.form.userName = this.User.userName;
      this.form.firstName = this.User.firstName;
      this.form.lastName = this.User.lastName;
      this.form.email = this.User.email;
    },
    clearform() {
      this.form.password = "";
    },
  },
};
</script>
<style>
.profile-container,
.custom-btn {
  padding: 10px;
}
</style>
