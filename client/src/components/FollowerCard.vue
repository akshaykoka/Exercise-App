<template>
  <div class="level">
    <div class="level-item">
      {{ userName }}
    </div>
    <div v-if="isFollower">
      <div class="level-right">
        <div class="level-item">
          <button
            class="button is-success is-outlined"
            @click="clickedUnFollow"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="level-right">
        <div class="level-item">
          <button
            class="button is-success is-outlined"
            @click="clickedUnFollow"
          >
            Unfollow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "FollowerCard",
  props: {
    userName: {
      type: String,
      required: true,
    },
    isFollower: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    ...mapActions(["RemoveFollower", "UnfollowUser"]),
    async clickRemoveFollower() {
      await this.RemoveFollower(this.userName);
    },
    async clickedUnFollow() {
      await this.UnfollowUser(this.userName);
    },
  },
};
</script>
