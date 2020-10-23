<template>
  <div class="progress">
    <div class="fill-bar">
      <div
        v-for="n in 4"
        :key="n"
        :class="`days day${n}`"
        :style="{ width: `${(pointsMadeInZone[n - 1] / total) * 100}%` }"
      ></div>
    </div>
    <div
      v-for="(step, index) in pointsNeeded"
      :key="index"
      class="step"
      :style="{ width: `${(step / total) * 100}%` }"
    >
      <!-- {{ step }} -->
    </div>
  </div>
</template>
<script>
export default {
  props: ["pointsNeeded", "pointsMade", "name"],
  computed: {
    total: function() {
      return this.pointsNeeded.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    pointsMadeInZone: function() {
      let pointsOnZone = [0, 0, 0, 0];
      this.pointsMade.forEach(rowDay => {
        if (rowDay.zone == this.name) {
          console.log({ rowDay });
          pointsOnZone[rowDay.day - 1] += rowDay.value;
        }
      });
      return pointsOnZone;
    }
  }
};
</script>
<style lang="scss">
.progress {
  width: 100%;
  overflow: hidden;
  height: 22px;
  background-color: #f5f5f5;
  border-radius: 4px;
  border: 1px solid #ccc;
  display: flex;
  z-index: 1;
  position: relative;
  .step {
    border-right: 1px solid #ccc;
    height: 100%;
    z-index: 1;
    &:last-child {
      border: none;
    }
  }
  .fill-bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    .days {
      height: 100%;
      &.day1 {
        background-color: #ed553b;
      }
      &.day2 {
        background-color: #f6d55c;
      }
      &.day3 {
        background-color: #3caea3;
      }
      &.day4 {
        background-color: #20639b;
      }
    }
  }
}
</style>
