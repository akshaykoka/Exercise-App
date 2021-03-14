<template>
  <div class="columns is-vcentered is-centered signup-screen">
    <div class="column">
      <div class="section">
        <div class="container sign-up-container">
          <div class="card ">
            <div class="card-heading ">
              <h1 class="card-header-title title ">Sign Up</h1>
            </div>
            <div class="card-content">
              <div class="content">
                <form class="container" @submit.prevent="signUp">
                  {{ error }}
                  <!-- User Name Field-->
                  <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left">
                      <input
                        type="text"
                        class="input"
                        placeholder="Your User Name"
                        v-model="userName"
                        required
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                  </div>

                  <!-- First Name Field -->
                  <div class="field">
                    <label class="label">First Name</label>
                    <div class="control has-icons-left">
                      <input
                        type="text"
                        class="input"
                        placeholder="Your First Name"
                        v-model="firstName"
                        required
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                  </div>

                  <!-- Last Name field  -->
                  <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control has-icons-left">
                      <input
                        type="text"
                        class="input"
                        placeholder="Your Last Name"
                        v-model="lastName"
                        required
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                  </div>

                  <!-- Email Field -->
                  <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left">
                      <input
                        type="email"
                        class="input"
                        placeholder="Your Email"
                        v-model="email"
                        required
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  <!-- Password Field -->
                  <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left">
                      <input
                        type="password"
                        class="input"
                        placeholder="Password"
                        v-model="password"
                        required
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <!-- Re type password Field -->
                  <div class="field">
                    <label class="label">Re-type Password</label>
                    <div class="control has-icons-left">
                      <input
                        type="password"
                        class="input"
                        placeholder="Re type password"
                        v-model="rePassword"
                        required
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <br />

                  <!-- Sign Up Button -->
                  <div class="field">
                    <div class="control">
                      <button class="button is-success w-100" type="submit">
                        Register
                      </button>
                    </div>
                  </div>

                  <!-- Fields done -->
                </form>
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
  name: "SignUp",
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      rePassword: "",
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
    areValidFields() {
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      // check if the first name is not empty
      if (this.userName.length === 0) {
        this.error = "Please enter a user name";
        return false;
      }

      // check if the first name is not empty
      if (this.firstName.length === 0) {
        this.error = "Please enter your first name";
        return false;
      }

      // check if the last name is not empty
      if (this.lastName.length === 0) {
        this.error = "Please enter your last name";
        return false;
      }

      // check if valid email
      if (!regexEmail.test(String(this.email).toLowerCase())) {
        this.error = "Please enter valid email ID";
        return false;
      }

      // check password with regex
      if (!regexPassword.test(String(this.password))) {
        this.error = "Please enter valid password";
        return false;
      }

      // check if the password is entered correctly twice
      if (this.password !== this.rePassword) {
        this.error = "The passwords don't match";
        return false;
      }

      return true;
    },
    signUp() {
      let userList;
      if (this.areValidFields()) {
        // if there are no prior users
        if (sessionStorage.getItem("userList")) {
          userList = JSON.parse(sessionStorage.getItem("userList"));
        }
        if (!userList) userList = [];
        const currentUser = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          userName: this.userName,
        };
        userList.push(currentUser);

        const parsedUserList = JSON.stringify(userList);
        sessionStorage.setItem("userList", parsedUserList);

        // set current user to the details given
        const parsedCurrentUser = JSON.stringify(currentUser);
        sessionStorage.setItem("currentUser", parsedCurrentUser);
        // send the home route
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.sign-up-container {
  border-radius: 10px;
}
.w-100,
.field {
  width: 100%;
}

.card-header {
  background-color: #333 !important;
}
.signup-screen {
  padding-top: 7vh;
}
</style>