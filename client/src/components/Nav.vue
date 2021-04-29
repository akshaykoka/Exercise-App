<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a href="/" class="navbar-item">
            <img :src="image" width="180" height="84" />
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <router-link to="/" class="navbar-item" v-if="isLoggedIn"
              >Home</router-link
            >
            <router-link to="/about" class="navbar-item" v-if="isLoggedIn"
              >About</router-link
            >
            <router-link to="/User" class="navbar-item" v-if="isLoggedIn"
              >My profile</router-link
            >
            <router-link to="/people" class="navbar-item" v-if="isLoggedIn"
              >People</router-link
            >
            <div
              class="navbar-item has-dropdown is-hoverable"
              v-if="isLoggedIn"
            >
              <div class="navbar-link">
                More
              </div>
              <div class="navbar-dropdown">
                <router-link to="/food" class="navbar-item" v-if="isLoggedIn"
                  >Food</router-link
                >
                <router-link
                  to="/exercise"
                  class="navbar-item"
                  v-if="isLoggedIn"
                  >Exercise</router-link
                >
                <router-link to="/bmi" class="navbar-item" v-if="isLoggedIn"
                  >BMI</router-link
                >
                <router-link to="/tools" class="navbar-item" v-if="isLoggedIn"
                  >Tools</router-link
                >
              </div>
            </div>

            <a
              v-on:click="LogOut"
              class="has-text-danger navbar-item"
              v-if="isLoggedIn"
              >Sign out</a
            >

            <div class="buttons">
              <router-link
                to="/Login"
                class="button has-text-success navbar-item"
                v-if="!isLoggedIn"
                >Sign in</router-link
              >
              <router-link
                to="/SignUp"
                class="button navbar-item "
                v-if="!isLoggedIn"
                >Sign up</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import image from "@/assets/FitnessFreak.png";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SideNav",
  data: function() {
    return {
      image: image,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters({ isLoggedIn: "isAuthenticated" }),
  },
  methods: {
    ...mapActions(["LogOut"]),
    logout() {
      this.LogOut();
      this.$router.push("/Login");
    },
  },
};
</script>

<style>
.w-100 {
  width: 100%;
}
.navbar-item img {
  max-height: 6rem !important;
}
</style>
