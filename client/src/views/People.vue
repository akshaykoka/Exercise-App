<template>
<div class="container">
  <div class="content">
    <h1>People in the site</h1>
    <div class="columns">
      <div v-for="(person, index) in People" :key="index">
        <div class="column">
          <PersonCard :person="person" />
        </div>
      </div>
    </div>
  </div></div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PersonCard from "../components/PersonCard";
export default {
  created: function() {
    this.GetPeople();
  },
  components: { PersonCard },

  computed: {
    ...mapGetters({ People: "StatePeople",User:"StateUser" }),
    filteredPeople(){
      return People.filter(person=>person.handle!==this.User.handle)
    }
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
