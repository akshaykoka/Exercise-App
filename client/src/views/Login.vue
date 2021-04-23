<template>
  <div class="columns is-vcentered is-centered login-screen">
    <div class="column">
      <div class="columns is-vcentered is-centered is-three-quarters">
        <div class="column">
          <div class="section">
            <div class="container sigin-container">
              <div class="card">
                <div class="card-heading">
                  <div class="card-header-title title">Sign In</div>
                </div>
                <div class="card-content">
                  <div class="content">
                    <form class="container" @submit.prevent="submit">
                      {{ error }}

                      <!-- Email Field -->
                      <div class="field">
                        <label for="email" class="label">Email</label>
                        <div class="control has-icons-left">
                          <input
                            type="text"
                            placeholder="akokaa"
                            class="input"
                            required
                            v-model="form.userName"
                          />
                          <span class="icon is-small is-left">
                            <i class="fa fa-envelope"></i>
                          </span>
                        </div>
                      </div>

                      <!-- Password Field -->
                      <div class="field">
                        <label for="password" class="label">Password</label>
                        <div class="control has-icons-left">
                          <input
                            type="password"
                            placeholder="*******"
                            class="input"
                            required
                            v-model="form.password"
                          />
                          <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                          </span>
                        </div>
                      </div>

                      <!-- Login Button -->
                      <div class="field">
                        <p class="control">
                          <button class="button is-success w-100" type="submit">
                            Login
                          </button>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      error: "",
    };
  },

  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = {};
      User.userName = this.form.userName;
      User.password = this.form.password;
      try {
        if (this.areValidFields()) {
          await this.LogIn(User);
          this.$router.push("/");
          this.error = "";
        }
      } catch (error) {
        this.error = error.toString();
      }
    },
    areValidFields() {
      if (this.form.userName.length === 0) {
        this.error = "Please enter a email id";
        return false;
      }
      if (this.form.password.length === 0) {
        this.error = "Please enter your password";
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
.sign-up-container {
  border-radius: 10px;
}
.w-100,
.field {
  width: 100%;
}
.login-screen {
  padding-top: 20vh;
}
</style>
