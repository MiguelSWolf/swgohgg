<template>
  <div class="home">
    <section class="section">
      <div class="container">
        <table-mod-maps />
      </div>
    </section>
  </div>
</template>

<script>
import tableModMaps from "../components/tableModMaps";

export default {
  name: "Home",
  components: {
    tableModMaps
  },
  computed: {
    isDev() {
      return Window.isDev || false;
    }
  }
};
</script>
