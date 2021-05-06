<template>
  <form @submit.prevent="submit" class="w-100">
    {{ error }}
    <div class="container">
      <div class="field">
        <div class="control"></div>
       <p class="content"><b>Selected:</b> {{ selected }}</p>
        <b-field label="Enter Excersise">
            <b-autocomplete
                
                v-model="form.name"
                :data="items"
                placeholder="e.g. jQuery"
                icon="magnify"
                clearable
                @keyup="fetchWorkouts"
                @select="option => selected = option">
                <template #empty>No results found</template>
            </b-autocomplete>
        </b-field>
      </div>
      <div class="field">
        <label for class="label">Calories burnt:</label>
        <div class="control">
          <input type="text" class="input" v-model="form.calories" />
        </div>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-link" type="submit">
            Add to Log
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions ,mapGetters} from "vuex";
export default {
  name: "ExcerciseInputComponent",
  data() {
    return {
      form: { name: "", calories: "" },
      error: "",
      items:[],
    };
  },
  methods: {
    ...mapActions(["AddExercise","GetWorkoutNames"]),
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
    async fetchWorkouts(event){
      await this.GetWorkoutNames(this.form.name);
      this.items = Suggestions;
    },
    async submit() {
      try {
        if (this.validate()) {
          await this.AddExercise(this.form);
          this.error = "";
          this.form.name = "";
          this.form.calories = "";
        }
      } catch (error) {
        this.error = error.toString();
      }
    },
  },
  computed:{
    ...mapGetters({Suggestions:"StateSuggestions"})
  }
};
</script>

<style></style>
