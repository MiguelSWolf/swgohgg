<template>
  <div class="team">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left"></div>
          <div class="media-content" style="overflow-x: initial">
            <p class="title is-4">{{ team.title }}</p>
            <p class="subtitle is-6">GP: 000</p>
          </div>
        </div>
        <div class="content">
          <div class="columns">
            <div class="column is-6">
              <p class="title is-2">Team</p>
              <div class="squad">
                <card-unit :name="team.lead" />
                <card-unit
                  v-for="unit in team.squad"
                  :name="unit"
                  :key="unit"
                />
              </div>
            </div>
            <div class="column is-6">
              <p class="title is-2">Counters</p>
              <div
                class="counters"
                v-for="(counter, index) in team.counters"
                :key="index"
              >
                <card-unit :name="counter.lead" :isCounter="true" />
                <card-unit
                  v-for="unit in counter.squad"
                  :isCounter="true"
                  :name="unit"
                  :key="unit"
                />
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
  components: { cardUnit }
};
</script>
<style lang="scss">
.squad {
  display: flex;
}
.counters {
  display: flex;
}
</style>
