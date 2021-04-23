<template>
  <div class="content">
    <h1>People in the site</h1>
    <div v-for="(person, index) in People" :key="index">
      <div class="card c-card">
        <div class="card-header">
          <div class="card-header-title">@{{ person.userName }}</div>
          <div class="card-content">
            <p>{{ person.firstName }} {{ person.lastName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created: function() {
    this.GetPeople();
  },
  computed: {
    ...mapGetters({ People: "StatePeople" }),
  },
  methods: {
    ...mapActions(["GetPeople"]),
  },
};
</script>

<style scoped>
.c-card {
  margin: 10px;
}
</style>
