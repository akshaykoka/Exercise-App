<template>
  <form @submit.prevent="submit" class="w-100">
    {{ error }}
    <div class="container">
      <div class="field">
        <label for class="label">Food name:</label>
        <div class="control">
          <input type="text" class="input" v-model="form.name" />
        </div>
      </div>
      <div class="field">
        <label for class="label">Calories:</label>
        <div class="control">
          <input type="text" class="input" v-model="form.calories" />
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-link">Add to Log</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FoodInputComponent",
  data() {
    return {
      form: { name: "", calories: "" },
      error: "",
    };
  },
  methods: {
    ...mapActions(["AddFood"]),
    validate() {
      if (this.form.name.length === 0) {
        this.error = " Please enter the exercise";
        return false;
      }
      if (this.form.calories.length === 0) {
        this.error = " Please enter the calories";
        return false;
      }
      return true;
    },

    async submit() {
      try {
        if (this.validate()) {
          await this.AddFood(this.form);
          this.error = "";
          this.form.name = "";
          this.form.calories = "";
        }
      } catch (error) {
        this.error = error.toString();
      }
    },
  },
};
</script>

<style></style>
