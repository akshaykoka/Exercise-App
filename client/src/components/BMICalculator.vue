<template>
  <div class="card">
    <div class="card-heading">
      <div class="card-header-title title is-centered">
        BMI Calculator
      </div>
      <div class="card-content">
        <div class="content">
          <h4>BMI - {{ bmi }} kg/m<sup>2</sup></h4>
          <span :class="className" v-if="message">
            {{ message }}
          </span>
          <span class="gray" v-else>
            Enter your height and weight
          </span>
          <form @submit.prevent="calculateBMI">
            <!-- Height Field -->
            <div class="field">
              <label for="height" class="label">Height (cm)</label>
              <div class="control">
                <input
                  autocomplete="off"
                  type="text"
                  pattern="-?[0-9]*(\.[0-9]+)?"
                  class="input "
                  v-model="height"
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
                  v-model="weight"
                />
              </div>
            </div>

            <!-- Login Button -->
            <div class="field">
              <p class="control">
                <button class="button is-success w-100" type="submit">
                  Calculate BMI
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BMICalculator",
  data() {
    return {
      height: "",
      weight: "",
      bmi: "",
      message: "",
      className: "is-red",
    };
  },
  methods: {
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
      this.height = "";
      this.weight = "";
      this.bmi = "";
      this.message = "";
    },
    calculateBMI() {
      if (this.isValid(this.height) && this.isValid(this.weight)) {
        this.bmi = (
          this.weight /
          ((this.height / 100) * (this.height / 100))
        ).toFixed(2);
        this.getBMIMessage(this.bmi);
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