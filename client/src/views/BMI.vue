<template>
  <div>
    <div class="panel is-success">
      <div class="panel-heading">
        BMI Calculator
      </div>
      <div class="panel-block">
        <BMICalculator />
      </div>
    </div>
    <h1 class="title">BMI Log</h1>
    <table class="table w-100" v-if="BMI">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Height</th>
          <th>Weight</th>
          <th>BMI</th>
        </tr>
        <tr v-for="(item, index) in BMI" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.height }} cms</td>
          <td>{{ item.weight }} kg</td>
          <td>{{ item.bmi }}</td>
        </tr>
      </thead>
    </table>
    <div v-else>
      No BMI Records found
    </div>
  </div>
</template>
<script>
import BMICalculator from "@/components/BMICalculator.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BMI",
  components: {
    BMICalculator,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["GetBMI"]),
  },
  computed: {
    ...mapGetters({ BMI: "StateBMI" }),
  },
  created() {
    this.GetBMI();
  },
};
</script>
<style></style>
