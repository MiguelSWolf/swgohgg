<template>
  <div class="position-toon">
    <div class="toons">
      <unit-toon
        :class="{ 'is-optional': !required }"
        v-for="(idToon, index) in idsToon"
        :key="index"
        :idToon="idToon"
      />
    </div>
    <div v-if="showActions" class="actions">
      <div class="field has-addons">
        <div class="control">
          <a
            class="button"
            :class="{ 'is-primary is-selected': required }"
            @click.prevent="onRequired(true)"
          >
            Required
          </a>
        </div>
        <div class="control">
          <a
            class="button"
            :class="{ 'is-primary is-selected': !required }"
            @click.prevent="onRequired(false)"
          >
            Optional
          </a>
        </div>
      </div>
      <a
        class="button is-info"
        v-if="!required"
        @click.prevent="idsToon.push('')"
      >
        +
      </a>
    </div>
    <template v-for="(idToon, index) in idsToon">
      <select-toon v-if="isEditing" v-model="idsToon[index]" :key="index" />
    </template>
  </div>
</template>
<script>
import SelectToon from "./selectToon.vue";
import unitToon from "./unit";
export default {
  components: { unitToon, SelectToon },
  props: {
    isLead: {
      type: Boolean,
      default: false
    },
    isEditing: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      required: true,
      idsToon: [""]
    };
  },
  computed: {
    showActions: function() {
      return this.isEditing && !this.isLead;
    }
  },
  methods: {
    onRequired: function(required) {
      this.required = required;
      if (required) {
        this.idsToon = [""];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.position-toon {
  display: flex;
  flex-direction: column;
  align-items: center;
  .toons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .actions {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
