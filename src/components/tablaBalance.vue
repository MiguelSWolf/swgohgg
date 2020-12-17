<template>
  <table
    class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth is-resume"
  >
    <tr>
      <th>Name</th>
      <th>{{ your }}</th>
      <th>{{ opponent }}</th>
      <th>Balance</th>
    </tr>
    <tr v-for="row in data" :key="row.name">
      <th>{{ row.name }}</th>
      <td>{{ row.your | formatNumber }}</td>
      <td>{{ row.opponent | formatNumber }}</td>
      <td>{{ (row.your - row.opponent) | formatNumber }}</td>
    </tr>
  </table>
</template>
<script>
export default {
  props: ["data", "your", "opponent"]
};
</script>
