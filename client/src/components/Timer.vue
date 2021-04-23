<template>
  <div class="card has-text-centered">
    <div class="card-heading">
      <div class="card-header-title  title is-centered">
        Timer
      </div>
      <div class="card-content ">
        <div class="content ">
          <h4 class="content is-large">{{ title }}</h4>

          <div class="title">
            <span id="minutes">{{ minutes }}</span>
            <span id="middle">:</span>
            <span id="seconds">{{ seconds }}</span>
          </div>
          <!--  THE BUTTONS  -->
          <footer class="card-footer">
            <!--     Start TImer -->
            <a
              id="start"
              class="card-footer-item "
              v-if="!timer"
              @click="startTimer"
            >
              Start
            </a>
            <!--     Pause Timer -->
            <a class="card-footer-item" v-if="timer" @click="stopTimer">
              Pause
            </a>
            <!--     Restart Timer -->
            <a class="card-footer-item " v-if="resetButton" @click="resetTimer">
              Reset
            </a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      timer: null,
      totalTime: 25 * 60,
      resetButton: false,
      title: "Let the countdown begin!!",
    };
  },
  computed: {
    minutes: function() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    },
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
      this.title = "Greatness is within sight!!";
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
      this.title = "Never quit, keep going!!";
    },
    resetTimer() {
      this.totalTime = 25 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
      this.title = "Let the countdown begin!!";
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown() {
      this.totalTime--;
    },
  },
};
</script>

<style scoped>
.w-100,
.field {
  width: 100%;
}
.card.has-text-centered .card-header,
.card-content,
.card-footer {
  justify-content: center;
  align-items: center;
}
</style>
