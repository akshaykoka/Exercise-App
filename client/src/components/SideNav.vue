<template>
  <div>
    <img :src="image" />
    <div class="container pl-2">
      <aside class="menu">
        <ul class="menu-list">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/about">About</router-link>
          </li>

          <li>
            <router-link to="/User">My profile</router-link>
          </li>
          <li>
            <router-link to="/people">People</router-link>
          </li>
          <li>
            <router-link to="/exercise">Exercise</router-link>
          </li>
          <li>
            <router-link to="/food">Food</router-link>
          </li>
          <li>
            <router-link to="/bmi">BMI</router-link>
          </li>
          <li>
            <router-link to="/tools">Tools</router-link>
          </li>
          <li>
            <a v-on:click="LogOut" class="has-text-danger">Sign out</a>
          </li>
          <br />
          <li>
            <router-link to="/Login" class=" button is-success  w-100  "
              >Sign in</router-link
            >
          </li>
          <br />
          <li>
            <router-link
              to="/SignUp"
              class=" button is-success is-outlined w-100 "
              >Sign up</router-link
            >
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
import image from "../assets/logomk.png";
import { mapActions } from "vuex";

export default {
  name: "SideNav",
  data: function() {
    return {
      image: image,
    };
  },
  methods: {
    ...mapActions(["LogOut"]),
    logout() {
      this.LogOut();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.w-100 {
  width: 100%;
}
</style>
