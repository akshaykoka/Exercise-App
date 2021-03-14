<template>
  <form @submit="submit" class="w-100">
    {{ error }}
    <div class="container">
      <div class="field">
        <label for class="label">Food name:</label>
        <div class="control">
          <input type="text" class="input" v-model="food" />
        </div>
      </div>
      <div class="field">
        <label for class="label">Calories:</label>
        <div class="control">
          <input type="text" class="input" v-model="calories" />
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-link">Add to your daily intake total</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "FoodInputComponent",
  data() {
    return {
      food: "",
      calories: "",
      error: "",
    };
  },
  methods: {
    validate() {
      if (this.food.length === 0) {
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
        const foods = sessionStorage.foods
          ? JSON.parse(sessionStorage.getItem("foods"))
          : [];
        foods.push({
          email: currentUser.email,
          food: this.food,
          calories: this.calories,
        });
        sessionStorage.setItem("foods", JSON.stringify(foods));
      }
    },
  },
};
</script>

<style></style>