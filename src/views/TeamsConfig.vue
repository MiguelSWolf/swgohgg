<template>
  <section class="section">
    <div style="margin-bottom: 20px">
      <div class="button is-primary" @click.prevent="addTeam">Add Team</div>
    </div>
    <div
      class="card"
      style="margin-bottom: 20px"
      v-for="(team, indexTeam) in teams"
      :key="indexTeam"
    >
      <header class="card-header">
        <div class="card-header-title">
          <p>{{ team.name }}</p>
          <a
            v-if="!team.isEditing"
            class="button is-primary"
            @click.prevent="team.isEditing = true"
            >Edit</a
          >
          <a
            v-else
            class="button is-primary"
            @click.prevent="team.isEditing = false"
            >View</a
          >
        </div>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="table-container">
            <table class="table is-bordered is-full">
              <tr>
                <td :key="n" v-for="n in 5" style="width: 20%">
                  <position-toon
                    :isEditing="team.isEditing"
                    :isLead="n === 1"
                    :indexTeam="indexTeam"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import positionToon from "../components/teams/position";
export default {
  components: { positionToon },
  data() {
    return {
      teams: []
    };
  },
  methods: {
    addTeam: function() {
      this.teams.push({
        name: "Team " + (this.teams.length + 1),
        isEditing: true
      });
    }
  }
};
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.content table {
  width: auto;
}
.content table td {
  text-align: center;
}
.content table td > div {
  display: flex;
  justify-content: center;
}
.card-header-title {
  display: flex;
  justify-content: space-between;
}
</style>
