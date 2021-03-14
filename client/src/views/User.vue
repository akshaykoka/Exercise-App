<template>
  <div>
    <div class="section">
      <div class="container">
        <div class="box">
          <div class="profile-container">
            <div class="image-container">
              <figure>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                  alt="Profile picture"
                />
                <figcaption>
                  <a>Change the profile picture</a>
                </figcaption>
              </figure>
            </div>
            <div class="profile-info-container">
              <div class="profile-info-element">Username:</div>
              <div class="profile-info-element">
                {{ userName }}
              </div>
              <div class="profile-info-element">Full name:</div>
              <div class="profile-info-element">
                {{ firstName + " " + lastName }}
              </div>
              <div class="profile-info-element">Email:</div>
              <div class="profile-info-element">{{ email }}</div>
              <div class="profile-info-element">Change Password:</div>
              <div class="profile-info-element">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      placeholder="Change password"
                    />
                  </div>
                </div>
              </div>
              <div class="profile-info-element">Repeat Password:</div>
              <div class="profile-info-element">
                <div class="field">
                  <div class="control">
                    <input
                      class="input"
                      type="password"
                      placeholder="Change password"
                    />
                  </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                  <button class="button is-danger">Change the password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="columns">
      <div class="column">
        <BMICalculator />
      </div>
      <div class="column">
        <Timer />
      </div>
    </div>
  </div>
</template>

<script>
import BMICalculator from "../components/BMICalculator.vue";
// import FoodAndExerciseInput from "../components/FoodAndExerciseInput";
import Timer from "../components/Timer";
export default {
  components: { BMICalculator, Timer },
  name: "User",
  data() {
    return {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
    };
  },
  mounted() {
    if (!sessionStorage.currentUser) {
      this.$router.push("/login");
    }
    let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    this.userName = currentUser.userName;
    this.firstName = currentUser.firstName;
    this.lastName = currentUser.lastName;
    this.email = currentUser.email;
  },
};
</script>
<style>
.profile-container {
  display: grid;
  grid-template-columns: 4fr 8fr;
}
.image-container {
  padding: 12px;
}
.profile-info-container {
  display: grid;
  grid-template-columns: 4fr 8fr;
  padding: 12px;
}
</style>