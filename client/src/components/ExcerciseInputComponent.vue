<template>
  <form @submit="submit" class="w-100">
    {{ error }}
    <div class="container">
      <div class="field">
        <label for class="label">Excercise:</label>
        <div class="control">
          <input type="text" class="input" v-model="exercise" />
        </div>
      </div>
      <div class="field">
        <label for class="label">Calories burnt:</label>
        <div class="control">
          <input type="text" class="input" v-model="calories" />
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-link" type="submit">
            Add to your daily limit
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "ExcerciseInputComponent",
  data() {
    return {
      exercise: "",
      calories: "",
      error: "",
    };
  },
  methods: {
    validate() {
      if (this.exercise.length === 0) {
        this.error = " Please enter the exercise";
        return false;
      }
      if (this.calories.length === 0) {
        this.error = " Please enter the calories";
        return false;
      }
      return true;
    },
    submit() {
      if (this.validate()) {
        // get the current user
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        // get the exercise data
        const exercises = sessionStorage.exercises
          ? JSON.parse(sessionStorage.getItem("exercises"))
          : [];
        exercises.push({
          email: currentUser.email,
          exercise: this.exercise,
          calories: this.calories,
        });
        sessionStorage.setItem("exercises", JSON.stringify(exercises));
      }
    },
  },
};
</script>

<style></style>