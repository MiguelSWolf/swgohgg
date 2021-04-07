<template>
  <div class="team">
    <div class="card">
      <div class="card-content">
        <p class="title is-3">{{ team.title }}</p>
        <div class="content">
          <div class="columns is-mobile is-multiline">
            <div class="column is-3-tablet is-6-mobile">
              <p class="title is-4">Opponent Team</p>
              <div class="squad">
                <card-unit :name="team.lead" />
              </div>
            </div>
            <div class="column is-9-tablet is-6-mobile">
              <p class="title is-4">Your Counters</p>
              <div class="pick-counters">
                <div v-for="(counter, index) in team.counters" :key="index">
                  <card-unit :name="counter.lead" :isCounter="true" />
                </div>
              </div>
            </div>
            <div class="column is-12" v-if="team.chosenCounter !== undefined">
              <div class="columns is-mobile is-multiline">
                <div class="column is-12"><hr /></div>
                <div class="column is-6">
                  <card-unit :name="team.lead" :showStats="true" />
                  <card-unit
                    v-for="unit in team.squad"
                    :showStats="true"
                    :name="unit"
                    :key="unit"
                  />
                </div>
                <div class="column is-6">
                  <card-unit
                    :isCounter="true"
                    :showStats="true"
                    :name="team.counters[team.chosenCounter].lead"
                  />
                  <card-unit
                    v-for="unit in team.counters[team.chosenCounter].squad"
                    :isCounter="true"
                    :showStats="true"
                    :name="unit"
                    :key="unit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import cardUnit from "../components/unit";
export default {
  props: ["team"],
  components: { cardUnit },
  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    }
  }
};
</script>
<style lang="scss">
.squad {
  display: flex;
}
.pick-counters {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
