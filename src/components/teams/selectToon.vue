<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <div class="select">
        <select v-model="mutableValue">
          <option value="">-- Select Unit --</option>
          <option
            v-for="(unit, index) in units"
            :key="index"
            :value="unit.id"
            >{{ unit.name }}</option
          >
        </select>
      </div>
    </div>
  </div>
</template>
<script>
import units from "../../assets/baseData/characters.json";

export default {
  props: ["value", "label"],
  data() {
    return {
      mutableValue: "",
      units: []
    };
  },
  watch: {
    mutableValue: function(newValue) {
      this.$emit("input", newValue);
    },
    value: function(newValue) {
      this.mutableValue = newValue;
    }
  },
  mounted() {
    this.units = units.map(unit => {
      return { id: unit.base_id, name: unit.name };
    });
  }
};
</script>
