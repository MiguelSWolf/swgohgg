<template>
  <table
    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
  >
    <tr>
      <th>Name</th>
      <th>Your</th>
      <th>Opponent</th>
      <th>Balance</th>
    </tr>
    <tr v-for="row in data" :key="row.name">
      <th>{{ row.name }}</th>
      <td>{{ row.your }}</td>
      <td>{{ row.opponent }}</td>
      <td>{{ row.your - row.opponent }}</td>
    </tr>
  </table>
</template>
<script>
export default {
  props: ["data"]
};
</script>
