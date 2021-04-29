<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">@{{ person.userName }}</div>
    </div>
    <div class="card-content">
      <div class="content">
        <p>{{ person.firstName + " " + person.lastName }}</p>
      </div>
    </div>

    <div v-if="toggle">
      <div class="card-footer">
        <button
          href="#"
          class="card-footer-item is-success button is-outlined"
          @click="clickFollowUser"
        >
          Follow
        </button>
      </div>
    </div>
    <div v-else>
      <div class="card-footer">
        <button
          href="#"
          class="card-footer-item is-success button is-outlined"
          @click="clickUnFollowUser"
        >
          Unfollow
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PersonCard",
  props: {
    person: {
      type: Object,
      required: true,
      default: {},
    },
  },
  data() {
    return {
      toggle: null,
    };
  },
  mounted() {
    this.toggle = this.User.following.indexOf(this.person.userName) === -1;
  },
  computed: {
    ...mapGetters({ User: "StateUser" }),
  },
  methods: {
    ...mapActions(["FollowUser", "UnfollowUser"]),
    async clickFollowUser() {
      await this.FollowUser(this.person.userName);
      this.toggle = false;
    },
    async clickUnFollowUser() {
      await this.UnfollowUser(this.person.userName);
      this.toggle = true;
    },
  },
};
</script>
<style scoped></style>
