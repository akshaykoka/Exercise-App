<template>
  <div class="container">
    <div class="panel is-success">
      <div class="panel-heading">Exercise Input</div>
      <div class="panel-block">
        <excercise-input-component />
      </div>
    </div>

    <h1 class="title">Exercise Log</h1>
    <table class="table w-100" v-if="Exercises">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Calories</th>
        </tr>
        <tr v-for="(item, index) in Exercises" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.calories }} cal</td>
        </tr>
      </thead>
    </table>
    <div v-else>
      No exercises are found
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ExcerciseInputComponent from "../components/ExcerciseInputComponent.vue";
export default {
  name: "Exercise",
  components: {
    ExcerciseInputComponent,
  },
  data() {
    return {};
  },
  created: function() {
    this.GetExercises();
  },
  computed: {
    ...mapGetters({ Exercises: "StateExercises" }),
  },
  methods: {
    ...mapActions(["GetExercises"]),
  },
};
</script>
