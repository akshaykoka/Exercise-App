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
                    <form class="container" @submit.prevent="login">
                      {{ error }}

                      <!-- Email Field -->
                      <div class="field">
                        <label for="email" class="label">Email</label>
                        <div class="control has-icons-left">
                          <input
                            type="email"
                            placeholder="name@domain.com"
                            class="input"
                            required
                            v-model="email"
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
                            v-model="password"
                          />
                          <span class="icon is-small is-left">
                            <i class="fa fa-lock"></i>
                          </span>
                        </div>
                      </div>
                      <!-- Remember Me Field -->
                      <div class="field">
                        <label for="" class="checkbox">
                          <input type="checkbox" />
                          Remember me
                        </label>
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
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  mounted() {
    // if the user is already logged in
    if (sessionStorage.currentUser) {
      this.$router.push("/");
    }
  },
  methods: {
    areValdFields() {
      if (this.email.length === 0) {
        this.error = "Please enter a email id";
        return false;
      }
      if (this.password.length === 0) {
        this.error = "Please enter your password";
        return false;
      }
      return true;
    },
    login() {
      if (this.areValdFields()) {
        // if there is no user available
        if (!sessionStorage.currentUser) {
          // search if there is a user with the currect email and password
          const userList = JSON.parse(sessionStorage.getItem("userList"));
          if (!userList) {
            this.error = "The entered email or password is wrong";
            return;
          }
          let noUserFound = true;
          userList.forEach((user) => {
            if (user.email === this.email && user.password === this.password) {
              noUserFound = false;
              const parsedCurrentUser = JSON.stringify(user);
              sessionStorage.setItem("currentUser", parsedCurrentUser);
              this.$router.push("/");
            }
            if (noUserFound) {
              this.error = "The entered email or password is wrong";
            }
          });
        }
      }
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