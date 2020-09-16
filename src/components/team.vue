<template>
  <div class="card">
    <h2>{{ team.title }}</h2>
    <div class="lead">
      <card-unit :name="team.lead" />
    </div>
  </div>
</template>

<script>
import cardUnit from "../components/unit";
export default {
  props: ["team"],
  components: { cardUnit }
};
</script>
