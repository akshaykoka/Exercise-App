<template>
  <div class="section">
    <food-and-exercise-input />
    <br />
    <div class="container columns">
      <div class="column ">
        <h1 class="title">Excersise Log</h1>
        <table class="table w-100">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Exercise</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tr v-for="(item, index) in exercises" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.exercise }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </table>
      </div>
      <div class="column">
        <h1 class="title">Food Log</h1>
        <table class="table w-100">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Exercise</th>
              <th>Calories</th>
            </tr>
            <tr v-for="(item, index) in foods" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.food }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import FoodAndExerciseInput from "../components/FoodAndExerciseInput";
export default {
  name: "Dairy",
  components: {
    FoodAndExerciseInput,
  },

  mounted() {
    if (!sessionStorage.currentUser) {
      this.$router.push("/login");
    }
  },
  computed: {
    exercises() {
      const totalExercises = sessionStorage.exercises
        ? JSON.parse(sessionStorage.getItem("exercises"))
        : [];
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      const userExercises = totalExercises.filter(
        (item) => item.email === currentUser.email
      );
      return userExercises.reverse();
    },
    foods() {
      const totalFoods = sessionStorage.foods
        ? JSON.parse(sessionStorage.getItem("foods"))
        : [];
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      const userFoods = totalFoods.filter(
        (item) => item.email === currentUser.email
      );
      return userFoods.reverse();
    },
  },
};
</script>