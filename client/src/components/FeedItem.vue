<template>
  <div class="panel-block">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <h3>{{ post.title }}</h3>
            <p>{{ post.write_up }}</p>
            <span> @{{ post.userName }} </span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
};
</script>
<style scoped>
.box {
  width: 100%;
}
</style>
