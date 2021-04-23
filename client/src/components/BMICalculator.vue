<template>
  <div class="content">
    <h4>BMI - {{ form.bmi }} kg/m<sup>2</sup></h4>
    <span :class="className" v-if="message">
      {{ message }}
    </span>
    <span class="gray" v-else>
      Enter your height and weight
    </span>
    <form @submit.prevent="calculateBMI">
      <!-- Height Field -->
      <div class="field w-100">
        <label for="height" class="label">Height (cm)</label>
        <div class="control">
          <input
            autocomplete="off"
            type="text"
            pattern="-?[0-9]*(\.[0-9]+)?"
            class="input "
            v-model="form.height"
          />
        </div>
      </div>

      <!-- Height Field -->
      <div class="field">
        <label for="weight" class="label">Weight (kg)</label>
        <div class="control">
          <input
            autocomplete="off"
            type="text"
            pattern="-?[0-9]*(\.[0-9]+)?"
            class="input "
            v-model="form.weight"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <button class="button is-link  w-100" type="submit">
            Calculate BMI
          </button>
        </p>
      </div>

      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <button class="button is-link  w-100" @click="upload">
            Add to Logs
          </button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "BMICalculator",
  data() {
    return {
      form: { height: "", weight: "", bmi: "" },
      message: "",
      className: "is-red",
    };
  },
  methods: {
    ...mapActions(["AddBMI"]),
    async upload() {
      this.calculateBMI();
      await this.AddBMI(this.form);
      this.reset();
    },
    isNumeric(input) {
      return !isNaN(parseFloat(input)) && isFinite(input);
    },
    isValid(input) {
      if (input !== "" && this.isNumeric(input)) {
        if (input > 3) {
          return true;
        }
      }
      return false;
    },
    reset() {
      this.form.height = "";
      this.form.weight = "";
      this.form.bmi = "";
      this.message = "";
    },
    calculateBMI() {
      if (this.isValid(this.form.height) && this.isValid(this.form.weight)) {
        this.form.bmi = (
          this.form.weight /
          ((this.form.height / 100) * (this.form.height / 100))
        ).toFixed(2);
        this.getBMIMessage(this.form.bmi);
      }
    },
    getBMIMessage(number) {
      if (number > 59.99) {
        this.message = "Obese Class VI (Hyper Obese)";
        this.className = "red";
      } else if (number > 49.99) {
        this.message = "Obese Class V (Super Obese)";
        this.className = "red";
      } else if (number > 44.99) {
        this.message = "Obese Class IV (Morbidly Obese)";
        this.className = "red";
      } else if (number > 39.99) {
        this.message = "Obese Class III (Very severely obese)";
        this.className = "red";
      } else if (number > 34.99) {
        this.message = "Obese Class II (Severely obese)";
        this.className = "red";
      } else if (number > 29.99) {
        this.message = "Obese Class I (Moderately obese)";
        this.className = "red";
      } else if (number > 24.99) {
        this.message = "Overweight";
        this.className = "red";
      } else if (number > 18.49) {
        this.message = "Normal (healthy weight)";
        this.className = "green";
      } else if (number > 15.99) {
        this.message = "Underweight";
        this.className = "red";
      } else if (number > 14.99) {
        this.message = "Severely underweight";
        this.className = "red";
      } else {
        this.message = "Very severely underweight";
        this.className = "red";
      }
    },
  },
};
</script>

<style scoped>
.w-100,
.field {
  width: 100%;
}
</style>
