<template>
  <div>
    <div class="panel is-success">
      <div class="panel-heading">Food Input</div>
      <div class="panel-block">
        <FoodInputComponent />
      </div>
    </div>

    <h1 class="title">Food Log</h1>
    <table class="table w-100" v-if="Food">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>

          <th>Calories</th>
        </tr>
        <tr v-for="(item, index) in Food" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>

          <td>{{ item.calories }} cal</td>
        </tr>
      </thead>
    </table>
    <div v-else>
      No food found
    </div>
  </div>
</template>
<script>
import FoodInputComponent from "@/components/FoodInputComponent";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Food",
  components: {
    FoodInputComponent,
  },
  data() {
    return {};
  },
  created: function() {
    this.GetFood();
  },
  computed: {
    ...mapGetters({ Food: "StateFood" }),
  },
  methods: {
    ...mapActions(["GetFood"]),
  },
};
</script>
